import type { JSX } from 'react'

const PARAGRAPHS: readonly string[] = [
  "I'm an AI-native engineer - I think in human-AI collaboration, not just code. The way I approach building is as important as what I build.",
  "Currently I'm a Software Engineer at Glade AI, an AI legal tech platform serving 1000+ law firms.",
  'Previously at Bonanza, I built a full-stack analytics dashboard processing 160M+ order records with sub-second page loads. When faced with a read-only legacy database, I designed a static Parquet architecture that eliminated API hosting costs while improving performance.',
  'My passion project is an AI personal management system that helps me navigate daily life with ADHD. I believe AI is a superpower not only for coding, but for unlocking potential in those limited by factors beyond their control. The tools we build for ourselves often solve problems for entire communities.',
]

export const AboutSection = (): JSX.Element => (
  <section aria-labelledby="whoami" className="py-12 sm:py-16 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto">
      <h2 id="whoami" className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-10">
        <span className="text-green-400">$</span> whoami --verbose
      </h2>
      <div className="space-y-6 text-gray-300 leading-relaxed">
        {PARAGRAPHS.map(text => (
          <p key={text.slice(0, 24)} className="pl-4 border-l-2 border-gray-800">
            {text}
          </p>
        ))}
      </div>
    </div>
  </section>
)
