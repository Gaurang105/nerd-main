import { useRef, useState, useEffect } from 'react'

// Mac desktop screenshot — wallpaper, menu bar, Chrome video-call window, dock
const IMG_MAC = 'https://www.figma.com/api/mcp/asset/9f6f156d-d5d3-4228-89e0-ea4729066f2d'
// The floating Nerd widget (fixed in center while section is in view)
const IMG_WIDGET = 'https://www.figma.com/api/mcp/asset/4b536f96-172a-497b-bce4-20f4ac00c527'

// Video panel positions as % of the Mac desktop screenshot (1244 × 808 px).
// Set VIDEO_SRCS to actual video file URLs to enable autoplay.
const VIDEO_SRCS = ['', ''] // [left panel, right panel]

const PANELS = [
  { left: '14.81%', top: '20.27%', width: '34.0%', height: '52.34%' },
  { left: '51.19%', top: '20.27%', width: '34.0%', height: '52.34%' },
]

const TRANSITION = 'opacity 240ms cubic-bezier(0.16, 1, 0.3, 1), transform 240ms cubic-bezier(0.16, 1, 0.3, 1)'

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <section ref={sectionRef} className="bg-black" style={{ padding: '80px 0 120px' }}>
        <div style={{ maxWidth: '1244px', margin: '0 auto', padding: '0 48px' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            {/* Mac desktop base — shows wallpaper, menu, Chrome window with people, dock */}
            <img src={IMG_MAC} alt="" style={{ width: '100%', display: 'block' }} draggable={false} />

            {/* Autoplay video overlays — transparent until src is provided */}
            {PANELS.map((p, i) => (
              <video
                key={i}
                src={VIDEO_SRCS[i] || undefined}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  position: 'absolute',
                  left: p.left,
                  top: p.top,
                  width: p.width,
                  height: p.height,
                  objectFit: 'cover',
                  borderRadius: 'clamp(6px, 1.3vw, 16px)',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Floating widget — fixed in center of viewport while section is visible, stays still on scroll */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, ${inView ? '-50%' : 'calc(-50% + 14px)'})`,
          opacity: inView ? 1 : 0,
          pointerEvents: inView ? 'auto' : 'none',
          transition: TRANSITION,
          zIndex: 45,
        }}
      >
        <img
          src={IMG_WIDGET}
          alt=""
          style={{
            width: 'min(454px, 90vw)',
            display: 'block',
            borderRadius: '10px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
          }}
          draggable={false}
        />
      </div>
    </>
  )
}
