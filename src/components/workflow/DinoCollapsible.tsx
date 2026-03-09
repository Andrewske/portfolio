'use client';

import React, { useState, type ReactNode } from 'react';
import { useDinoMode } from './DinoModeProvider';

interface DinoCollapsibleProps {
  children: ReactNode;
  defaultLabel?: string;
}

export function DinoCollapsible({ children, defaultLabel = 'Jurassic Park scene' }: DinoCollapsibleProps): React.ReactElement | null {
  const { noDinos } = useDinoMode();
  const [isOpen, setIsOpen] = useState(false);

  // When dinos are enabled, just render children directly
  if (!noDinos) {
    return <>{children}</>;
  }

  // When noDinos is true, show collapsible
  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-900/50 hover:bg-gray-900/70 transition-colors text-left"
      >
        <span className="text-gray-500 text-sm italic">
          {isOpen ? 'Hide' : 'Show'} {defaultLabel}
        </span>
        <span className="text-gray-600 text-lg">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="p-4 space-y-4 border-t border-gray-800">
          {children}
        </div>
      )}
    </div>
  );
}
