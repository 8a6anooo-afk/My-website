import { useEffect, useRef } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from 'recharts'

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

const toolAdoption = [
  { tool: 'Adobe Firefly', pct: 72, color: 'var(--cs-violet)' },
  { tool: 'ChatGPT', pct: 68, color: 'color-mix(in srgb, var(--cs-violet) 75%, white)' },
  { tool: 'Midjourney', pct: 54, color: 'color-mix(in srgb, var(--cs-violet) 55%, white)' },
  { tool: 'DALL-E', pct: 41, color: 'color-mix(in srgb, var(--cs-violet) 35%, white)' },
  { tool: 'Stable Diffusion', pct: 28, color: 'color-mix(in srgb, var(--cs-violet) 20%, white)' },
]

const frequency = [
  { name: 'Daily', value: 22, color: 'var(--cs-violet)' },
  { name: 'Weekly', value: 35, color: 'color-mix(in srgb, var(--cs-violet) 75%, white)' },
  { name: 'Monthly', value: 26, color: 'color-mix(in srgb, var(--cs-violet) 55%, white)' },
  { name: 'Rarely', value: 12, color: 'color-mix(in srgb, var(--cs-violet) 35%, white)' },
  { name: 'Never', value: 5, color: 'var(--cs-hairline)' },
]

const impactData = [
  { stage: 'Ideation', positive: 78, neutral: 14, negative: 8 },
  { stage: 'Mood Board', positive: 64, neutral: 22, negative: 14 },
  { stage: 'Execution', positive: 46, neutral: 30, negative: 24 },
  { stage: 'Refinement', positive: 58, neutral: 24, negative: 18 },
  { stage: 'Client Review', positive: 52, neutral: 32, negative: 16 },
]

const origData = [
  { label: 'Strongly Agree', value: 12, color: 'var(--cs-violet)' },
  { label: 'Agree', value: 29, color: 'color-mix(in srgb, var(--cs-violet) 75%, white)' },
  { label: 'Neutral', value: 27, color: 'color-mix(in srgb, var(--cs-violet) 55%, white)' },
  { label: 'Disagree', value: 21, color: 'color-mix(in srgb, var(--cs-violet) 35%, white)' },
  { label: 'Strongly Disagree', value: 11, color: 'var(--cs-hairline)' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl px-4 py-3 text-sm" style={{ background: 'var(--cs-dark1)', color: 'white', border: '1px solid #2a2a35' }}>
      <p className="font-medium mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.fill || p.color }}>
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  )
}

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.07) return null
  const RADIAN = Math.PI / 180
  const r = innerRadius + (outerRadius - innerRadius) * 0.55
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={500}>{`${(percent * 100).toFixed(0)}%`}</text>
}

export default function QuantitativeData() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      {/* Header */}
      <Reveal>
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: 'var(--cs-violet)' }}>
          QUANTITATIVE DATA
        </p>
        <h1
          className="text-5xl lg:text-6xl font-light leading-tight mb-4"
          style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--cs-ink)' }}
        >
          Survey Findings
        </h1>
        <p className="text-base max-w-2xl mb-3" style={{ color: 'var(--cs-soft)' }}>
          Structured survey administered to 30–50 Bahraini female graphic designers.
          Data is presented as illustrative sample findings.
        </p>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-wide"
          style={{ background: 'var(--cs-lilac)', color: 'var(--cs-violet)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--cs-lime)' }}></span>
          ILLUSTRATIVE SAMPLE DATA
        </span>
      </Reveal>

      <div className="mt-12" style={{ height: '1px', background: 'var(--cs-hairline)' }}></div>

      {/* Grid of charts */}
      <div className="mt-12 grid lg:grid-cols-2 gap-8">

        {/* Chart 1: Tool Adoption Bar */}
        <Reveal className="lg:col-span-2">
          <div className="rounded-2xl p-7" style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: 'var(--cs-violet)' }}>TOOL ADOPTION</p>
            <h2 className="text-xl font-light mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--cs-ink)' }}>
              AI Tool Usage Among Participants
            </h2>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={toolAdoption} layout="vertical" margin={{ left: 16, right: 40, top: 0, bottom: 0 }}>
                  <CartesianGrid horizontal={false} stroke="var(--cs-hairline)" />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11, fill: 'var(--cs-soft)' }} />
                  <YAxis type="category" dataKey="tool" width={120} tick={{ fontSize: 12, fill: 'var(--cs-ink)' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="pct" radius={[0, 6, 6, 0]} name="Adoption">
                    {toolAdoption.map((entry) => <Cell key={entry.tool} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        {/* Chart 2: Frequency Donut */}
        <Reveal>
          <div className="rounded-2xl p-7 h-full" style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: 'var(--cs-violet)' }}>FREQUENCY OF USE</p>
            <h2 className="text-xl font-light mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--cs-ink)' }}>
              How Often Designers Use AI
            </h2>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={frequency}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomLabel}
                  >
                    {frequency.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`]} contentStyle={{ background: 'var(--cs-dark1)', border: '1px solid #2a2a35', borderRadius: 10, color: 'white', fontSize: 12 }} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => <span style={{ fontSize: 11, color: 'var(--cs-soft)' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        {/* Chart 3: Originality Donut */}
        <Reveal delay={100}>
          <div className="rounded-2xl p-7 h-full" style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: 'var(--cs-violet)' }}>ORIGINALITY PERCEPTION</p>
            <h2 className="text-xl font-light mb-1" style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--cs-ink)' }}>
              "AI tools reduce my originality"
            </h2>
            <p className="text-xs mb-4" style={{ color: 'var(--cs-soft)' }}>Likert scale agreement distribution</p>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={origData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomLabel}
                  >
                    {origData.map((entry) => <Cell key={entry.label} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={{ background: 'var(--cs-dark1)', border: '1px solid #2a2a35', borderRadius: 10, color: 'white', fontSize: 12 }} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => <span style={{ fontSize: 10, color: 'var(--cs-soft)' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        {/* Chart 4: Process Impact Stacked Bar */}
        <Reveal delay={50} className="lg:col-span-2">
          <div className="rounded-2xl p-7" style={{ background: 'linear-gradient(145deg, var(--cs-dark0) 0%, var(--cs-dark1) 100%)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: 'color-mix(in srgb, var(--cs-violet) 75%, white)' }}>CREATIVE PROCESS IMPACT</p>
            <h2 className="text-xl font-light mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'white' }}>
              Perceived Impact Across Creative Stages
            </h2>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactData} margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="stage" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.5)' }} />
                  <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} />
                  <Tooltip contentStyle={{ background: 'var(--cs-dark0)', border: '1px solid #2a2a35', borderRadius: 10, color: 'white', fontSize: 12 }} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{value}</span>}
                  />
                  <Bar dataKey="positive" name="Positive" fill="var(--cs-violet)" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="neutral" name="Neutral" fill="rgba(255,255,255,0.18)" stackId="a" />
                  <Bar dataKey="negative" name="Negative" fill="rgba(255,90,90,0.5)" radius={[0, 0, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

      </div>

      {/* Stat highlights */}
      <Reveal delay={100}>
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { value: '78%', label: 'found AI most useful at ideation stage' },
            { value: '61%', label: 'reported concern about visual homogenisation' },
            { value: '44%', label: 'felt their cultural identity was underrepresented by AI outputs' },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{ border: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}
            >
              <div
                className="text-4xl font-light mb-2"
                style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--cs-violet)' }}
              >
                {s.value}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--cs-soft)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
