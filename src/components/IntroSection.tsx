import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'
import { AnimatedParagraph } from './AnimatedLetter'

// ── Static poster (shown until video loads / if no VIDEO_MAC set) ─
const IMG_MAC = 'https://www.figma.com/api/mcp/asset/9f6f156d-d5d3-4228-89e0-ea4729066f2d'

// ── Drop the Mac desktop screen-recording URL here to enable autoplay ─
const VIDEO_MAC = ''

const BODY_TEXT =
  'The answer was always somewhere — a Slack thread, a Notion doc, last quarter\'s deck. Nerd surfaces it mid-sentence, without you ever leaving the call.'

export default function IntroSection() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)

  // Play when 20 % of the section is visible; pause when it leaves.
  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  // Scroll-zoom: video starts at 45 % (small) → expands to full width
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'center center'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.45, 1])

  return (
    <section ref={sectionRef} className="bg-black overflow-hidden">

      {/* ── Text block ──────────────────────────────────────────── */}
      <div className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] px-6 py-12 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] mb-10 md:mb-16">
              <WordsPullUpMultiStyle
                segments={[
                  { text: 'Nerd knows and answers it all.', className: 'font-normal' },
                  { text: 'Live in the meeting with complete context', className: 'font-serif italic' },
                ]}
                delay={0}
              />
            </h2>

            <AnimatedParagraph
              text={BODY_TEXT}
              className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* ── Video block: zooms from 45 % → full width on scroll ─── */}
      <div style={{ paddingBottom: '160px' }}>
        <div ref={scrollRef} style={{ maxWidth: '1244px', margin: '0 auto', padding: '0 48px' }}>
          <motion.div
            style={{
              scale,
              transformOrigin: 'center center',
              borderRadius: 16,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Video — autoplays when section enters viewport */}
            <video
              ref={videoRef}
              src={VIDEO_MAC || undefined}
              poster={IMG_MAC}
              muted
              loop
              playsInline
              style={{ width: '100%', display: 'block' }}
            />

            {/* Top gradient — separates Mac menu bar from the glass pill nav */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '18%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)',
                pointerEvents: 'none',
                borderRadius: '16px 16px 0 0',
              }}
            />

            {/* Bottom gradient — fades dock so it never collides with the pill nav */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '22%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                pointerEvents: 'none',
                borderRadius: '0 0 16px 16px',
              }}
            />
          </motion.div>
        </div>
      </div>

    </section>
  )
}
