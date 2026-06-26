import { useEffect, useRef, useState } from 'react'

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

const quotes = [
  {
    text: "I do not fear AI. I fear a world where only those who can afford the best AI prompts can compete. Bahrain's creative economy must ensure access is equitable.",
    author: 'Participant A',
    role: 'Senior Brand Designer, Manama',
    sentiment: 'cautious',
  },
  {
    text: "Bahrain Vision 2030 talks about a knowledge economy. If we train the next generation of designers to be AI orchestrators — curators of machine creativity — we become innovators, not consumers.",
    author: 'Participant B',
    role: 'Graphic Design Educator, Bahrain Polytechnic',
    sentiment: 'optimistic',
  },
  {
    text: "The tools change. The need for a designer who understands culture, who has visited the souk in Muharraq, who knows what Bahrainis feel — that does not change.",
    author: 'Participant C',
    role: 'Freelance Identity Designer',
    sentiment: 'grounded',
  },
  {
    text: "My work now is half making, half curating. I generate a hundred images and find the one that feels true. That is a new kind of creativity. I am still the author.",
    author: 'Participant D',
    role: 'UX/Visual Designer',
    sentiment: 'optimistic',
  },
  {
    text: "I worry about the young designers who will never struggle. Struggle teaches you what matters. If AI removes that struggle, what does design mean?",
    author: 'Participant E',
    role: 'Illustrator & Art Director',
    sentiment: 'cautious',
  },
]

const sentimentConfig = {
  optimistic: { color: '#6FCF4E', bg: '#F0FAE8', label: 'Optimistic' },
  cautious: { color: '#E07A4F', bg: '#FEF5F0', label: 'Cautious' },
  grounded: { color: '#6C4FE0', bg: '#EDE9FA', label: 'Grounded' },
}

const themes = [
  { pct: 64, label: 'AI as creative collaborator (augmentation)', color: '#6C4FE0' },
  { pct: 18, label: 'AI as existential threat to craft', color: '#E07A4F' },
  { pct: 12, label: 'AI as neutral tool (depends on user)', color: '#6B6B72' },
  { pct: 6, label: 'No clear view / undecided', color: '#E7E3DC' },
]

const visionPillars = [
  {
    icon: '◈',
    title: 'Economic Diversification',
    body: "Vision 2030's drive to reduce oil dependence creates demand for local creative industries. AI-fluent designers are positioned as key workers in this transition.",
  },
  {
    icon: '◇',
    title: 'Education Reform',
    body: 'Universities and polytechnics are beginning to integrate AI literacy into graphic design curricula, though frameworks remain inconsistent.',
  },
  {
    icon: '○',
    title: 'Cultural Preservation',
    body: 'National institutions are exploring AI tools to digitise and preserve Bahraini visual heritage — a potential bridge between technology and identity.',
  },
  {
    icon: '◆',
    title: 'Regional Leadership',
    body: "Bahrain's open digital policy positions it to become a Gulf hub for creative technology — if equitable access and regulatory clarity follow.",
  },
]

function TimelineNode({ year, title, desc, accent, delay }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.1 })
    el.style.transitionDelay = `${delay}ms`; obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} className="reveal flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold" style={{ background: accent, color: 'white' }}>
          {year.slice(2)}
        </div>
        <div className="flex-1 w-px mt-2" style={{ background: '#E7E3DC' }}></div>
      </div>
      <div className="pb-8">
        <p className="text-xs font-medium mb-0.5" style={{ color: accent }}>{year}</p>
        <h4 className="text-lg font-light mb-1" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#14141A' }}>{title}</h4>
        <p className="text-sm leading-relaxed" style={{ color: '#6B6B72' }}>{desc}</p>
      </div>
    </div>
  )
}

export default function FutureOutlook() {
  const [active, setActive] = useState(0)

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <Reveal>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: '#6C4FE0' }}>FUTURE OUTLOOK</p>
        <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#14141A' }}>
          Designing the<br />Next Decade
        </h1>
        <p className="text-base max-w-2xl" style={{ color: '#6B6B72' }}>
          Participant perspectives on AI's role in Bahrain's creative economy over the next ten years —
          tied to Bahrain Vision 2030 and wider Gulf creative sector ambitions.
        </p>
      </Reveal>

      {/* Sentiment Themes */}
      <Reveal delay={100}>
        <div className="mt-12 rounded-2xl p-7" style={{ border: '1px solid #E7E3DC', background: '#FDFCFA' }}>
          <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-5" style={{ color: '#6C4FE0' }}>
            HOW PARTICIPANTS VIEW AI'S FUTURE
          </p>
          <div className="space-y-3">
            {themes.map((t) => (
              <div key={t.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: '#14141A' }}>{t.label}</span>
                  <span className="font-medium" style={{ color: t.color }}>{t.pct}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: '#E7E3DC' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${t.pct}%`, background: t.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Quote carousel */}
      <Reveal delay={50}>
        <div className="mt-10" style={{ height: '1px', background: '#E7E3DC' }}></div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mt-8 mb-6" style={{ color: '#6C4FE0' }}>PARTICIPANT VOICES</p>
      </Reveal>

      <Reveal delay={80}>
        <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(145deg, #0E0E10, #1B1B20)' }}>
          <div className="p-8 lg:p-10">
            <div
              className="text-3xl font-light leading-snug mb-6 transition-all duration-500"
              style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'white', fontStyle: 'italic' }}
            >
              "{quotes[active].text}"
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{quotes[active].author}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{quotes[active].role}</p>
              </div>
              <span
                className="px-3 py-1 rounded-full text-[10px] tracking-widest font-medium"
                style={{
                  background: sentimentConfig[quotes[active].sentiment].bg,
                  color: sentimentConfig[quotes[active].sentiment].color,
                }}
              >
                {sentimentConfig[quotes[active].sentiment].label}
              </span>
            </div>
          </div>
          <div
            className="flex gap-0 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {quotes.map((q, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="flex-1 py-3 text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  background: active === i ? 'rgba(108,79,224,0.3)' : 'transparent',
                  color: active === i ? '#A490F5' : 'rgba(255,255,255,0.3)',
                  borderRight: i < quotes.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Vision 2030 Pillars */}
      <Reveal delay={50}>
        <div className="mt-12" style={{ height: '1px', background: '#E7E3DC' }}></div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mt-8 mb-2" style={{ color: '#6C4FE0' }}>BAHRAIN VISION 2030</p>
        <h2 className="text-3xl font-light mb-8" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#14141A' }}>
          Four Intersecting Pillars
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visionPillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <div
              className="rounded-2xl p-6 h-full transition-all duration-200 hover:scale-[1.02]"
              style={{ border: '1px solid #E7E3DC', background: '#FDFCFA' }}
            >
              <span className="text-2xl mb-4 block" style={{ color: '#6C4FE0' }}>{p.icon}</span>
              <h3 className="text-base font-medium mb-2" style={{ color: '#14141A' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B6B72' }}>{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Timeline */}
      <Reveal>
        <div className="mt-12" style={{ height: '1px', background: '#E7E3DC' }}></div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mt-8 mb-8" style={{ color: '#6C4FE0' }}>PROJECTED TRAJECTORY</p>
      </Reveal>

      <div className="max-w-2xl">
        <TimelineNode year="2026" title="Curriculum Integration" desc="AI literacy enters Bahraini design education at polytechnic and university level as standard module." accent="#6C4FE0" delay={0} />
        <TimelineNode year="2027" title="Regulatory Clarity" desc="First regional guidelines on AI-generated content ownership and client disclosure obligations published." accent="#8B6FF0" delay={100} />
        <TimelineNode year="2028" title="Gulf Creative AI Hub" desc="Bahrain positions itself as a regional leader in AI-augmented design, attracting international studios." accent="#A490F5" delay={200} />
        <TimelineNode year="2030" title="Vision 2030 Milestone" desc="Creative industries contribute measurably to diversified GDP; Bahraini AI-design practitioners recognised regionally." accent="#6FCF4E" delay={300} />
      </div>
    </div>
  )
}
