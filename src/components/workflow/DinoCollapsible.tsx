'use client'

import React, { type ReactNode, useState } from 'react'
import { useDinoMode } from './DinoModeProvider'

interface DinoCollapsibleProps {
  children: ReactNode
  defaultLabel?: string
}

export function DinoCollapsible({
  children,
  defaultLabel = 'Jurassic Park scene',
}: DinoCollapsibleProps): React.ReactElement | null {
  const { noDinos } = useDinoMode()
  const [isOpen, setIsOpen] = useState(false)

  // When dinos are enabled, render full terminal
  if (!noDinos) {
    return (
      <div className="rounded-lg p-2 bg-green-primary/65 my-16">
        {/* Dots in frame area */}
        <div className="flex items-center gap-2 px-2 pb-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        {/* Inset content area */}
        <div className="dino-terminal rounded border border-green-accent/40 px-2 py-5 sm:py-8 space-y-4 bg-terminal-content font-mono">
          {children}
        </div>
      </div>
    )
  }

  // When noDinos is true, terminal header is the clickable toggle
  return (
    <div className="rounded-lg p-2 bg-green-primary/65 my-16">
      {/* Clickable header with dots */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-2 pb-2 cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-gray-300/70 text-sm italic group-hover:text-gray-300 transition-colors">
          {isOpen ? 'Hide' : 'Show'} {defaultLabel}
        </span>
      </button>
      {/* Content only shown when open */}
      {isOpen && (
        <div className="dino-terminal rounded border border-green-accent/40 px-2 py-5 sm:py-8 space-y-4 bg-terminal-content font-mono">
          {children}
        </div>
      )}
    </div>
  )
}
