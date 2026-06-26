import { useState, useRef, useEffect, useCallback } from 'react'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.1 })
    el.style.transitionDelay = `${delay}ms`; obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

/* ── Before/After Slider ───────────────────────────────────────── */
function BeforeAfterSlider({ beforeContent, afterContent, height = 480 }) {
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef(null)

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }, [])

  const onMouseDown = (e) => { e.preventDefault(); setDragging(true) }
  const onMouseMove = useCallback((e) => { if (dragging) updatePos(e.clientX) }, [dragging, updatePos])
  const onMouseUp = useCallback(() => setDragging(false), [])

  const onTouchStart = (e) => { setDragging(true) }
  const onTouchMove = useCallback((e) => { if (dragging) updatePos(e.touches[0].clientX) }, [dragging, updatePos])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onMouseUp)
    }
  }, [onMouseMove, onMouseUp, onTouchMove])

  return (
    <div
      ref={containerRef}
      className="ba-slider select-none"
      style={{ height, cursor: dragging ? 'col-resize' : 'col-resize' }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* Before (bottom layer) */}
      <div className="absolute inset-0">{beforeContent}</div>

      {/* After (clipped on top) */}
      <div
        className="ba-after"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {afterContent}
      </div>

      {/* Handle */}
      <div
        className="ba-handle"
        style={{ left: `${pos}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <div className="ba-handle-circle">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 9l-3 3-3-3M6 9l-3-3-3 3" stroke="#6C4FE0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 9 9)"/>
            <path d="M6 9h6" stroke="#6C4FE0" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M9 6l3 3-3 3" stroke="#6C4FE0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 6L6 9l3 3" stroke="#6C4FE0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full text-[10px] tracking-widest font-medium" style={{ background: 'rgba(20,20,26,0.7)', color: 'white' }}>WITHOUT AI</span>
      </div>
      <div className="absolute top-4 right-4 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full text-[10px] tracking-widest font-medium" style={{ background: 'rgba(108,79,224,0.85)', color: 'white' }}>WITH AI</span>
      </div>
    </div>
  )
}

/* ── Placeholder canvases (SVG) ───────────────────────────────── */
function BeforeCanvas() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#F0EDE7' }}>
      <svg width="100%" height="100%" viewBox="0 0 800 480" preserveAspectRatio="xMidYMid slice">
        {/* Rough hand-drawn feel */}
        <rect width="800" height="480" fill="#F0EDE7"/>
        <rect x="80" y="80" width="640" height="320" fill="none" stroke="#C8C2B8" strokeWidth="2" strokeDasharray="8,6"/>
        <text x="400" y="190" textAnchor="middle" fontFamily="Fraunces,Georgia,serif" fontSize="48" fill="#14141A" fontWeight="300">Brand Identity</text>
        <text x="400" y="240" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="14" fill="#6B6B72">Handcrafted — without AI assistance</text>
        {/* abstract shapes */}
        <circle cx="220" cy="340" r="50" fill="none" stroke="#14141A" strokeWidth="1.5"/>
        <circle cx="220" cy="340" r="30" fill="none" stroke="#14141A" strokeWidth="1"/>
        <rect x="330" y="295" width="70" height="90" fill="none" stroke="#14141A" strokeWidth="1.5"/>
        <polygon points="490,295 560,385 420,385" fill="none" stroke="#14141A" strokeWidth="1.5"/>
        <text x="400" y="430" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fill="#6B6B72" letterSpacing="4">ZAINAB · ALQATTAN · 2026</text>
      </svg>
    </div>
  )
}

function AfterCanvas() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#14141A' }}>
      <svg width="100%" height="100%" viewBox="0 0 800 480" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#6C4FE0" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#14141A" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6C4FE0"/>
            <stop offset="100%" stopColor="#6FCF4E"/>
          </linearGradient>
        </defs>
        <rect width="800" height="480" fill="#14141A"/>
        <ellipse cx="400" cy="240" rx="280" ry="280" fill="url(#glow)"/>
        {/* Geometric motif */}
        <polygon points="400,60 580,380 220,380" fill="none" stroke="url(#grad)" strokeWidth="1.5" opacity="0.6"/>
        <polygon points="400,110 550,360 250,360" fill="none" stroke="#6C4FE0" strokeWidth="0.8" opacity="0.4"/>
        <circle cx="400" cy="240" r="80" fill="none" stroke="url(#grad)" strokeWidth="1.5"/>
        <circle cx="400" cy="240" r="50" fill="#6C4FE0" opacity="0.15"/>
        {/* Orbital dots */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const r = 110, rad = (deg * Math.PI) / 180
          return <circle key={i} cx={400 + r * Math.cos(rad)} cy={240 + r * Math.sin(rad)} r={3} fill="#6C4FE0" opacity="0.7"/>
        })}
        <text x="400" y="230" textAnchor="middle" fontFamily="Fraunces,Georgia,serif" fontSize="36" fill="white" fontWeight="200">Brand Identity</text>
        <text x="400" y="262" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="12" fill="rgba(255,255,255,0.45)">Midjourney-assisted — AI-enhanced</text>
        <rect x="0" y="400" width="800" height="80" fill="#0E0E10"/>
        <text x="400" y="435" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="rgba(255,255,255,0.3)" letterSpacing="6">ZAINAB · ALQATTAN · 2026</text>
        <rect x="240" y="450" width="100" height="1" fill="#6C4FE0" opacity="0.6"/>
        <rect x="460" y="450" width="100" height="1" fill="#6FCF4E" opacity="0.6"/>
      </svg>
    </div>
  )
}

const comparisons = [
  {
    title: 'Concept Exploration',
    before: 'Pencil sketches and mood boards assembled manually from stock references; limited by time and available imagery.',
    after: 'Midjourney generated 30+ concept variants in minutes, dramatically expanding the visual search space during ideation.',
    delta: 'Ideation speed ×8',
    deltaColor: '#6C4FE0',
  },
  {
    title: 'Cultural Motif Integration',
    before: 'Bahraini geometric patterns (dilmun seals, muqarnas grids) hand-traced and digitised — high fidelity, slow process.',
    after: 'AI outputs merged these patterns with global aesthetics, raising questions about authenticity and cultural authorship.',
    delta: 'Authenticity tension ↑',
    deltaColor: '#E07A4F',
  },
  {
    title: 'Client Presentation Quality',
    before: 'Single polished direction; revisions required new full rounds of manual work.',
    after: 'Multiple high-fidelity directions delivered simultaneously; revision cycles shortened by ~60%.',
    delta: 'Revision time −60%',
    deltaColor: '#6FCF4E',
  },
]

export default function BeforeAfter() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <Reveal>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: '#6C4FE0' }}>BEFORE / AFTER CASE STUDY</p>
        <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#14141A' }}>
          Design With &<br />Without AI
        </h1>
        <p className="text-base max-w-2xl" style={{ color: '#6B6B72' }}>
          A visual analysis comparing design output, process, and creative decision-making when generative AI
          tools are and are not used. Drag the slider to reveal the transformation.
        </p>
      </Reveal>

      {/* Interactive Slider */}
      <Reveal delay={100}>
        <div className="mt-12 rounded-2xl overflow-hidden" style={{ border: '1px solid #E7E3DC' }}>
          <BeforeAfterSlider
            beforeContent={<BeforeCanvas />}
            afterContent={<AfterCanvas />}
            height={420}
          />
          <div className="grid grid-cols-2 divide-x" style={{ borderTop: '1px solid #E7E3DC', divideColor: '#E7E3DC' }}>
            <div className="p-5" style={{ background: '#FDFCFA' }}>
              <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: '#6B6B72' }}>WITHOUT AI</p>
              <p className="text-sm leading-relaxed" style={{ color: '#14141A' }}>
                Hand-crafted brand identity using traditional graphic design methods — pencil sketches,
                manual typesetting, and digitised cultural motifs. Every element intentionally authored.
              </p>
            </div>
            <div className="p-5" style={{ background: '#F8F6F1' }}>
              <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: '#6C4FE0' }}>WITH AI (MIDJOURNEY + FIREFLY)</p>
              <p className="text-sm leading-relaxed" style={{ color: '#14141A' }}>
                AI-augmented identity exploration — rapid generation of visual concepts, gradient and
                geometric motif merging, faster client iterations. Raises authorship questions.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Comparison table */}
      <Reveal delay={50}>
        <div className="mt-12" style={{ height: '1px', background: '#E7E3DC' }}></div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mt-8 mb-6" style={{ color: '#6C4FE0' }}>
          TRANSFORMATION ANALYSIS
        </p>
      </Reveal>

      <div className="space-y-4">
        {comparisons.map((c, i) => (
          <Reveal key={c.title} delay={i * 80}>
            <div className="grid md:grid-cols-3 gap-0 rounded-2xl overflow-hidden" style={{ border: '1px solid #E7E3DC' }}>
              {/* Label */}
              <div className="p-6" style={{ background: '#14141A' }}>
                <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  STAGE
                </p>
                <h3 className="text-lg font-light" style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'white' }}>
                  {c.title}
                </h3>
                <span
                  className="mt-3 inline-block px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide"
                  style={{ background: c.deltaColor + '22', color: c.deltaColor, border: `1px solid ${c.deltaColor}44` }}
                >
                  {c.delta}
                </span>
              </div>
              {/* Before */}
              <div className="p-6" style={{ background: '#FDFCFA', borderLeft: '1px solid #E7E3DC' }}>
                <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: '#6B6B72' }}>BEFORE</p>
                <p className="text-sm leading-relaxed" style={{ color: '#14141A' }}>{c.before}</p>
              </div>
              {/* After */}
              <div className="p-6" style={{ background: '#EDE9FA22', borderLeft: '1px solid #E7E3DC' }}>
                <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: '#6C4FE0' }}>AFTER</p>
                <p className="text-sm leading-relaxed" style={{ color: '#14141A' }}>{c.after}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Reflection */}
      <Reveal delay={100}>
        <div
          className="mt-10 rounded-2xl p-8"
          style={{ background: 'linear-gradient(145deg, #0E0E10, #1B1B20)' }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: '#8B6FF0' }}>THEORETICAL REFLECTION</p>
          <p className="text-base leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Through Csikszentmihalyi's lens, the AI tool enters the <em style={{ color: '#8B6FF0' }}>Domain</em> — altering
            its rules and symbols — while the designer's relationship with the <em style={{ color: '#8B6FF0' }}>Individual</em> dimension
            (skill, intuition, cultural memory) is simultaneously amplified and threatened. The <em style={{ color: '#8B6FF0' }}>Field</em> (clients,
            peers, institutions) is yet to reach consensus on whether AI-assisted work carries the same creative legitimacy.
          </p>
        </div>
      </Reveal>
    </div>
  )
}
