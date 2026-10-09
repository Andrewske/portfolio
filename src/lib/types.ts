// Common component prop types

export interface BaseComponentProps {
  className?: string
}

export interface WithChildren {
  children: React.ReactNode
}

export interface TypingAnimationProps {
  text: string
  speed?: number
  /** Rendered right after the typed text (e.g. a closing quote), so it follows the cursor. */
  suffix?: string
}
