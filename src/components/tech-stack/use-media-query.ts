import { useCallback, useSyncExternalStore } from 'react'

const getServerSnapshot = (): boolean => false

/** Live `matchMedia` result. Returns false during SSR and hydration. */
export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (onChange: () => void): (() => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )
  const getSnapshot = useCallback((): boolean => window.matchMedia(query).matches, [query])
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
