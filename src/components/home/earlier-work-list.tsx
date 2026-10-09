import Link from 'next/link'
import type { JSX } from 'react'
import type { EarlierWorkEntry } from '~/lib/homepage-sections'

interface EarlierWorkListProps {
  entries: readonly EarlierWorkEntry[]
}

const EarlierWorkRow = ({ entry }: { entry: EarlierWorkEntry }): JSX.Element => (
  <li>
    <Link
      href={`/project/${entry.id}`}
      className="group grid gap-1 sm:grid-cols-[14rem_1fr_auto] sm:items-baseline sm:gap-6 px-3 py-3 sm:px-4 rounded hover:bg-gray-900/60 focus-visible:bg-gray-900/60 transition-colors"
    >
      <span className="text-yellow-300/90 font-semibold group-hover:text-yellow-200">
        {entry.title}
      </span>
      <span className="text-sm text-gray-400">
        {entry.summary}
        <span className="block text-xs text-gray-600 mt-1">
          {entry.timeline} · {entry.tags.join(' · ')}
        </span>
      </span>
      <span className="hidden sm:inline text-gray-600 group-hover:text-cyan-400" aria-hidden="true">
        →
      </span>
    </Link>
  </li>
)

/** Compact, clearly secondary list of older projects. One row each. */
export const EarlierWorkList = ({ entries }: EarlierWorkListProps): JSX.Element => (
  <ul className="list-none! ml-0! leading-normal! border border-gray-800/80 rounded-lg divide-y divide-gray-800/80">
    {entries.map(entry => (
      <EarlierWorkRow key={entry.id} entry={entry} />
    ))}
  </ul>
)
