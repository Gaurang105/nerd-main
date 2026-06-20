import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface AnimatedLetterProps {
  char: string
  scrollYProgress: MotionValue<number>
  index: number
  total: number
}

export default function AnimatedLetter({
  char,
  scrollYProgress,
  index,
  total,
}: AnimatedLetterProps) {
  const charProgress = index / total
  const opacity = useTransform(
    scrollYProgress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.2, 1]
  )

  if (char === ' ') {
    return <span>&nbsp;</span>
  }

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char}
    </motion.span>
  )
}

interface AnimatedParagraphProps {
  text: string
  className?: string
}

export function AnimatedParagraph({ text, className = '' }: AnimatedParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = text.split('')

  return (
    <p ref={ref} className={className}>
      {chars.map((char, i) => (
        <AnimatedLetter
          key={i}
          char={char}
          scrollYProgress={scrollYProgress}
          index={i}
          total={chars.length}
        />
      ))}
    </p>
  )
}
