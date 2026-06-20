import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'
import { AnimatedParagraph } from './AnimatedLetter'

const ABOUT_TEXT =
  'Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.'

export default function About() {
  return (
    <section className="bg-black py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] px-6 py-12 md:px-16 md:py-20 text-center">
          {/* Label */}
          <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-8 md:mb-12">
            Visual arts
          </p>

          {/* Main heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-10 md:mb-16">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'I am Marcus Chen,', className: 'font-normal' },
                {
                  text: 'a self-taught director.',
                  className: 'font-serif italic',
                },
                {
                  text: 'I have skills in color grading, visual effects, and narrative design.',
                  className: 'font-normal',
                },
              ]}
              delay={0}
            />
          </h2>

          {/* Animated body paragraph */}
          <AnimatedParagraph
            text={ABOUT_TEXT}
            className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          />
        </div>
      </div>
    </section>
  )
}
