import { ReactNode } from 'react';

interface TimeSkipProps {
  children: ReactNode;
}

export function TimeSkip({ children }: TimeSkipProps) {
  // Simple italicized ellipsis text
  return (
    <div className="text-gray-500 text-sm italic font-mono leading-snug" data-testid="time-skip">
      *{children}*
    </div>
  );
}
