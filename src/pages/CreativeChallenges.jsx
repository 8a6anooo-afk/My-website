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

const challenges = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 14h10M14 9v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="9" r="2" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
    tag: 'LEGAL',
    title: 'Copyright & Authorship',
    body: 'Who owns AI-generated imagery — the designer who wrote the prompt, the AI company whose model was trained on unlicensed data, or the original artists whose work fed the training corpus? Participants described a "legal grey zone" that clients are ill-equipped to navigate.',
    quote: '"I cannot tell my client they own this logo if I do not know where the training data came from."',
    severity: 'high',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 5v4M14 19v4M5 14h4M19 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    tag: 'AESTHETICS',
    title: 'Visual Homogenisation',
    body: "Generative AI models trained predominantly on Western visual archives produce outputs skewed toward global — predominantly Euro-American — aesthetic conventions. Bahraini designers report that AI tools “flatten” cultural nuance and make work “look like everyone else’s.”",
    quote: '"Midjourney does not know what a dilmun seal looks like. It gives me generic geometric. It erases us."',
    severity: 'high',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4l2.5 7.5H24l-6.5 4.5 2.5 7.5L14 19l-6 4.5 2.5-7.5L4 11.5h7.5L14 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    tag: 'ECONOMY',
    title: 'Glamorous Precarity & Job Security',
    body: 'Junior designers face a paradox: AI enables them to produce senior-level outputs, but simultaneously reduces demand for entry-level execution work. Several participants coined the phrase "glamorous precarity" — impressive portfolios, diminishing billable hours.',
    quote: '"I produce more. I earn less. My clients think they need me less."',
    severity: 'medium',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M8 22V14l6-10 6 10v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 22v-5h6v5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    tag: 'SKILLS',
    title: 'Skill Erosion vs Redistribution',
    body: 'Craft skills — hand lettering, technical illustration, print production knowledge — are in decline among younger practitioners who rely on AI for visual generation. Yet new skills emerge: prompt literacy, AI curation, human-AI collaboration design.',
    quote: '"I worry the next generation will not know how to draw. But perhaps they will know things we cannot imagine."',
    severity: 'medium',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 4l6 0 0 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 4L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    tag: 'CULTURE',
    title: 'Protecting Bahraini Visual Heritage',
    body: 'The preservation of distinctively Bahraini visual language — pearl diving iconography, Islamic geometry, the colour palettes of traditional crafts, the typography of Arabic dialects — is at risk when AI tools default to global training data and generic "Middle Eastern" stereotypes.',
    quote: '"Our identity is not just Arabic calligraphy. It is pearl boats and manama streets and the colour of the gulf at dusk."',
    severity: 'critical',
  },
]

const severityConfig = {
  critical: { label: 'CRITICAL', bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
  high: { label: 'HIGH', bg: '#FFF7ED', color: '#EA580C', border: '#FED7AA' },
  medium: { label: 'MEDIUM', bg: 'var(--cs-lilac)', color: 'var(--cs-violet)', border: 'color-mix(in srgb, var(--cs-violet) 35%, white)' },
}

export default function CreativeChallenges() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <Reveal>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: 'var(--cs-violet)' }}>CREATIVE CHALLENGES</p>
        <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--cs-ink)' }}>
          Tensions &<br />Uncertainties
        </h1>
        <p className="text-base max-w-2xl" style={{ color: 'var(--cs-soft)' }}>
          Five major challenge domains identified through participant interviews and survey open-text responses.
          Each card presents the challenge, a representative quote, and an impact assessment.
        </p>
      </Reveal>

      <div className="mt-12" style={{ height: '1px', background: 'var(--cs-hairline)' }}></div>

      <div className="mt-10 grid lg:grid-cols-2 gap-6">
        {challenges.map((c, i) => {
          const sev = severityConfig[c.severity]
          return (
            <Reveal key={c.title} delay={i * 90} className={c.severity === 'critical' ? 'lg:col-span-2' : ''}>
              <div
                className="rounded-2xl p-7 h-full transition-all duration-200 hover:scale-[1.01]"
                style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}
              >
                <div className="flex items-start justify-between mb-5 gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'var(--cs-lilac)', color: 'var(--cs-violet)' }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-0.5" style={{ color: 'var(--cs-violet)' }}>{c.tag}</p>
                      <h3 className="text-xl font-light" style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--cs-ink)' }}>{c.title}</h3>
                    </div>
                  </div>
                  <span
                    className="shrink-0 px-2.5 py-1 rounded-full text-[9px] font-medium tracking-widest"
                    style={{ background: sev.bg, color: sev.color, border: `1px solid ${sev.border}` }}
                  >
                    {sev.label}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--cs-soft)' }}>{c.body}</p>

                <blockquote
                  className="rounded-xl p-4 text-sm leading-relaxed"
                  style={{ background: 'var(--cs-bg)', borderLeft: '3px solid var(--cs-violet)', color: 'var(--cs-ink)', fontStyle: 'italic' }}
                >
                  {c.quote}
                </blockquote>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Csikszentmihalyi anchor */}
      <Reveal delay={100}>
        <div
          className="mt-10 rounded-2xl p-8 grid md:grid-cols-3 gap-6"
          style={{ background: 'linear-gradient(145deg, var(--cs-dark0), var(--cs-dark1))' }}
        >
          <div className="md:col-span-3">
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: 'color-mix(in srgb, var(--cs-violet) 75%, white)' }}>THEORETICAL LENS</p>
            <h3 className="text-2xl font-light mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'white' }}>
              The Systems Model Under Strain
            </h3>
          </div>
          {[
            { key: 'Individual', text: "Skill erosion and identity crisis: the designer's embodied expertise is devalued when AI can replicate it in seconds." },
            { key: 'Domain', text: 'Copyright chaos and aesthetic homogenisation: the shared conventions of graphic design are being rewritten faster than the Field can evaluate.' },
            { key: 'Field', text: 'Gatekeepers (clients, agencies, institutions) lack frameworks to judge AI-assisted creativity, creating validation uncertainty.' },
          ].map(item => (
            <div key={item.key}>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--cs-lime)' }}>{item.key}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
