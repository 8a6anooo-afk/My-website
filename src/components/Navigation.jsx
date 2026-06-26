import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'HOME', icon: HomeIcon },
  { to: '/quantitative', label: 'QUANTITATIVE DATA', icon: ChartIcon },
  { to: '/before-after', label: 'BEFORE / AFTER', icon: SliderIcon },
  { to: '/challenges', label: 'CREATIVE CHALLENGES', icon: PuzzleIcon },
  { to: '/future', label: 'FUTURE OUTLOOK', icon: StarIcon },
  { to: '/portfolio', label: 'SHOWCASE', icon: GridIcon },
]

function HomeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1 5.5L6.5 1L12 5.5V12H8.5V8.5H4.5V12H1V5.5Z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
    </svg>
  )
}
function ChartIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="7" width="3" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="5" y="4" width="3" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="9" y="1" width="3" height="11" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  )
}
function SliderIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="1" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="6.5" y1="1" x2="6.5" y2="12" stroke="currentColor" strokeWidth="1.2"/>
      <polyline points="4,5 6.5,3 9,5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
      <polyline points="4,8 6.5,10 9,8" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
    </svg>
  )
}
function PuzzleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1 5h2.5c0-1 .5-1.5 1-1.5S5.5 4 5.5 5H8V7.5c1 0 1.5.5 1.5 1s-.5 1-1.5 1V12H5.5c0-1-.5-1.5-1-1.5S3.5 11 3.5 12H1V5z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
    </svg>
  )
}
function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <polygon points="6.5,1 8,5 12,5.5 9,8.5 10,12.5 6.5,10.5 3,12.5 4,8.5 1,5.5 5,5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
    </svg>
  )
}
function GridIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="1" width="4.5" height="4.5" rx="0.8" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="7.5" y="1" width="4.5" height="4.5" rx="0.8" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="1" y="7.5" width="4.5" height="4.5" rx="0.8" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="0.8" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  )
}
function PaletteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="4.5" cy="5" r="1" fill="currentColor"/>
      <circle cx="7" cy="3.5" r="1" fill="currentColor"/>
      <circle cx="9.5" cy="5" r="1" fill="currentColor"/>
      <circle cx="9.5" cy="8" r="1" fill="currentColor"/>
      <path d="M7 9.5a2.5 2.5 0 01-2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'color-mix(in srgb, var(--cs-bg) 92%, transparent)'
          : 'var(--cs-bg)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--cs-hairline)' : 'transparent'}`,
        transition: 'background 0.25s, border-color 0.25s',
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--cs-violet), color-mix(in srgb, var(--cs-violet) 70%, white))' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8c0-2.76 2.24-5 5-5 1.5 0 2.84.66 3.77 1.7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="11" cy="6.5" r="1.5" fill="var(--cs-lime)"/>
              <path d="M13 8c0 2.76-2.24 5-5 5-1.5 0-2.84-.66-3.77-1.7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="5" cy="9.5" r="1.5" fill="white" fillOpacity="0.7"/>
            </svg>
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-sm tracking-tight" style={{ color: 'var(--cs-ink)', fontFamily: 'Inter, sans-serif' }}>
              Creative Space
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--cs-lime)' }}></div>
              <span className="text-[10px] tracking-wide" style={{ color: 'var(--cs-soft)' }}>VOICES OF BAHRAINI DESIGNERS</span>
            </div>
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-widest transition-all duration-200 ${
                  isActive ? 'font-medium' : 'hover:bg-black/5'
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--cs-lilac)' : undefined,
                color: isActive ? 'var(--cs-violet)' : 'var(--cs-soft)',
              })}
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Identity + mobile burger */}
        <div className="flex items-center gap-2">
          <NavLink
            to="/identity"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] tracking-widest font-medium transition-all duration-200 border"
            style={({ isActive }) => ({
              background: isActive ? 'var(--cs-violet)' : 'transparent',
              color: isActive ? 'white' : 'var(--cs-violet)',
              borderColor: 'var(--cs-violet)',
            })}
          >
            <PaletteIcon />
            IDENTITY
          </NavLink>

          <button
            className="xl:hidden p-2 rounded-lg transition-colors hover:bg-black/5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} style={{ background: 'var(--cs-ink)' }}></span>
              <span className={`block h-0.5 transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} style={{ background: 'var(--cs-ink)' }}></span>
              <span className={`block h-0.5 transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} style={{ background: 'var(--cs-ink)' }}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="xl:hidden border-t px-4 py-3 flex flex-col gap-1"
          style={{ background: 'var(--cs-bg)', borderColor: 'var(--cs-hairline)' }}
        >
          {[...navItems, { to: '/identity', label: 'IDENTITY', icon: PaletteIcon }].map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] tracking-widest transition-all"
              style={({ isActive }) => ({
                background: isActive ? 'var(--cs-lilac)' : 'transparent',
                color: isActive ? 'var(--cs-violet)' : 'var(--cs-soft)',
              })}
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
