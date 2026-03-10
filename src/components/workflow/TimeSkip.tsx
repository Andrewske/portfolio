import type { ReactNode } from 'react'

interface TimeSkipProps {
  children: ReactNode
}

export function TimeSkip({ children }: TimeSkipProps) {
  // Simple italicized ellipsis text
  return (
    <div className="text-gray-500 text-base italic font-mono m-9" data-testid="time-skip">
      *{children}*
    </div>
  )
}
