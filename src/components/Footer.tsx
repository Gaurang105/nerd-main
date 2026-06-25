import { Github } from 'lucide-react'

// Figma asset — Jun 19 2026
const IMG_MEADOW = 'https://www.figma.com/api/mcp/asset/91a3d8d4-5267-45f4-8594-6ecffd31012a'

const HALYARD = "'Halyard Display', 'DM Sans', sans-serif"
const NAV_SIZE = 'clamp(13px, 1.39vw, 20px)'

// ── GitHub CTA ──────────────────────────────────────────────────

function GithubCTA() {
  return (
    <a
      href="https://github.com/Gaurang105/nerd"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 hover:gap-3 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 bg-primary rounded-full pl-4 pr-1 py-1 no-underline"
    >
      <span
        className="text-black font-normal whitespace-nowrap"
        style={{ fontFamily: HALYARD, fontSize: NAV_SIZE, fontWeight: 400 }}
      >
        View on GitHub
      </span>
      <span className="bg-black rounded-full w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
        <Github className="w-4 h-4 text-primary" />
      </span>
    </a>
  )
}

// ── Footer ──────────────────────────────────────────────────────

export default function Footer() {
  return (
    <section className="relative bg-black overflow-hidden" style={{ minHeight: '580px' }}>

      {/* Heading */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ paddingTop: '120px' }}
      >
        <p
          style={{
            fontFamily: "'Radley', serif",
            fontSize: 'clamp(22px, 3.06vw, 44px)',
            fontStyle: 'normal',
            fontWeight: 400,
            color: 'white',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            marginBottom: '-0.11em',
          }}
        >
          Ready to get on with
        </p>

        <p
          style={{
            fontFamily: "'Radley', serif",
            fontSize: 'clamp(64px, 11.39vw, 164px)',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: 'clamp(-14.76px, -1.025vw, -2px)',
            filter: 'blur(2px)',
            background: 'linear-gradient(-87.06deg, rgba(255,255,255,0.2) 9.71%, rgb(255,255,255) 50.21%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            whiteSpace: 'nowrap',
          }}
        >
          the nerd
        </p>
      </div>

      {/* GitHub CTA */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={{ marginTop: '40px' }}
      >
        <GithubCTA />
      </div>

      {/* Meadow image emerging from bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '360px' }}>
        <img
          src={IMG_MEADOW}
          alt=""
          style={{
            position: 'absolute',
            width: '100%',
            height: '266.67%',
            maxWidth: 'none',
            left: 0,
            top: '-166.25%',
            objectFit: 'cover',
          }}
          draggable={false}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)' }}
        />
      </div>

    </section>
  )
}
