import { useEffect, useRef } from 'react'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.08 })
    el.style.transitionDelay = `${delay}ms`; obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const palette = [
  { name: 'Background Cream', hex: 'var(--cs-bg)', role: 'Page background, light surfaces', text: 'var(--cs-ink)' },
  { name: 'Heading Ink', hex: 'var(--cs-ink)', role: 'Headings, primary text', text: 'white' },
  { name: 'Soft Grey', hex: 'var(--cs-soft)', role: 'Body text, subtitles, nav labels', text: 'white' },
  { name: 'Violet Accent', hex: 'var(--cs-violet)', role: 'Primary accent — eyebrows, links, badges', text: 'white' },
  { name: 'Lilac', hex: 'var(--cs-lilac)', role: 'Active nav pill, tinted surfaces', text: 'var(--cs-violet)' },
  { name: 'Lime Green', hex: 'var(--cs-lime)', role: 'Status dot, tiny highlights only', text: 'var(--cs-ink)' },
  { name: 'Dark Base', hex: 'var(--cs-dark0)', role: 'Dark card gradient start', text: 'white' },
  { name: 'Dark Surface', hex: 'var(--cs-dark1)', role: 'Dark card gradient end', text: 'white' },
  { name: 'Hairline', hex: 'var(--cs-hairline)', role: 'Borders, dividers, strokes', text: 'var(--cs-ink)' },
]

const typeScale = [
  { name: 'Display / Hero', family: 'Fraunces', sample: 'Creative Space', size: '56–96px', weight: '200–300', role: 'Page titles, hero' },
  { name: 'Heading H1', family: 'Fraunces', sample: 'Design Research', size: '40–56px', weight: '300', role: 'Section headings' },
  { name: 'Heading H2', family: 'Fraunces', sample: 'Theoretical Foundations', size: '24–32px', weight: '300', role: 'Sub-headings' },
  { name: 'Eyebrow', family: 'Inter', sample: 'CONTEXT & SCOPE', size: '10px', weight: '500', role: 'Section labels, nav' },
  { name: 'Body', family: 'Inter', sample: 'A mixed-methods investigation into the impact of AI on creativity.', size: '14–16px', weight: '400', role: 'Paragraphs' },
  { name: 'Caption', family: 'Inter', sample: 'Illustrative sample data · 2026', size: '11–12px', weight: '400', role: 'Captions, labels' },
]

const components = [
  {
    name: 'Pill Badge',
    desc: 'Fully rounded, tiny icon, coloured background.',
    render: (
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-widest" style={{ background: 'var(--cs-lilac)', color: 'var(--cs-violet)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--cs-violet)' }}></span>
          RESEARCH-LED
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-widest" style={{ background: 'var(--cs-lilac)', color: 'var(--cs-violet)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--cs-lime)' }}></span>
          ILLUSTRATIVE DATA
        </span>
      </div>
    ),
  },
  {
    name: 'Card',
    desc: '18px radius, hairline border, minimal shadow.',
    render: (
      <div className="rounded-[18px] p-5 max-w-xs" style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}>
        <p className="text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--cs-violet)' }}>EYEBROW LABEL</p>
        <p className="text-sm font-light" style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--cs-ink)' }}>Card heading in Fraunces Light</p>
        <p className="text-xs mt-2" style={{ color: 'var(--cs-soft)' }}>Supporting body text in Inter Regular at 12–14px.</p>
      </div>
    ),
  },
  {
    name: 'Dark Card',
    desc: 'Near-black gradient, white text inside.',
    render: (
      <div className="rounded-[18px] p-5 max-w-xs" style={{ background: 'linear-gradient(145deg, var(--cs-dark0), var(--cs-dark1))' }}>
        <p className="text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: 'color-mix(in srgb, var(--cs-violet) 75%, white)' }}>DARK CARD EYEBROW</p>
        <p className="text-sm font-light" style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'white' }}>Feature card on dark surface</p>
        <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Body text at reduced opacity on dark.</p>
      </div>
    ),
  },
  {
    name: 'Navigation Pill',
    desc: 'Active state: soft lilac pill with violet text.',
    render: (
      <div className="flex gap-2 flex-wrap">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-widest font-medium" style={{ background: 'var(--cs-lilac)', color: 'var(--cs-violet)' }}>
          ACTIVE NAV
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-widest" style={{ color: 'var(--cs-soft)' }}>
          INACTIVE NAV
        </span>
      </div>
    ),
  },
]

export default function Identity() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      {/* Header */}
      <Reveal>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: 'var(--cs-violet)' }}>IDENTITY</p>
        <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--cs-ink)' }}>
          Brand Style<br />Guide
        </h1>
        <p className="text-base max-w-xl" style={{ color: 'var(--cs-soft)' }}>
          The visual language of the Creative Space research project — logo, colour system, typography scale,
          and core UI components.
        </p>
      </Reveal>

      {/* Logo */}
      <Reveal delay={80}>
        <div className="mt-12" style={{ height: '1px', background: 'var(--cs-hairline)' }}></div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mt-8 mb-6" style={{ color: 'var(--cs-violet)' }}>LOGO MARK</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Light */}
          <div className="rounded-2xl p-10 flex items-center gap-4" style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg,var(--cs-violet),color-mix(in srgb, var(--cs-violet) 75%, white))' }}>
              <svg width="32" height="32" viewBox="0 0 16 16" fill="none">
                <path d="M3 8c0-2.76 2.24-5 5-5 1.5 0 2.84.66 3.77 1.7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="11" cy="6.5" r="1.5" fill="var(--cs-lime)"/>
                <path d="M13 8c0 2.76-2.24 5-5 5-1.5 0-2.84-.66-3.77-1.7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="5" cy="9.5" r="1.5" fill="white" fillOpacity="0.5"/>
              </svg>
            </div>
            <div>
              <p className="text-xl font-semibold" style={{ color: 'var(--cs-ink)' }}>Creative Space</p>
              <p className="text-xs tracking-widest uppercase mt-0.5" style={{ color: 'var(--cs-soft)' }}>Voices of Bahraini Female Designers</p>
            </div>
          </div>
          {/* Dark */}
          <div className="rounded-2xl p-10 flex items-center gap-4" style={{ background: 'linear-gradient(145deg, var(--cs-dark0), var(--cs-dark1))' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: 'color-mix(in srgb, var(--cs-violet) 20%, transparent)', border: '1px solid color-mix(in srgb, var(--cs-violet) 30%, transparent)' }}>
              <svg width="32" height="32" viewBox="0 0 16 16" fill="none">
                <path d="M3 8c0-2.76 2.24-5 5-5 1.5 0 2.84.66 3.77 1.7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="11" cy="6.5" r="1.5" fill="var(--cs-lime)"/>
                <path d="M13 8c0 2.76-2.24 5-5 5-1.5 0-2.84-.66-3.77-1.7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="5" cy="9.5" r="1.5" fill="white" fillOpacity="0.5"/>
              </svg>
            </div>
            <div>
              <p className="text-xl font-semibold" style={{ color: 'white' }}>Creative Space</p>
              <p className="text-xs tracking-widest uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Voices of Bahraini Female Designers</p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Colour palette */}
      <Reveal delay={50}>
        <div className="mt-10" style={{ height: '1px', background: 'var(--cs-hairline)' }}></div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mt-8 mb-6" style={{ color: 'var(--cs-violet)' }}>COLOUR PALETTE</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {palette.map((c) => (
            <div key={c.hex} className="group">
              <div
                className="rounded-xl mb-2 transition-transform duration-200 group-hover:scale-105"
                style={{ background: c.hex, height: 72, border: c.hex === 'var(--cs-bg)' ? '1px solid var(--cs-hairline)' : 'none' }}
              ></div>
              <p className="text-xs font-medium" style={{ color: 'var(--cs-ink)' }}>{c.name}</p>
              <p className="text-[10px] font-mono" style={{ color: 'var(--cs-violet)' }}>{c.hex}</p>
              <p className="text-[10px]" style={{ color: 'var(--cs-soft)' }}>{c.role}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Typography */}
      <Reveal delay={50}>
        <div className="mt-10" style={{ height: '1px', background: 'var(--cs-hairline)' }}></div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mt-8 mb-6" style={{ color: 'var(--cs-violet)' }}>TYPOGRAPHY SCALE</p>
        <div className="space-y-4">
          {typeScale.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-5 grid md:grid-cols-3 gap-4 items-center"
              style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}
            >
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--cs-soft)' }}>{t.name}</p>
                <p className="text-[10px]" style={{ color: 'var(--cs-soft)' }}>{t.family} · {t.weight} · {t.size}</p>
              </div>
              <div className="md:col-span-2 overflow-hidden">
                <span
                  style={{
                    fontFamily: t.family === 'Fraunces' ? 'Fraunces, Georgia, serif' : 'Inter, sans-serif',
                    fontSize: t.name === 'Display / Hero' ? 28 : t.name === 'Heading H1' ? 22 : t.name === 'Heading H2' ? 17 : t.name === 'Eyebrow' ? 10 : t.name === 'Body' ? 14 : 11,
                    fontWeight: t.weight === '200' ? 200 : t.weight === '300' ? 300 : t.weight === '500' ? 500 : 400,
                    letterSpacing: t.name === 'Eyebrow' ? '0.2em' : undefined,
                    textTransform: t.name === 'Eyebrow' ? 'uppercase' : undefined,
                    color: 'var(--cs-ink)',
                  }}
                >
                  {t.sample}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Components */}
      <Reveal delay={50}>
        <div className="mt-10" style={{ height: '1px', background: 'var(--cs-hairline)' }}></div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mt-8 mb-6" style={{ color: 'var(--cs-violet)' }}>UI COMPONENTS</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {components.map((c) => (
            <div key={c.name} className="rounded-2xl p-6" style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}>
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: 'var(--cs-violet)' }}>{c.name}</p>
              <p className="text-xs mb-4" style={{ color: 'var(--cs-soft)' }}>{c.desc}</p>
              {c.render}
            </div>
          ))}
        </div>
      </Reveal>

      {/* Spacing & Radius note */}
      <Reveal delay={50}>
        <div
          className="mt-8 rounded-2xl p-6"
          style={{ background: 'linear-gradient(145deg, var(--cs-dark0), var(--cs-dark1))' }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: 'color-mix(in srgb, var(--cs-violet) 75%, white)' }}>SPACING & GEOMETRY</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { label: 'Border Radius', values: ['4px — tag', '12px — small card', '18px — card', '999px — pill'] },
              { label: 'Spacing Scale', values: ['4px base unit', '16px section gap', '48px section padding', '80–120px hero padding'] },
              { label: 'Borders', values: ['1px solid var(--cs-hairline)', 'No shadows on cards', 'Only hairlines divide content', 'Gradient fills replace depth'] },
            ].map(g => (
              <div key={g.label}>
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--cs-lime)' }}>{g.label}</p>
                <ul className="space-y-1">
                  {g.values.map(v => (
                    <li key={v} className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{v}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── DATA VISUALISATION STYLE ─────────────────────────────── */}
      <Reveal delay={50}>
        <div className="mt-10" style={{ height: '1px', background: 'var(--cs-hairline)' }}></div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mt-8 mb-2" style={{ color: 'var(--cs-violet)' }}>DATA VISUALISATION STYLE</p>
        <p className="text-sm mb-6 max-w-2xl" style={{ color: 'var(--cs-soft)' }}>
          Colour rules for all charts and graphs — connecting data identity to brand identity.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { hex: '#6128ED', label: 'Primary Data', rule: 'Main data series, bars, primary metric' },
            { hex: '#7DF95A', label: 'AI / Highlight', rule: 'AI-related data, accent comparison' },
            { hex: '#B8FCAC', label: 'Secondary', rule: 'Non-AI comparison, supporting series' },
            { hex: '#F3ECFF', label: 'Chart Background', rule: 'Grid lines, tinted chart surfaces' },
          ].map(c => (
            <div key={c.hex} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--cs-hairline)' }}>
              <div style={{ height: 56, background: c.hex, border: c.hex === '#F3ECFF' ? '1px solid var(--cs-hairline)' : 'none' }}></div>
              <div className="p-3" style={{ background: 'var(--cs-bg)' }}>
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--cs-ink)' }}>{c.label}</p>
                <p className="text-[10px] font-mono mb-1" style={{ color: 'var(--cs-violet)' }}>{c.hex}</p>
                <p className="text-[10px]" style={{ color: 'var(--cs-soft)' }}>{c.rule}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {/* Big stat */}
          <div className="rounded-2xl p-6 flex flex-col items-center justify-center text-center" style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--cs-soft)' }}>STAT NUMBER</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 64, fontWeight: 700, lineHeight: 1, color: '#6128ED' }}>
              73<span style={{ fontSize: 36, color: '#7DF95A' }}>%</span>
            </p>
            <p className="text-xs mt-3" style={{ color: 'var(--cs-soft)' }}>Use AI weekly or daily</p>
          </div>

          {/* Bar chart example */}
          <div className="rounded-2xl p-6" style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--cs-soft)' }}>BAR CHART</p>
            <div className="space-y-2.5">
              {[
                { label: 'Midjourney', pct: 78, color: '#6128ED' },
                { label: 'Firefly', pct: 54, color: '#6128ED' },
                { label: 'ChatGPT', pct: 91, color: '#7DF95A' },
                { label: 'DALL·E', pct: 41, color: '#B8FCAC' },
              ].map(b => (
                <div key={b.label}>
                  <div className="flex justify-between mb-1" style={{ fontSize: 10, color: 'var(--cs-soft)' }}>
                    <span>{b.label}</span>
                    <span style={{ color: b.color, fontWeight: 600 }}>{b.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: '#F3ECFF' }}>
                    <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: b.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Donut example */}
          <div className="rounded-2xl p-6" style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--cs-soft)' }}>DONUT CHART</p>
            <div className="flex items-center gap-4">
              <svg viewBox="0 0 80 80" width="76" height="76" className="shrink-0">
                <circle cx="40" cy="40" r="29" fill="none" stroke="#F3ECFF" strokeWidth="12"/>
                <circle cx="40" cy="40" r="29" fill="none" stroke="#6128ED" strokeWidth="12"
                  strokeDasharray={`${0.64 * 182} ${182}`} strokeDashoffset="45.5" strokeLinecap="round"/>
                <circle cx="40" cy="40" r="29" fill="none" stroke="#7DF95A" strokeWidth="12"
                  strokeDasharray={`${0.18 * 182} ${182}`} strokeDashoffset={`${45.5 - 0.64 * 182}`} strokeLinecap="round"/>
                <text x="40" y="44" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6128ED" fontFamily="Inter,sans-serif">64%</text>
              </svg>
              <div className="space-y-1.5 flex-1">
                {[
                  { color: '#6128ED', label: 'Augment', pct: '64%' },
                  { color: '#7DF95A', label: 'Threat', pct: '18%' },
                  { color: '#B8FCAC', label: 'Neutral', pct: '12%' },
                  { color: '#F3ECFF', label: 'Unsure', pct: '6%', border: true },
                ].map(d => (
                  <div key={d.label} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: d.color, border: d.border ? '1px solid var(--cs-hairline)' : 'none' }}></div>
                    <span style={{ fontSize: 10, color: 'var(--cs-soft)' }}>{d.label}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--cs-ink)', marginLeft: 'auto' }}>{d.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── LOGO DON'TS ──────────────────────────────────────────── */}
      <Reveal delay={50}>
        <div className="mt-10" style={{ height: '1px', background: 'var(--cs-hairline)' }}></div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mt-8 mb-2" style={{ color: 'var(--cs-violet)' }}>LOGO DON'TS</p>
        <p className="text-sm mb-6 max-w-xl" style={{ color: 'var(--cs-soft)' }}>
          Never modify the logo mark. These six misuses are strictly prohibited.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: 'Do not stretch or distort', sx: { transform: 'scaleX(1.6)' }, bg: '#FEF2F2' },
            { label: 'Do not rotate', sx: { transform: 'rotate(30deg)' }, bg: '#FEF2F2' },
            { label: 'Do not recolour', altColor: '#E07A4F', bg: '#FEF2F2' },
            { label: 'Do not add drop shadow', sx: { filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.5))' }, bg: '#FEF2F2' },
            { label: 'Do not place on busy background', busyBg: true, bg: 'transparent' },
            { label: 'Do not scale below 40 px', tinySize: 18, bg: '#FEF2F2' },
          ].map((d, i) => {
            const iconColor = d.altColor || (d.busyBg ? 'white' : '#6128ED')
            const dotColor = d.altColor || (d.busyBg ? 'white' : '#7DF95A')
            const size = d.tinySize || 46
            return (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ border: '1px solid #FECACA' }}>
                <div
                  className="h-24 flex items-center justify-center relative"
                  style={{
                    background: d.busyBg
                      ? 'repeating-linear-gradient(45deg,#6128ED 0,#6128ED 10px,#7DF95A 10px,#7DF95A 20px)'
                      : d.bg,
                  }}
                >
                  <div
                    className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: '#DC2626', color: 'white', fontSize: 10, fontWeight: 700 }}
                  >✕</div>
                  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={d.sx || {}}>
                    <path d="M8 16c0-4.4 3.6-8 8-8 2.4 0 4.5 1.05 6.05 2.72" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="17.6" cy="10.4" r="2.6" fill={dotColor}/>
                    <path d="M24 16c0 4.4-3.6 8-8 8-2.4 0-4.5-1.05-6.05-2.72" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="8.4" cy="19.6" r="2" fill={iconColor} opacity="0.4"/>
                  </svg>
                </div>
                <div className="px-4 py-2.5" style={{ background: 'var(--cs-bg)' }}>
                  <p style={{ fontSize: 10, fontWeight: 500, color: '#DC2626' }}>{d.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>

      {/* ── BUTTONS & INTERACTIVE STATES ─────────────────────────── */}
      <Reveal delay={50}>
        <div className="mt-10" style={{ height: '1px', background: 'var(--cs-hairline)' }}></div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mt-8 mb-6" style={{ color: 'var(--cs-violet)' }}>BUTTONS & INTERACTIVE STATES</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl p-6" style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: 'var(--cs-violet)' }}>PRIMARY BUTTON</p>
            <div className="space-y-3">
              <div>
                <button className="px-5 py-2.5 rounded-full text-xs font-medium tracking-wide" style={{ background: '#6128ED', color: 'white' }}>Explore Research</button>
                <p className="text-[10px] mt-1" style={{ color: 'var(--cs-soft)' }}>Default — #6128ED</p>
              </div>
              <div>
                <button className="px-5 py-2.5 rounded-full text-xs font-medium tracking-wide" style={{ background: '#250C5A', color: 'white' }}>Explore Research</button>
                <p className="text-[10px] mt-1" style={{ color: 'var(--cs-soft)' }}>Hover — #250C5A</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl p-6" style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: 'var(--cs-violet)' }}>SECONDARY & ACCENT</p>
            <div className="space-y-3">
              <div>
                <button className="px-5 py-2.5 rounded-full text-xs font-medium tracking-wide" style={{ border: '1.5px solid #6128ED', color: '#6128ED', background: 'transparent' }}>View Showcase</button>
                <p className="text-[10px] mt-1" style={{ color: 'var(--cs-soft)' }}>Secondary — outlined violet</p>
              </div>
              <div>
                <button className="px-5 py-2.5 rounded-full text-xs font-medium tracking-wide" style={{ background: '#7DF95A', color: '#14141A' }}>Download Report</button>
                <p className="text-[10px] mt-1" style={{ color: 'var(--cs-soft)' }}>Accent — lime, dark text</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl p-6 sm:col-span-2" style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: 'var(--cs-violet)' }}>FILTER TAGS</p>
            <div className="flex flex-wrap gap-2">
              {['All', 'AI-Assisted', 'Non-AI', 'Branding', 'Editorial', 'Motion'].map((tag, i) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-[10px] tracking-widest font-medium"
                  style={i === 0
                    ? { background: '#6128ED', color: 'white' }
                    : { background: '#F3ECFF', color: '#6128ED', border: '1px solid #E0D4FF' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── ICONOGRAPHY ──────────────────────────────────────────── */}
      <Reveal delay={50}>
        <div className="mt-10" style={{ height: '1px', background: 'var(--cs-hairline)' }}></div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mt-8 mb-2" style={{ color: 'var(--cs-violet)' }}>ICONOGRAPHY</p>
        <p className="text-sm mb-6" style={{ color: 'var(--cs-soft)' }}>Line style · 1.5px stroke · Rounded caps & joins · 24×24px grid</p>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {[
            { name: 'Data', path: <><rect x="3" y="12" width="3" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="10.5" y="7" width="3" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="18" y="3" width="3" height="18" rx="1" stroke="currentColor" strokeWidth="1.5"/></> },
            { name: 'Research', path: <><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 8v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
            { name: 'Challenges', path: <path d="M12 3l2 6h6l-5 3.5 2 6L12 15l-5 3.5 2-6L4 9h6L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/> },
            { name: 'Future', path: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 3v9l5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
            { name: 'Portfolio', path: <><rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 6V4a2 2 0 014 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="13" r="2" stroke="currentColor" strokeWidth="1.5"/></> },
            { name: 'Identity', path: <><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
            { name: 'Before/After', path: <><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M12 4v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2"/><path d="M8 10l-2 2 2 2M16 10l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></> },
            { name: 'Quote', path: <><path d="M3 8h8M3 12h5M3 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M15 8h6M15 12h4M15 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
          ].map(ic => (
            <div key={ic.name} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--cs-lilac)', color: 'var(--cs-violet)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{ic.path}</svg>
              </div>
              <p style={{ fontSize: 9, color: 'var(--cs-soft)', textAlign: 'center' }}>{ic.name}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── GRID & LAYOUT ────────────────────────────────────────── */}
      <Reveal delay={50}>
        <div className="mt-10" style={{ height: '1px', background: 'var(--cs-hairline)' }}></div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mt-8 mb-6" style={{ color: 'var(--cs-violet)' }}>GRID & LAYOUT</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-6" style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--cs-soft)' }}>12-COLUMN GRID</p>
            <div className="grid grid-cols-12 gap-1 mb-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-14 rounded-sm"
                  style={{
                    background: i === 0 || i === 11 ? 'var(--cs-hairline)' : '#F3ECFF',
                    border: '1px solid color-mix(in srgb, var(--cs-violet) 15%, transparent)',
                  }}
                ></div>
              ))}
            </div>
            <p style={{ fontSize: 10, color: 'var(--cs-soft)' }}>Margins: 24px outer · Gutter: 16px · Max-width: 1280px</p>
          </div>
          <div className="rounded-2xl p-6" style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--cs-soft)' }}>SPACING SCALE</p>
            <div className="space-y-3">
              {[
                { label: '4px', desc: 'Micro — icon gap', w: 12 },
                { label: '8px', desc: 'XS — element gap', w: 24 },
                { label: '16px', desc: 'SM — component gap', w: 48 },
                { label: '32px', desc: 'MD — section internal', w: 96 },
                { label: '64px', desc: 'LG — section padding', w: 192 },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="rounded shrink-0" style={{ width: s.w, height: 10, background: '#6128ED', opacity: 0.25 + s.w / 300 }}></div>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--cs-ink)', fontFamily: 'monospace' }}>{s.label}</span>
                    <span style={{ fontSize: 10, color: 'var(--cs-soft)' }}> — {s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── APPLICATIONS / MOCKUPS ───────────────────────────────── */}
      <Reveal delay={50}>
        <div className="mt-10" style={{ height: '1px', background: 'var(--cs-hairline)' }}></div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mt-8 mb-2" style={{ color: 'var(--cs-violet)' }}>APPLICATIONS</p>
        <p className="text-sm mb-6 max-w-xl" style={{ color: 'var(--cs-soft)' }}>
          The identity in context — how the brand appears across digital and physical touchpoints.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">

          {/* Instagram post */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--cs-hairline)' }}>
            <svg width="100%" viewBox="0 0 320 320" style={{ display: 'block' }}>
              <rect width="320" height="320" fill="#6128ED"/>
              <ellipse cx="260" cy="60" rx="130" ry="130" fill="#7DF95A" opacity="0.07"/>
              <ellipse cx="80" cy="270" rx="100" ry="100" fill="#250C5A" opacity="0.4"/>
              <circle cx="138" cy="128" r="14" fill="#7DF95A"/>
              <path d="M122 148 Q138 164 158 158 Q178 152 180 136" stroke="#7DF95A" strokeWidth="12" fill="none" strokeLinecap="round"/>
              <path d="M136 160 Q152 180 172 174 Q188 168 188 152" stroke="#250C5A" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.6"/>
              <text x="160" y="212" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="700" fill="white" letterSpacing="3">CREATIVE</text>
              <text x="160" y="234" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="400" fill="#7DF95A" letterSpacing="6">SPACE</text>
              <text x="160" y="274" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="rgba(255,255,255,0.4)" letterSpacing="2">VOICES OF BAHRAINI FEMALE DESIGNERS</text>
            </svg>
            <div className="p-3" style={{ background: 'var(--cs-bg)' }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--cs-ink)' }}>Instagram / Social</p>
              <p style={{ fontSize: 10, color: 'var(--cs-soft)' }}>1080 × 1080px · Primary violet</p>
            </div>
          </div>

          {/* Business card */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--cs-hairline)' }}>
            <div className="p-6 flex items-center justify-center" style={{ background: '#F3ECFF', minHeight: 200 }}>
              <svg viewBox="0 0 280 160" width="260" style={{ display: 'block' }}>
                <rect width="280" height="160" rx="10" fill="#FDFBF8" stroke="#E0D4FF" strokeWidth="1"/>
                <rect x="0" y="0" width="9" height="160" rx="5" fill="#6128ED"/>
                <circle cx="38" cy="40" r="16" fill="#6128ED"/>
                <circle cx="38" cy="32" r="5" fill="#7DF95A"/>
                <path d="M28 48 Q38 58 50 54 Q60 50 62 42" stroke="#7DF95A" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <text x="68" y="38" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700" fill="#250C5A">CREATIVE</text>
                <text x="68" y="52" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="400" fill="#6128ED" letterSpacing="4">SPACE</text>
                <line x1="20" y1="70" x2="260" y2="70" stroke="#E0D4FF" strokeWidth="1"/>
                <text x="20" y="94" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#250C5A">Zainab Alqattan</text>
                <text x="20" y="110" fontFamily="Inter, sans-serif" fontSize="9" fill="#6128ED">Research Designer · CM9103</text>
                <text x="20" y="140" fontFamily="Inter, sans-serif" fontSize="8" fill="#999" letterSpacing="0.5">zainab@creativespace.bh</text>
                <rect x="220" y="125" width="40" height="24" rx="4" fill="#6128ED"/>
                <text x="240" y="141" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="#7DF95A" fontWeight="700">QR</text>
              </svg>
            </div>
            <div className="p-3" style={{ background: 'var(--cs-bg)' }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--cs-ink)' }}>Business Card</p>
              <p style={{ fontSize: 10, color: 'var(--cs-soft)' }}>85 × 55mm · Light background</p>
            </div>
          </div>

          {/* Mobile screen */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--cs-hairline)' }}>
            <div className="flex items-center justify-center py-6" style={{ background: '#0E0E10', minHeight: 200 }}>
              <svg viewBox="0 0 120 230" width="100" style={{ display: 'block' }}>
                <rect width="120" height="230" rx="20" fill="#1A1A20"/>
                <rect x="4" y="4" width="112" height="222" rx="16" fill="#14141A"/>
                <rect x="42" y="10" width="36" height="5" rx="2.5" fill="#2A2A30"/>
                <rect x="8" y="24" width="104" height="194" rx="12" fill="#FDFBF8"/>
                {/* Top nav */}
                <rect x="8" y="24" width="104" height="26" rx="12" fill="#6128ED"/>
                <rect x="8" y="38" width="104" height="12" fill="#6128ED"/>
                <circle cx="22" cy="37" r="7" fill="#7DF95A" opacity="0.9"/>
                <text x="34" y="41" fontFamily="Inter, sans-serif" fontSize="7" fontWeight="600" fill="white">Creative Space</text>
                {/* Hero text */}
                <rect x="16" y="60" width="55" height="5" rx="2.5" fill="#250C5A"/>
                <rect x="16" y="70" width="88" height="3" rx="1.5" fill="#E0D4FF"/>
                <rect x="16" y="77" width="68" height="3" rx="1.5" fill="#E0D4FF"/>
                {/* Cards */}
                <rect x="16" y="92" width="42" height="38" rx="6" fill="#F3ECFF"/>
                <rect x="62" y="92" width="42" height="38" rx="6" fill="#6128ED"/>
                <rect x="16" y="138" width="88" height="22" rx="6" fill="#F3ECFF"/>
                <rect x="16" y="168" width="88" height="22" rx="6" fill="#7DF95A" opacity="0.25"/>
                <rect x="16" y="198" width="88" height="14" rx="4" fill="#E0D4FF"/>
              </svg>
            </div>
            <div className="p-3" style={{ background: 'var(--cs-bg)' }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--cs-ink)' }}>Mobile Screen</p>
              <p style={{ fontSize: 10, color: 'var(--cs-soft)' }}>375px viewport · Cream surface</p>
            </div>
          </div>

        </div>
      </Reveal>
    </div>
  )
}
