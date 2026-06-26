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
    </div>
  )
}
