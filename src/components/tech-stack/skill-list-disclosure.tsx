'use client'

import { type JSX, type ReactNode, useState } from 'react'

interface SkillListDisclosureProps {
  listId: string
  children: ReactNode
}

/**
 * Show/hide toggle for the text version of the graph. The list itself arrives as
 * server-rendered children, so it is in the HTML for crawlers and no-JS users.
 * Mobile always shows it; desktop hides it until toggled.
 */
export const SkillListDisclosure = ({
  listId,
  children,
}: SkillListDisclosureProps): JSX.Element => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
        aria-controls={listId}
        className="hidden sm:inline-flex mt-4 font-mono text-sm text-cyan-400 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-300 rounded"
      >
        {open ? '$ hide --list' : '$ show --list (text version of this graph)'}
      </button>
      <div className={open ? 'mt-6' : 'sm:hidden'}>{children}</div>
    </>
  )
}
