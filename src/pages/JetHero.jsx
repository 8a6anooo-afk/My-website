import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = ['Start', 'Story', 'Rates', 'Benefits', 'FAQ']

export default function JetHero() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: '#FDFBF8', fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
      <section className="relative h-screen overflow-hidden">

        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover' }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Cream overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(253,251,248,0.38)' }} />

        {/* Content wrapper */}
        <div className="relative h-full flex flex-col">

          {/* ── Navigation ── */}
          <nav style={{ background: 'rgba(253,251,248,0.92)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

              {/* Brand */}
              <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#250C5A', letterSpacing: '-0.02em' }}>SkyElite</span>

              {/* Desktop links */}
              <div className="hidden md:flex" style={{ gap: '2rem', alignItems: 'center' }}>
                {navLinks.map(link => (
                  <a
                    key={link}
                    href="#"
                    style={{ fontSize: '0.875rem', fontWeight: 500, color: '#250C5A', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#6128ED')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#250C5A')}
                  >
                    {link}
                  </a>
                ))}
              </div>

              {/* Hamburger */}
              <button
                className="md:hidden"
                onClick={() => setMenuOpen(v => !v)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#250C5A', padding: '0.5rem', borderRadius: '0.5rem' }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
              <div
                className="md:hidden"
                style={{
                  margin: '0 1rem 1rem',
                  borderRadius: '1rem',
                  boxShadow: '0 8px 32px rgba(97,40,237,0.10)',
                  background: 'rgba(253,251,248,0.97)',
                  backdropFilter: 'blur(14px)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {navLinks.map(link => (
                    <a
                      key={link}
                      href="#"
                      style={{ fontSize: '0.875rem', fontWeight: 500, color: '#250C5A', textDecoration: 'none', padding: '0.625rem 0', transition: 'color 0.2s', display: 'block' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#6128ED')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#250C5A')}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* ── Hero content ── */}
          <div className="flex-1 flex items-center justify-center" style={{ marginTop: '-5rem' }}>
            <div style={{ textAlign: 'center', padding: '0 1rem' }}>

              {/* Label */}
              <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6128ED', marginBottom: '1rem' }}>
                PRIVATE JETS
              </p>

              {/* Two-line headline */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h1
                  style={{
                    fontSize: 'clamp(3.5rem, 10vw, 6rem)',
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    color: '#6128ED',
                    margin: 0,
                  }}
                >
                  Premium.
                </h1>
                <h1
                  style={{
                    fontSize: 'clamp(3.5rem, 10vw, 6rem)',
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    color: '#250C5A',
                    margin: 0,
                    marginTop: '-0.08em',
                  }}
                >
                  Accessible.
                </h1>
              </div>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  color: '#6128ED',
                  opacity: 0.72,
                  marginBottom: '2rem',
                  maxWidth: '38rem',
                  margin: '0 auto 2rem',
                  lineHeight: 1.6,
                }}
              >
                Your dedication deserves recognition.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  style={{
                    padding: '0.625rem 1.5rem',
                    borderRadius: '999px',
                    background: '#F3ECFF',
                    color: '#250C5A',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#E0D4FF')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#F3ECFF')}
                >
                  Discover
                </button>
                <button
                  style={{
                    padding: '0.625rem 1.5rem',
                    borderRadius: '999px',
                    background: '#250C5A',
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#6128ED')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#250C5A')}
                >
                  Book Now
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
