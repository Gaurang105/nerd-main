import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'

const CARD_EASE = [0.22, 1, 0.36, 1] as const

interface FeatureCardProps {
  index: number
  children: React.ReactNode
  className?: string
}

function FeatureCard({ index, children, className = '' }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{
        duration: 0.65,
        delay: index * 0.15,
        ease: CARD_EASE,
      }}
    >
      {children}
    </motion.div>
  )
}

interface CheckItemProps {
  text: string
}

function CheckItem({ text }: CheckItemProps) {
  return (
    <li className="flex items-start gap-2">
      <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" strokeWidth={2} />
      <span className="text-gray-400 text-xs sm:text-sm leading-snug">{text}</span>
    </li>
  )
}

interface ContentCardProps {
  number: string
  title: string
  icon: string
  items: string[]
}

function ContentCard({ number, title, icon, items }: ContentCardProps) {
  return (
    <div className="bg-[#212121] h-full flex flex-col p-5 sm:p-6 gap-4">
      {/* Icon */}
      <img
        src={icon}
        alt=""
        className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
      />

      {/* Title with number */}
      <div>
        <p className="text-gray-500 text-[10px] font-mono mb-1">{number}</p>
        <h3 className="text-[#E1E0CC] text-base sm:text-lg font-medium leading-tight">{title}</h3>
      </div>

      {/* Checklist */}
      <ul className="flex flex-col gap-2.5 flex-1">
        {items.map((item, i) => (
          <CheckItem key={i} text={item} />
        ))}
      </ul>

      {/* Learn more */}
      <button className="flex items-center gap-1.5 text-primary text-xs sm:text-sm group mt-auto">
        <span>Learn more</span>
        <ArrowRight
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ transform: 'rotate(-45deg)' }}
          strokeWidth={1.5}
        />
      </button>
    </div>
  )
}

export default function Features() {
  return (
    <section className="relative min-h-screen bg-black py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      {/* Noise background */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto flex flex-col gap-10 md:gap-14">
        {/* Header */}
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-center leading-[1.1]">
          <WordsPullUpMultiStyle
            segments={[
              {
                text: 'Studio-grade workflows for visionary creators.',
                className: 'text-primary block',
              },
              {
                text: 'Built for pure vision. Powered by art.',
                className: 'text-gray-500',
              },
            ]}
            delay={0}
          />
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          {/* Card 1 — Video */}
          <FeatureCard index={0} className="lg:h-full min-h-[280px]">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-[#E1E0CC] text-base sm:text-lg font-medium">
                Your creative canvas.
              </p>
            </div>
          </FeatureCard>

          {/* Card 2 — Project Storyboard */}
          <FeatureCard index={1} className="lg:h-full">
            <ContentCard
              number="01"
              title="Project Storyboard."
              icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
              items={[
                'Drag-and-drop scene sequencing for any format',
                'Collaborative frame annotations in real time',
                'Export to PDF, Notion, or presentation decks',
                'Version history with visual diffing',
              ]}
            />
          </FeatureCard>

          {/* Card 3 — Smart Critiques */}
          <FeatureCard index={2} className="lg:h-full">
            <ContentCard
              number="02"
              title="Smart Critiques."
              icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
              items={[
                'AI-powered analysis of pacing, color, and narrative',
                'Inline creative notes tied to specific frames',
                'One-click integrations with DaVinci, Premiere & After Effects',
              ]}
            />
          </FeatureCard>

          {/* Card 4 — Immersion Capsule */}
          <FeatureCard index={3} className="lg:h-full">
            <ContentCard
              number="03"
              title="Immersion Capsule."
              icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
              items={[
                'Silence all notifications during deep-focus sessions',
                'Curated ambient soundscapes for any creative mood',
                'Sync focus blocks directly with your calendar',
              ]}
            />
          </FeatureCard>
        </div>
      </div>
    </section>
  )
}
