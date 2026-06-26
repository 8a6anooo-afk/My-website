export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{ borderTop: '1px solid var(--cs-hairline)', background: 'var(--cs-bg)' }}
    >
      <div className="max-w-screen-xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--cs-violet), color-mix(in srgb, var(--cs-violet) 70%, white))' }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M3 8c0-2.76 2.24-5 5-5 1.5 0 2.84.66 3.77 1.7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="11" cy="6.5" r="1.5" fill="var(--cs-lime)"/>
              <path d="M13 8c0 2.76-2.24 5-5 5-1.5 0-2.84-.66-3.77-1.7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium" style={{ color: 'var(--cs-ink)' }}>Creative Space</div>
            <div className="text-[11px] tracking-widest" style={{ color: 'var(--cs-soft)' }}>VOICES OF BAHRAINI FEMALE DESIGNERS</div>
          </div>
        </div>

        <div className="text-center sm:text-right">
          <div className="text-sm" style={{ color: 'var(--cs-soft)' }}>
            Zainab Alqattan &nbsp;·&nbsp; CM9103 — Research Methods &nbsp;·&nbsp; 2026
          </div>
          <div className="text-[11px] mt-1 tracking-wide" style={{ color: 'var(--cs-soft)', opacity: 0.6 }}>
            Grounded in Csikszentmihalyi's Systems Model of Creativity (1996)
          </div>
        </div>
      </div>
    </footer>
  )
}
