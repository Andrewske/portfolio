'use client'

import { useRef, useState } from 'react'
import { useDinoMode } from './DinoModeProvider'

export function ImmersionControls(): React.ReactElement {
  const { noDinos, toggleNoDinos } = useDinoMode()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleImmersion = (): void => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay blocked - user needs to interact first
      })
      setIsPlaying(true)
    }
  }

  const handleAudioEnded = (): void => {
    setIsPlaying(false)
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      {/* No Dinos Toggle */}
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <span className="text-gray-500">no dinos</span>
        <button
          type="button"
          role="switch"
          aria-checked={noDinos}
          onClick={toggleNoDinos}
          className={`
            relative w-10 h-5 rounded-full transition-colors duration-200
            ${noDinos ? 'bg-green-500/50' : 'bg-gray-700'}
          `}
        >
          <span
            className={`
              absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200
              ${noDinos ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
      </label>

      {/* Immersion Button */}
      <button
        type="button"
        onClick={handleImmersion}
        className={`
          px-3 py-1 rounded border transition-all duration-200
          ${
            isPlaying
              ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
              : 'border-green-500/30 hover:border-green-500/50 text-gray-400 hover:text-green-400'
          }
        `}
      >
        {isPlaying ? '🦖 stop' : '🎬 immerse'}
      </button>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/jurassic-park-theme.opus"
        onEnded={handleAudioEnded}
        preload="none"
      />
    </div>
  )
}
