// The global `ul, ol` rule in globals.css is unlayered, so list resets here need `!`.
import type { JSX } from 'react'
import { sectionIds } from '~/lib/site-config'

const NAV_ITEMS: readonly { id: string; label: string }[] = [
  { id: sectionIds.projects, label: 'work' },
  { id: sectionIds.writing, label: 'writing' },
  { id: sectionIds.sideProjects, label: 'side-projects' },
  { id: sectionIds.earlierWork, label: 'earlier-work' },
  { id: sectionIds.stack, label: 'stack' },
  { id: sectionIds.contact, label: 'contact' },
]

/** In-page jump links, styled as a `cd` command so it reads as part of the terminal. */
export const SectionNav = (): JSX.Element => (
  <nav aria-label="Page sections" className="text-xs sm:text-sm">
    <span className="text-gray-600" aria-hidden="true">
      $ cd
    </span>
    <ul className="list-none ml-2 leading-normal inline-flex flex-wrap gap-x-3 gap-y-1">
      {NAV_ITEMS.map(item => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="text-gray-500 hover:text-cyan-400 focus-visible:text-cyan-400 transition-colors"
          >
            ./{item.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)
