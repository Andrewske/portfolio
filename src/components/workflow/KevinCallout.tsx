import { ReactNode } from 'react';

interface KevinCalloutProps {
  children: ReactNode;
  whatBreaks?: string;
  id?: string; // For anchor links
}

export function KevinCallout({ children, whatBreaks, id }: KevinCalloutProps) {
  return (
    <div
      id={id}
      className="border-l-4 border-amber-500/50 bg-amber-500/5 rounded-r-lg p-4 space-y-3 animate-in fade-in slide-in-from-left-2 duration-300"
      data-testid="kevin-callout"
    >
      <div className="text-amber-400 text-xs font-mono uppercase tracking-wider">
        [KEVIN]
      </div>
      <div className="text-gray-300 text-sm">{children}</div>
      {whatBreaks && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 mt-3">
          <div className="flex items-start gap-2">
            <span className="text-amber-500 text-lg">⚠️</span>
            <div className="flex-1">
              <div className="text-gray-500 text-xs mb-1">
                What breaks without it:
              </div>
              <div className="text-gray-400 text-sm italic">{whatBreaks}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
