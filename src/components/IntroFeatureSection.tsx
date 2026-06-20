import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'
import { AnimatedParagraph } from './AnimatedLetter'
import ProjectStoryboardCard from './ProjectStoryboardCard'
import InstantActivationCard from './InstantActivationCard'
import HideForOthersCard from './HideForOthersCard'
import MacDesktop from './MacDesktop'

const BODY_TEXT = 'Live in the meeting with complete context'

const CARD_EASE = [0.22, 1, 0.36, 1] as const

// ── Feature card wrapper with 3D-tilt staggered entrance ────────
function FeatureCard({
  index,
  children,
  className = '',
}: {
  index: number
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{ perspective: '1000px' }}
      initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: 6 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: CARD_EASE,
      }}
    >
      {children}
    </motion.div>
  )
}

// ── Main merged section ─────────────────────────────────────────
export default function IntroFeatureSection() {
  const sectionRef    = useRef<HTMLDivElement>(null)
  const videoScrollRef = useRef<HTMLDivElement>(null)
  const featuresRef   = useRef<HTMLDivElement>(null)

  // Mac window: scroll-zoom 45% → 100%
  const { scrollYProgress: videoZoom } = useScroll({
    target: videoScrollRef,
    offset: ['start end', 'center center'],
  })
  const videoScale = useTransform(videoZoom, [0, 1], [0.45, 1])

  // Features header: scroll-driven Y + opacity reveal
  const { scrollYProgress: featProgress } = useScroll({
    target: featuresRef,
    offset: ['start 0.88', 'start 0.35'],
  })
  const featY       = useTransform(featProgress, [0, 1], [60, 0])
  const featOpacity = useTransform(featProgress, [0, 1], [0, 1])

  return (
    <section ref={sectionRef} className="bg-black overflow-hidden">

      {/* ── Text card — bottom padding makes room for the video overlap ── */}
      <div className="pt-16 md:pt-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] px-6 pt-12 pb-44 md:px-16 md:pt-20 md:pb-56 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] mb-6 md:mb-8">
              <WordsPullUpMultiStyle
                segments={[
                  { text: 'Nerd knows and answers it all.', className: 'font-normal' },
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

      {/* ── Mac desktop (coded) — overlaps up into the card above ─── */}
      <div style={{ marginTop: '-150px' }}>
        <div ref={videoScrollRef} style={{ maxWidth: '1244px', margin: '0 auto', padding: '0 48px' }}>
          <motion.div style={{ scale: videoScale, transformOrigin: 'center center' }}>
            <MacDesktop />
          </motion.div>
        </div>
      </div>

      {/* ── Thin glow separator — visual bridge ─────────────── */}
      <div
        aria-hidden
        style={{
          margin: '0 48px',
          height: '1px',
          background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(222,219,200,0.12) 0%, transparent 100%)',
        }}
      />

      {/* ── Features — zero gap, reveals as you scroll ────────── */}
      <div
        ref={featuresRef}
        className="relative overflow-hidden"
        style={{ paddingTop: '80px', paddingBottom: '80px' }}
      >
        {/* Noise texture */}
        <div
          className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none"
          aria-hidden="true"
        />

        {/* Ambient glow behind header */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '0%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70%',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(222,219,200,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Features header — scroll-driven reveal */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-center leading-[1.1] mb-10 md:mb-14"
          style={{ y: featY, opacity: featOpacity }}
        >
          <WordsPullUpMultiStyle
            segments={[
              {
                text: 'Type a question into Nerd',
                className: 'text-primary block',
              },
              {
                text: 'and get the answer mid-meeting',
                className: 'text-gray-500',
              },
            ]}
            delay={0}
          />
        </motion.div>

        {/* Feature card grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-2 md:gap-1 justify-items-center">

            {/* Card 1 — Project Story Board (Figma 118:1069) */}
            <FeatureCard index={0} className="w-full max-w-[360px] aspect-[360/540]">
              <ProjectStoryboardCard />
            </FeatureCard>

            {/* Card 2 — Instant Activation (Figma 115:298) */}
            <FeatureCard index={1} className="w-full max-w-[360px] aspect-[360/540]">
              <InstantActivationCard />
            </FeatureCard>

            {/* Card 3 — Hides for others (Figma 78:1111) */}
            <FeatureCard index={2} className="w-full max-w-[360px] aspect-[360/540]">
              <HideForOthersCard />
            </FeatureCard>

          </div>
        </div>
      </div>

    </section>
  )
}
