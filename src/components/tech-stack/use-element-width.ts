import { useEffect, useState } from 'react'

/**
 * Tracks an element's content-box width with a ResizeObserver.
 * Returns a callback ref plus the latest rounded width (null until first measured).
 */
export const useElementWidth = <T extends HTMLElement>(): [
  (element: T | null) => void,
  number | null,
] => {
  const [element, setElement] = useState<T | null>(null)
  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    if (!element) return
    const observer = new ResizeObserver(entries => {
      const measured = entries[0]?.contentRect.width
      if (measured !== undefined) setWidth(Math.round(measured))
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [element])

  return [setElement, width]
}
