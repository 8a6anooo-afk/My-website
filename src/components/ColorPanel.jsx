import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const SWATCHES = {
  '--cs-violet': [
    '#6C4FE0','#8B5CF6','#EC4899','#EF4444','#F97316',
    '#EAB308','#22C55E','#06B6D4','#3B82F6','#64748B',
  ],
  '--cs-lime': [
    '#6FCF4E','#22C55E','#10B981','#06B6D4','#3B82F6',
    '#8B5CF6','#EC4899','#F97316','#EAB308','#F43F5E',
  ],
  '--cs-bg': [
    '#F8F6F1','#FFFFFF','#F0F4FF','#FFF7ED','#F0FDF4',
    '#FDF2F8','#F8FAFC','#FFFBEB','#F5F3FF','#FEF2F2',
  ],
  '--cs-ink': [
    '#14141A','#111827','#1E1B4B','#1E3A5F','#14532D',
    '#713F12','#7F1D1D','#312E81','#1F2937','#374151',
  ],
}

const controls = [
  { key: '--cs-violet',  label: 'Accent',      hint: 'Violet/primary' },
  { key: '--cs-lilac',   label: 'Accent Light', hint: 'Lilac tints' },
  { key: '--cs-lime',    label: 'Highlight',    hint: 'Green dot / highlights' },
  { key: '--cs-bg',      label: 'Background',   hint: 'Page background' },
  { key: '--cs-ink',     label: 'Heading',      hint: 'Titles & headings' },
  { key: '--cs-soft',    label: 'Body Text',    hint: 'Paragraphs & labels' },
  { key: '--cs-hairline',label: 'Borders',      hint: 'Cards & dividers' },
  { key: '--cs-dark0',   label: 'Dark Card',    hint: 'Dark surface gradient' },
]

function Swatch({ color, active, onClick }) {
  return (
    <button
      onClick={onClick}
      title={color}
      style={{
        width: 22,
        height: 22,
        borderRadius: 6,
        background: color,
        border: active ? '2px solid #14141A' : '2px solid transparent',
        outline: active ? '1px solid white' : 'none',
        cursor: 'pointer',
        transition: 'transform 0.1s',
        flexShrink: 0,
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    />
  )
}

export default function ColorPanel() {
  const { vars, set, reset } = useTheme()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  function exportTheme() {
    const text = JSON.stringify(vars, null, 2)
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Customise colours"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          zIndex: 200,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: open ? vars['--cs-violet'] : 'linear-gradient(135deg,' + vars['--cs-violet'] + ',#8B6FF0)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.22)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.18)' }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
          style={{ transition: 'transform 0.3s', transform: open ? 'rotate(30deg)' : 'none' }}>
          <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="1.4"/>
          <circle cx="6.5" cy="8.5"  r="1.5" fill="white"/>
          <circle cx="10"  cy="6"    r="1.5" fill={vars['--cs-lime']}/>
          <circle cx="13.5"cy="8.5"  r="1.5" fill="white"/>
          <circle cx="13.5"cy="12"   r="1.5" fill="white" fillOpacity="0.5"/>
          <path d="M10 13.5a3.5 3.5 0 01-3.5-3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Side panel */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 190,
          width: 300,
          background: vars['--cs-bg'],
          borderLeft: `1px solid ${vars['--cs-hairline']}`,
          boxShadow: open ? '-8px 0 40px rgba(0,0,0,0.1)' : 'none',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 20px 16px',
            borderBottom: `1px solid ${vars['--cs-hairline']}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            background: vars['--cs-bg'],
            zIndex: 1,
          }}
        >
          <div>
            <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: vars['--cs-violet'], margin: 0, fontFamily: 'Inter,sans-serif', fontWeight: 500 }}>
              COLOUR STUDIO
            </p>
            <h2 style={{ margin: '2px 0 0', fontSize: 16, fontWeight: 300, fontFamily: 'Fraunces,Georgia,serif', color: vars['--cs-ink'] }}>
              Customise Theme
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: vars['--cs-soft'] }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Controls */}
        <div style={{ padding: '16px 20px', flex: 1 }}>
          {controls.map(({ key, label, hint }) => (
            <div key={key} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 500, color: vars['--cs-ink'], fontFamily: 'Inter,sans-serif' }}>
                    {label}
                  </span>
                  <span style={{ fontSize: 10, color: vars['--cs-soft'], marginLeft: 6, fontFamily: 'Inter,sans-serif' }}>
                    {hint}
                  </span>
                </div>
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: vars['--cs-violet'], background: vars['--cs-lilac'], padding: '2px 6px', borderRadius: 4 }}>
                  {vars[key]}
                </span>
              </div>

              {/* Color input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <label style={{ position: 'relative', cursor: 'pointer' }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: vars[key],
                      border: `2px solid ${vars['--cs-hairline']}`,
                      cursor: 'pointer',
                    }}
                  />
                  <input
                    type="color"
                    value={vars[key]}
                    onChange={e => set(key, e.target.value)}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                  />
                </label>
                <div
                  style={{
                    flex: 1,
                    height: 36,
                    borderRadius: 10,
                    background: `linear-gradient(to right, ${vars[key]}22, ${vars[key]})`,
                    border: `1px solid ${vars['--cs-hairline']}`,
                  }}
                />
              </div>

              {/* Quick swatches */}
              {SWATCHES[key] && (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {SWATCHES[key].map(sw => (
                    <Swatch key={sw} color={sw} active={vars[key] === sw} onClick={() => set(key, sw)} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: `1px solid ${vars['--cs-hairline']}`,
            display: 'flex',
            gap: 8,
            position: 'sticky',
            bottom: 0,
            background: vars['--cs-bg'],
          }}
        >
          <button
            onClick={reset}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 10,
              border: `1px solid ${vars['--cs-hairline']}`,
              background: 'transparent',
              color: vars['--cs-soft'],
              fontSize: 11,
              fontFamily: 'Inter,sans-serif',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = vars['--cs-hairline']}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            RESET
          </button>
          <button
            onClick={exportTheme}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 10,
              border: 'none',
              background: vars['--cs-violet'],
              color: 'white',
              fontSize: 11,
              fontFamily: 'Inter,sans-serif',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {copied ? '✓ COPIED' : 'COPY THEME'}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 180,
            background: 'rgba(0,0,0,0.15)',
          }}
        />
      )}
    </>
  )
}
