import { useCallback, useMemo, useSyncExternalStore } from 'react'

/**
 * Subscribes to a media query without a render-then-correct pass, so the
 * first paint already knows whether it is on desktop.
 */
export function useMediaQuery(query: string): boolean {
  const mql = useMemo(
    () => (typeof window === 'undefined' ? null : window.matchMedia(query)),
    [query],
  )

  const subscribe = useCallback(
    (onChange: () => void) => {
      mql?.addEventListener('change', onChange)
      return () => mql?.removeEventListener('change', onChange)
    },
    [mql],
  )

  return useSyncExternalStore(
    subscribe,
    () => mql?.matches ?? false,
    () => false,
  )
}

/** True only on devices that can actually hover with a precise pointer. */
export function useIsPointerFine(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}
