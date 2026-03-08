import { ReactNode } from 'react';

interface TimeSkipProps {
  children: ReactNode;
}

export function TimeSkip({ children }: TimeSkipProps) {
  return (
    <div
      className="py-6 text-center animate-in fade-in duration-500"
      data-testid="time-skip"
    >
      <div className="border-t border-gray-800 mb-4" />
      <div className="text-gray-500 text-sm italic">{children}</div>
      <div className="border-t border-gray-800 mt-4" />
    </div>
  );
}
