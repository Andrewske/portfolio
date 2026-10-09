'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '~/components/tech-stack/use-media-query'
import type { TypingAnimationProps } from '~/lib/types'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/** Number of characters revealed so far. Returns the full length when animation is off. */
const useTypedCount = (text: string, speed: number, animate: boolean): number => {
  const [count, setCount] = useState(0)

  useEffect((): (() => void) | undefined => {
    if (!animate) return
    let index = 0
    setCount(0)
    const timer = setInterval((): void => {
      index++
      setCount(index)
      if (index >= text.length) clearInterval(timer)
    }, speed)
    return (): void => clearInterval(timer)
  }, [text, speed, animate])

  return animate ? count : text.length
}

/**
 * Types `text` out character by character.
 * Screen readers and the server HTML get the full text right away (sr-only copy).
 * The visual copy renders the untyped rest invisibly so line wraps never shift.
 * Under prefers-reduced-motion the full text shows at once with no cursor.
 */
const TypingAnimation = ({ text, speed = 50 }: TypingAnimationProps): React.ReactElement => {
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY)
  const count = useTypedCount(text, speed, !reducedMotion)

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {!reducedMotion && <span className="inline-block w-0 animate-pulse">|</span>}
        <span className="invisible">{text.slice(count)}</span>
        {!reducedMotion && <span className="invisible">|</span>}
      </span>
    </>
  )
}

export default TypingAnimation
