'use client'

import type { ReactElement } from 'react'
import { useDinoMode } from './DinoModeProvider'

export function DinoToggleCompact(): ReactElement {
  const { noDinos, toggleNoDinos } = useDinoMode()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!noDinos}
      aria-label={noDinos ? 'Enable dinosaur mode' : 'Disable dinosaur mode'}
      onClick={toggleNoDinos}
      className="flex items-center gap-1.5 transition-colors"
    >
      <span
        className={`text-sm transition-opacity duration-200 ${
          noDinos ? 'opacity-100' : 'opacity-40'
        }`}
      >
        🦴
      </span>

      <div
        className={`
          relative w-8 h-4 rounded-full transition-colors duration-200
          ${noDinos ? 'bg-gray-600' : 'bg-green-primary/50'}
        `}
      >
        <span
          className={`
            absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-200
            ${noDinos ? 'left-0.5' : 'left-[18px]'}
          `}
        />
      </div>

      <span
        className={`text-sm transition-opacity duration-200 ${
          noDinos ? 'opacity-40' : 'opacity-100'
        }`}
      >
        🦖
      </span>
    </button>
  )
}
