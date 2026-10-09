'use client'

import { Pause, Play } from 'lucide-react'
import type React from 'react'
import { type RefObject, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '~/components/tech-stack/use-media-query'
import type { MemeVideoSource } from '~/lib/workflow-content'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const IN_VIEW_THRESHOLD = 0.25

interface MemeVideoProps {
  video: MemeVideoSource
  alt: string
}

// Autoplay can be refused by the browser (power saving, policy). The poster and
// play button stay usable, so a rejected play() needs no handling.
const playQuietly = (video: HTMLVideoElement): void => {
  video.play().catch(() => undefined)
}

/** Plays the clip while it is on screen, unless motion is reduced or the user paused it. */
const useInViewAutoplay = (
  videoRef: RefObject<HTMLVideoElement | null>,
  autoplay: boolean,
  userPausedRef: RefObject<boolean>,
): void => {
  useEffect((): (() => void) | undefined => {
    const video = videoRef.current
    if (!video) return
    if (!autoplay) video.pause()
    const observer = new IntersectionObserver(
      ([entry]): void => {
        if (!entry?.isIntersecting) {
          video.pause()
          return
        }
        if (autoplay && !userPausedRef.current) playQuietly(video)
      },
      { threshold: IN_VIEW_THRESHOLD },
    )
    observer.observe(video)
    return (): void => observer.disconnect()
  }, [videoRef, autoplay, userPausedRef])
}

const togglePlayback = (
  video: HTMLVideoElement | null,
  userPausedRef: RefObject<boolean>,
): void => {
  if (!video) return
  userPausedRef.current = !video.paused
  if (video.paused) playQuietly(video)
  else video.pause()
}

interface PlaybackButtonProps {
  playing: boolean
  alt: string
  onClick: () => void
}

const PlaybackButton = ({ playing, alt, onClick }: PlaybackButtonProps): React.ReactElement => {
  const Icon = playing ? Pause : Play
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${playing ? 'Pause' : 'Play'} animation: ${alt}`}
      className="absolute bottom-2 right-2 rounded-md bg-black/70 p-2 text-white hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  )
}

export function MemeVideo({ video, alt }: MemeVideoProps): React.ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPausedRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY)
  useInViewAutoplay(videoRef, !reducedMotion, userPausedRef)

  return (
    <div className="flex justify-center my-6">
      <div className="relative rounded-lg overflow-hidden border border-gray-800 bg-gray-900/30">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          width={video.width}
          height={video.height}
          style={{ aspectRatio: `${video.width} / ${video.height}` }}
          className="block max-w-full h-auto"
          aria-label={alt}
          loop
          muted
          playsInline
          preload="none"
          onPlay={(): void => setPlaying(true)}
          onPause={(): void => setPlaying(false)}
        />
        <PlaybackButton
          playing={playing}
          alt={alt}
          onClick={(): void => togglePlayback(videoRef.current, userPausedRef)}
        />
      </div>
    </div>
  )
}

export default MemeVideo
