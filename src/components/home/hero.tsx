import type { JSX } from 'react'
import { SectionNav } from '~/components/home/section-nav'
import TypingAnimation from '~/components/TypingAnimation'
import { Button } from '~/components/ui/button'
import { sectionIds } from '~/lib/site-config'

const EXTERNAL_LINKS: readonly { label: string; href: string }[] = [
  { label: 'github', href: 'https://github.com/Andrewske' },
  { label: 'linkedin', href: 'https://linkedin.com/in/andrewskevin92' },
  { label: 'soundcloud', href: 'https://soundcloud.com/kevinbigfoot' },
  { label: 'spotify', href: 'https://open.spotify.com/user/kevinbigfoot?si=702e548cc3c94fec' },
]

const ScanlineBackground = (): JSX.Element => (
  <div className="absolute inset-0 opacity-5" aria-hidden="true">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)`,
        backgroundSize: '100% 4px',
      }}
    ></div>
  </div>
)

const WindowDots = (): JSX.Element => (
  <div className="flex items-center gap-2 mb-4 sm:mb-6">
    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
    <span className="ml-2 sm:ml-4 text-gray-500 text-xs sm:text-sm">portfolio.js</span>
  </div>
)

interface FieldProps {
  name: string
  children: JSX.Element
  last?: boolean
}

const Field = ({ name, children, last = false }: FieldProps): JSX.Element => (
  <div>
    <span className="text-blue-300">{name}</span>
    <span className="text-white">:</span> {children}
    {!last && <span className="text-white">,</span>}
  </div>
)

const DeveloperObject = (): JSX.Element => (
  <div className="space-y-3 sm:space-y-4 min-w-0">
    <div>
      <span className="text-purple-400">const</span>{' '}
      <span className="text-blue-400">developer</span> <span className="text-white">=</span>{' '}
      <span className="text-white">{'{'}</span>
    </div>
    <div className="pl-4 sm:pl-6 md:pl-8 space-y-1 sm:space-y-2">
      <Field name="name">
        <span className="text-yellow-300">&quot;Kevin Andrews&quot;</span>
      </Field>
      <Field name="role">
        <span className="text-yellow-300">&quot;Software Engineer & AI Developer&quot;</span>
      </Field>
      <Field name="mission" last>
        <span className="text-yellow-300">
          &quot;
          <TypingAnimation
            text="Shipping fast through human-AI collaboration - from legal automation to personal productivity systems"
            suffix={'"'}
          />
        </span>
      </Field>
    </div>
    <div className="text-white">{'};'}</div>
  </div>
)

const Links = (): JSX.Element => (
  <div className="flex flex-wrap items-center gap-x-1 gap-y-2 sm:gap-4">
    <Button variant="terminal" className="w-full sm:w-auto" asChild>
      <a href={`#${sectionIds.projects}`}>
        <span aria-hidden="true">▸</span> view featured work
      </a>
    </Button>
    {EXTERNAL_LINKS.map(link => (
      <Button key={link.label} variant="terminalGhost" asChild>
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <span className="text-cyan-400">$</span> {link.label}
        </a>
      </Button>
    ))}
  </div>
)

export const Hero = (): JSX.Element => (
  <section className="flex items-center justify-center px-4 sm:px-6 pt-10 pb-8 sm:pt-24 sm:pb-12 lg:min-h-[80vh] relative overflow-hidden">
    <ScanlineBackground />
    <div className="max-w-6xl mx-auto w-full relative z-10">
      <div className="border border-green-500/20 rounded-lg p-4 sm:p-6 md:p-8 bg-black/50 backdrop-blur-sm overflow-x-auto">
        <WindowDots />
        <DeveloperObject />
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800 space-y-4">
          <Links />
          <SectionNav />
        </div>
      </div>
    </div>
  </section>
)
