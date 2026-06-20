// Figma asset — Jun 19 2026
const IMG_MEADOW = 'https://www.figma.com/api/mcp/asset/91a3d8d4-5267-45f4-8594-6ecffd31012a'

const HALYARD = "'Halyard Display', 'DM Sans', sans-serif"
const NAV_SIZE = 'clamp(13px, 1.39vw, 20px)'

// ── Platform SVG icons ──────────────────────────────────────────

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M0 3.449L9.75 2.1v9.451H0M10.949 2.1L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.801" />
    </svg>
  )
}

// ── Platform CTAs — same cream pill + hover style as nav CTA ────

interface PlatformCTAProps {
  label: string
  Icon: React.ComponentType<{ className?: string }>
}

function PlatformCTA({ label, Icon }: PlatformCTAProps) {
  return (
    <button className="group flex items-center gap-2 hover:gap-3 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 bg-primary rounded-full pl-4 pr-1 py-1">
      <span
        className="text-black font-normal whitespace-nowrap"
        style={{ fontFamily: HALYARD, fontSize: NAV_SIZE, fontWeight: 400 }}
      >
        {label}
      </span>
      <span className="bg-black rounded-full w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </span>
    </button>
  )
}

const PLATFORMS: PlatformCTAProps[] = [
  { label: 'Get for Mac',     Icon: AppleIcon   },
  { label: 'Get for Windows', Icon: WindowsIcon },
]

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

      {/* Download CTAs */}
      <div
        className="relative z-10 flex flex-wrap items-center justify-center"
        style={{ gap: '16px', marginTop: '40px' }}
      >
        {PLATFORMS.map(({ label, Icon }) => (
          <PlatformCTA key={label} label={label} Icon={Icon} />
        ))}
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
