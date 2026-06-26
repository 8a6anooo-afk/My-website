import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const DEFAULTS = {
  '--cs-bg':      '#F8F6F1',
  '--cs-ink':     '#14141A',
  '--cs-soft':    '#6B6B72',
  '--cs-violet':  '#6C4FE0',
  '--cs-lilac':   '#EDE9FA',
  '--cs-lime':    '#6FCF4E',
  '--cs-hairline':'#E7E3DC',
  '--cs-dark0':   '#0E0E10',
  '--cs-dark1':   '#1B1B20',
}

const STORAGE_KEY = 'cs-theme-v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS }
  } catch { return { ...DEFAULTS } }
}

function applyToRoot(vars) {
  const root = document.documentElement
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v))
  // also update body background directly
  document.body.style.background = vars['--cs-bg']
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [vars, setVars] = useState(load)

  useEffect(() => {
    applyToRoot(vars)
  }, [vars])

  const set = useCallback((key, value) => {
    setVars(prev => {
      const next = { ...prev, [key]: value }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setVars({ ...DEFAULTS })
  }, [])

  return (
    <ThemeContext.Provider value={{ vars, set, reset, DEFAULTS }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
