import { useState, useEffect, useRef } from 'react'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.05 })
    el.style.transitionDelay = `${delay}ms`; obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

/* ── SVG Artwork placeholders with distinct aesthetics ─────────── */
function ArtworkAI1() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="ai1g" cx="40%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#6C4FE0"/>
          <stop offset="100%" stopColor="#0E0E10"/>
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#ai1g)"/>
      {[0,30,60,90,120,150].map(a => {
        const r = (Math.PI * a) / 180
        return <line key={a} x1={200} y1={150} x2={200 + 160 * Math.cos(r)} y2={150 + 160 * Math.sin(r)} stroke="#8B6FF0" strokeWidth="0.6" opacity="0.5"/>
      })}
      <circle cx="200" cy="150" r="80" fill="none" stroke="#6C4FE0" strokeWidth="1.5"/>
      <circle cx="200" cy="150" r="50" fill="#6C4FE0" opacity="0.2"/>
      <circle cx="200" cy="150" r="20" fill="#6FCF4E" opacity="0.6"/>
      <text x="200" y="256" textAnchor="middle" fontSize="9" fontFamily="Inter" fill="rgba(255,255,255,0.4)" letterSpacing="4">IDENTITY SYSTEM · AI-ASSISTED</text>
    </svg>
  )
}
function ArtworkAI2() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ai2g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1B1B20"/>
          <stop offset="100%" stopColor="#0E0E10"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#ai2g)"/>
      {Array.from({length: 6}).map((_, i) =>
        Array.from({length: 4}).map((_, j) => (
          <rect key={`${i}-${j}`} x={30 + i * 60} y={30 + j * 65} width={45} height={50} rx="4"
            fill="#6C4FE0" opacity={0.1 + (i + j) * 0.04}/>
        ))
      )}
      <text x="200" y="155" textAnchor="middle" fontSize="28" fontFamily="Fraunces,Georgia,serif" fill="white" fontWeight="200">الهوية</text>
      <text x="200" y="178" textAnchor="middle" fontSize="10" fontFamily="Inter" fill="rgba(255,255,255,0.3)" letterSpacing="3">BRAND GRID · MIDJOURNEY</text>
    </svg>
  )
}
function ArtworkAI3() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0E0E10"/>
      <defs>
        <radialGradient id="ai3g1" cx="30%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#6FCF4E" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="ai3g2" cx="70%" cy="70%" r="50%">
          <stop offset="0%" stopColor="#6C4FE0" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#ai3g1)"/>
      <rect width="400" height="300" fill="url(#ai3g2)"/>
      {[0,1,2,3,4].map(i => (
        <polygon key={i}
          points={`200,${80-i*8} ${280+i*6},${200+i*6} ${120-i*6},${200+i*6}`}
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      ))}
      <text x="200" y="165" textAnchor="middle" fontSize="18" fontFamily="Inter" fill="rgba(255,255,255,0.8)" letterSpacing="6">POSTER SERIES</text>
      <text x="200" y="183" textAnchor="middle" fontSize="9" fontFamily="Inter" fill="rgba(255,255,255,0.3)" letterSpacing="3">DALL-E ENHANCED</text>
    </svg>
  )
}
function ArtworkAI4() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#14141A"/>
      {Array.from({length: 12}).map((_, i) => (
        <path key={i}
          d={`M ${200 + 120*Math.cos(i*30*Math.PI/180)} ${150 + 100*Math.sin(i*30*Math.PI/180)} L 200 150`}
          stroke="#6C4FE0" strokeWidth="0.8" opacity="0.4"/>
      ))}
      <circle cx="200" cy="150" r="60" fill="#6C4FE0" opacity="0.12"/>
      <circle cx="200" cy="150" r="30" fill="#6C4FE0" opacity="0.25"/>
      <circle cx="200" cy="150" r="8" fill="#6FCF4E"/>
      <text x="200" y="230" textAnchor="middle" fontSize="10" fontFamily="Inter" fill="rgba(255,255,255,0.35)" letterSpacing="4">EDITORIAL LAYOUT · FIREFLY</text>
    </svg>
  )
}
function ArtworkNonAI1() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F0EDE7"/>
      <rect x="60" y="40" width="280" height="200" fill="none" stroke="#14141A" strokeWidth="1.5"/>
      <rect x="70" y="50" width="260" height="180" fill="none" stroke="#C8C2B8" strokeWidth="0.8"/>
      <circle cx="200" cy="130" r="60" fill="none" stroke="#14141A" strokeWidth="1.5"/>
      <line x1="140" y1="130" x2="260" y2="130" stroke="#14141A" strokeWidth="1"/>
      <line x1="200" y1="70" x2="200" y2="190" stroke="#14141A" strokeWidth="1"/>
      <text x="200" y="210" textAnchor="middle" fontSize="12" fontFamily="Fraunces,Georgia,serif" fill="#14141A">Typographic Study</text>
      <text x="200" y="226" textAnchor="middle" fontSize="8" fontFamily="Inter" fill="#6B6B72" letterSpacing="3">HANDCRAFTED · NO AI</text>
    </svg>
  )
}
function ArtworkNonAI2() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F8F4EE"/>
      <text x="60" y="120" fontSize="72" fontFamily="Fraunces,Georgia,serif" fill="#14141A" fontWeight="300">حرف</text>
      <text x="60" y="170" fontSize="14" fontFamily="Inter" fill="#6B6B72" letterSpacing="2">ARABIC LETTERING</text>
      <text x="60" y="190" fontSize="11" fontFamily="Inter" fill="#6B6B72">Hand-drawn, digitised</text>
      <line x1="60" y1="200" x2="340" y2="200" stroke="#E7E3DC" strokeWidth="1"/>
      <text x="60" y="220" fontSize="9" fontFamily="Inter" fill="#6B6B72" letterSpacing="4">NO AI ASSISTANCE</text>
    </svg>
  )
}
function ArtworkNonAI3() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#EDE9E3"/>
      {/* Dilmun seal-inspired pattern */}
      <circle cx="200" cy="140" r="80" fill="none" stroke="#14141A" strokeWidth="1.5"/>
      <circle cx="200" cy="140" r="55" fill="none" stroke="#14141A" strokeWidth="1"/>
      {[0,45,90,135,180,225,270,315].map(a => {
        const r = (a * Math.PI)/180
        return <line key={a} x1={200 + 55*Math.cos(r)} y1={140 + 55*Math.sin(r)}
          x2={200 + 80*Math.cos(r)} y2={140 + 80*Math.sin(r)}
          stroke="#14141A" strokeWidth="1.2"/>
      })}
      <circle cx="200" cy="140" r="18" fill="#14141A"/>
      <text x="200" y="245" textAnchor="middle" fontSize="10" fontFamily="Inter" fill="#6B6B72" letterSpacing="3">DILMUN MOTIF · TRADITIONAL</text>
    </svg>
  )
}
function ArtworkNonAI4() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#FAF8F4"/>
      <rect x="50" y="50" width="300" height="200" fill="#14141A"/>
      <rect x="65" y="65" width="270" height="170" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2"/>
      <text x="200" y="155" textAnchor="middle" fontSize="22" fontFamily="Fraunces,Georgia,serif" fill="white" fontWeight="200">Pearl Diver</text>
      <text x="200" y="177" textAnchor="middle" fontSize="9" fontFamily="Inter" fill="rgba(255,255,255,0.4)" letterSpacing="4">BAHRAINI HERITAGE SERIES</text>
      <text x="200" y="228" textAnchor="middle" fontSize="8" fontFamily="Inter" fill="#6B6B72" letterSpacing="3">MANUAL ILLUSTRATION</text>
    </svg>
  )
}

const works = [
  { id: 1, type: 'ai', tag: 'AI-Assisted', tool: 'Midjourney', title: 'Radial Identity System', designer: 'Designer A', artwork: ArtworkAI1, size: 'tall' },
  { id: 2, type: 'ai', tag: 'AI-Assisted', tool: 'Midjourney', title: 'Arabic Brand Grid', designer: 'Designer B', artwork: ArtworkAI2, size: 'normal' },
  { id: 3, type: 'non-ai', tag: 'Non-AI', tool: 'Pen & Illustrator', title: 'Typographic Study', designer: 'Designer A', artwork: ArtworkNonAI1, size: 'normal' },
  { id: 4, type: 'non-ai', tag: 'Non-AI', tool: 'Hand-lettered', title: 'Arabic Lettering', designer: 'Designer C', artwork: ArtworkNonAI2, size: 'tall' },
  { id: 5, type: 'ai', tag: 'AI-Assisted', tool: 'DALL-E', title: 'Gradient Poster Series', designer: 'Designer C', artwork: ArtworkAI3, size: 'normal' },
  { id: 6, type: 'non-ai', tag: 'Non-AI', tool: 'Traditional/Digital', title: 'Dilmun Motif', designer: 'Designer D', artwork: ArtworkNonAI3, size: 'normal' },
  { id: 7, type: 'ai', tag: 'AI-Assisted', tool: 'Adobe Firefly', title: 'Editorial Layout', designer: 'Designer D', artwork: ArtworkAI4, size: 'normal' },
  { id: 8, type: 'non-ai', tag: 'Non-AI', tool: 'Manual Illustration', title: 'Pearl Diver Heritage', designer: 'Designer B', artwork: ArtworkNonAI4, size: 'normal' },
]

export default function ShowcasePortfolio() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? works : works.filter(w => w.type === filter)

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <Reveal>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: '#6C4FE0' }}>SHOWCASE PORTFOLIO</p>
        <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#14141A' }}>
          Designer Works
        </h1>
        <p className="text-base max-w-2xl" style={{ color: '#6B6B72' }}>
          A curated selection of work from participating designers — highlighting the visual and conceptual
          differences between AI-assisted and non-AI creative outputs.
        </p>
      </Reveal>

      {/* Filter Toggle */}
      <Reveal delay={80}>
        <div
          className="mt-8 inline-flex rounded-full p-1"
          style={{ background: '#F0EDE7', border: '1px solid #E7E3DC' }}
        >
          {[
            { key: 'all', label: 'All Works' },
            { key: 'ai', label: 'AI-Assisted' },
            { key: 'non-ai', label: 'Non-AI' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-5 py-2 rounded-full text-xs font-medium tracking-widest uppercase transition-all duration-200"
              style={{
                background: filter === f.key ? '#6C4FE0' : 'transparent',
                color: filter === f.key ? 'white' : '#6B6B72',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Count */}
      <Reveal delay={100}>
        <p className="mt-4 text-xs" style={{ color: '#6B6B72' }}>
          Showing {filtered.length} work{filtered.length !== 1 ? 's' : ''}
        </p>
      </Reveal>

      {/* Grid */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-auto">
        {filtered.map((work, i) => {
          const Artwork = work.artwork
          return (
            <Reveal
              key={work.id}
              delay={i * 60}
              className={work.size === 'tall' ? 'row-span-1' : ''}
            >
              <div
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{ border: '1px solid #E7E3DC', background: '#FDFCFA' }}
              >
                {/* Image area */}
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <Artwork />
                  {/* Overlay badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-2.5 py-1 rounded-full text-[9px] font-medium tracking-widest"
                      style={{
                        background: work.type === 'ai' ? 'rgba(108,79,224,0.85)' : 'rgba(20,20,26,0.75)',
                        color: 'white',
                      }}
                    >
                      {work.tag.toUpperCase()}
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <h3
                    className="text-sm font-light mb-0.5"
                    style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#14141A' }}
                  >
                    {work.title}
                  </h3>
                  <p className="text-[11px]" style={{ color: '#6B6B72' }}>
                    {work.designer} &nbsp;·&nbsp; {work.tool}
                  </p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Comparative note */}
      <Reveal delay={100}>
        <div
          className="mt-12 rounded-2xl p-8"
          style={{ background: 'linear-gradient(145deg, #0E0E10, #1B1B20)' }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: '#8B6FF0' }}>
            VISUAL ANALYSIS NOTE
          </p>
          <p className="text-base leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
            AI-assisted works (left column) tend toward high-contrast, gradient-rich visuals with a global aesthetic finish.
            Non-AI works demonstrate stronger cultural specificity — Arabic letterforms, Dilmun geometric references, and
            handcraft textures — but at slower production speeds. Neither approach is superior; the tension between them
            defines the research's central inquiry.
          </p>
        </div>
      </Reveal>
    </div>
  )
}
