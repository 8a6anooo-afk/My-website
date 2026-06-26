import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect() } },
      { threshold: 0.1 }
    )
    el.style.transitionDelay = `${delay}ms`
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const metrics = [
  { value: '30–50', label: 'Participants', icon: '○' },
  { value: 'Mixed', label: 'Methods', icon: '◈' },
  { value: '3', label: 'Research Questions', icon: '◇' },
  { value: '6', label: 'Visual Chapters', icon: '◆' },
]

const objectives = [
  'Examine how female graphic designers in Bahrain perceive and use generative AI tools in their daily creative workflows.',
  'Investigate whether AI tool adoption is reshaping professional identity, creative confidence, and artistic autonomy among practitioners.',
  'Explore the tensions between global AI-driven visual homogenisation and the preservation of local Bahraini cultural identity in design outputs.',
]

const questions = [
  'How do Bahraini female graphic designers integrate generative AI tools (Midjourney, DALL-E, Adobe Firefly) into their creative processes?',
  'In what ways does AI usage influence their sense of originality, authorship, and professional identity?',
  "How do participants navigate the perceived risk of cultural and visual homogenisation in the context of Bahrain’s design heritage?",
]

const navCards = [
  { to: '/quantitative', label: 'QUANTITATIVE DATA', title: 'Survey Findings', desc: 'AI adoption rates, frequency of use, and Likert-scale creativity impact across 30–50 participants.', color: '#6C4FE0' },
  { to: '/before-after', label: 'CASE STUDY', title: 'Before / After AI', desc: 'Side-by-side visual comparison of design work produced with and without generative AI assistance.', color: '#8B6FF0' },
  { to: '/challenges', label: 'CHALLENGES', title: 'Creative Tensions', desc: 'Copyright, homogenisation, job security, skill erosion, and cultural identity preservation.', color: '#6C4FE0' },
  { to: '/future', label: 'FUTURE OUTLOOK', title: 'Vision 2030 & Beyond', desc: "Participant views on AI's future in Bahrain's creative economy, tied to national development goals.", color: '#8B6FF0' },
  { to: '/portfolio', label: 'SHOWCASE', title: 'Portfolio Gallery', desc: 'Curated works from participating designers — filterable by AI-assisted or non-AI output.', color: '#6C4FE0' },
  { to: '/identity', label: 'IDENTITY', title: 'Brand Style Guide', desc: "The project's visual language: logo, colour palette, and typography system.", color: '#8B6FF0' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-screen-xl mx-auto px-6 pt-20 pb-16 text-center">
        <Reveal>
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-medium tracking-[0.15em] mb-8"
            style={{ background: '#EDE9FA', color: '#6C4FE0' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#6C4FE0' }}></span>
            RESEARCH-LED PRACTICE
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1
            className="text-7xl sm:text-8xl lg:text-9xl font-light leading-none tracking-tight mb-4"
            style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#14141A' }}
          >
            Creative
            <br />
            <em style={{ fontStyle: 'italic', color: '#6C4FE0' }}>Space</em>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p
            className="text-sm tracking-[0.2em] uppercase mb-6"
            style={{ color: '#6B6B72' }}
          >
            Voices of Bahraini Female Designers
          </p>
        </Reveal>

        <Reveal delay={300}>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: '#6B6B72' }}
          >
            A mixed-methods empirical investigation into the impact of Generative AI tools on the creative
            processes, professional identities, and artistic autonomy of female graphic designers in the
            Kingdom of Bahrain.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-10" style={{ height: '1px', background: '#E7E3DC', maxWidth: '480px', margin: '40px auto 0' }}></div>
        </Reveal>
      </section>

      {/* Metrics */}
      <section className="max-w-screen-xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 80}>
              <div
                className="rounded-2xl p-6 text-center transition-all duration-200 hover:scale-[1.02]"
                style={{ border: '1px solid #E7E3DC', background: '#FDFCFA' }}
              >
                <div className="text-3xl font-light mb-1" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#14141A' }}>{m.value}</div>
                <div className="text-[11px] tracking-widest uppercase" style={{ color: '#6B6B72' }}>{m.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Context & Scope */}
      <section className="max-w-screen-xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left */}
          <Reveal className="h-full">
            <div className="rounded-2xl p-8 lg:p-10 h-full" style={{ border: '1px solid #E7E3DC', background: '#FDFCFA' }}>
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: '#6C4FE0' }}>
                CONTEXT &amp; SCOPE
              </p>
              <h2
                className="text-2xl lg:text-3xl font-light leading-snug mb-5"
                style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#14141A' }}
              >
                Exploring the Intersection of Technology, Gender, and Cultural Identity
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: '#6B6B72' }}>
                While Generative AI tools — Midjourney, DALL-E, Adobe Firefly — are discussed globally, empirical data
                in the Arab region, particularly through a gendered lens, remains sparse. This research centres
                Bahraini female designers as knowledge-producers, not just technology adopters.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#6B6B72' }}>
                The study draws on a dual approach: a structured online survey (quantitative) and in-depth interviews
                (qualitative), triangulated with before/after visual analysis of participant work.
              </p>
            </div>
          </Reveal>

          {/* Right – dark card */}
          <Reveal delay={150} className="h-full">
            <div
              className="rounded-2xl p-8 lg:p-10 h-full"
              style={{ background: 'linear-gradient(145deg, #0E0E10 0%, #1B1B20 100%)' }}
            >
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: '#8B6FF0' }}>
                RESEARCH FRAMEWORK
              </p>
              <h2
                className="text-2xl lg:text-3xl font-light leading-snug mb-5"
                style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'white' }}
              >
                Theoretical Foundations
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Grounded in Csikszentmihalyi's <em>Systems Model of Creativity</em> (1996), which frames
                creativity not as an individual trait but as a relational feedback loop between three intersecting forces:
              </p>
              <div className="space-y-3">
                {[
                  { key: 'Individual', value: "The designer's skills, motivations, and embodied cultural knowledge." },
                  { key: 'Domain', value: 'The established rules, symbols, and conventions of graphic design.' },
                  { key: 'Field', value: 'The social gatekeepers — clients, institutions, peers — who validate creative work.' },
                ].map(item => (
                  <div key={item.key} className="flex gap-3">
                    <span
                      className="shrink-0 w-16 text-[10px] tracking-widest uppercase pt-0.5"
                      style={{ color: '#6FCF4E' }}
                    >
                      {item.key}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Research Objectives + Questions */}
      <section className="max-w-screen-xl mx-auto px-6 pb-20">
        <div style={{ height: '1px', background: '#E7E3DC', marginBottom: '48px' }}></div>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Objectives */}
          <Reveal>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-6" style={{ color: '#6C4FE0' }}>
              RESEARCH OBJECTIVES
            </p>
            <ol className="space-y-5">
              {objectives.map((obj, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                    style={{ background: '#EDE9FA', color: '#6C4FE0' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-base leading-relaxed pt-0.5" style={{ color: '#6B6B72' }}>{obj}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Questions */}
          <Reveal delay={150}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-6" style={{ color: '#6C4FE0' }}>
              RESEARCH QUESTIONS
            </p>
            <ol className="space-y-5">
              {questions.map((q, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                    style={{ background: '#F8F6F1', border: '1px solid #E7E3DC', color: '#14141A' }}
                  >
                    RQ{i + 1}
                  </span>
                  <p className="text-base leading-relaxed pt-0.5" style={{ color: '#6B6B72' }}>{q}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Chapter Navigation Cards */}
      <section className="max-w-screen-xl mx-auto px-6 pb-24">
        <div style={{ height: '1px', background: '#E7E3DC', marginBottom: '48px' }}></div>
        <Reveal>
          <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: '#6B6B72' }}>
            EXPLORE THE STUDY
          </p>
          <h2
            className="text-3xl font-light mb-10"
            style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#14141A' }}
          >
            Six Visual Chapters
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {navCards.map((card, i) => (
            <Reveal key={card.to} delay={i * 80}>
              <Link
                to={card.to}
                className="group block rounded-2xl p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm"
                style={{ border: '1px solid #E7E3DC', background: '#FDFCFA' }}
              >
                <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: '#6C4FE0' }}>
                  {card.label}
                </p>
                <h3 className="text-lg font-light mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#14141A' }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B6B72' }}>{card.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-[11px] font-medium transition-colors group-hover:opacity-100 opacity-60" style={{ color: '#6C4FE0' }}>
                  Explore
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
