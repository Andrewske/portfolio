'use client';

import type { ReactElement } from 'react';
import { useDinoMode } from './DinoModeProvider';

export function DinoToggle(): ReactElement {
  const { noDinos, toggleNoDinos } = useDinoMode();

  return (
    <div className="flex justify-center my-6">
      <button
        type="button"
        role="switch"
        aria-checked={!noDinos}
        aria-label={noDinos ? 'Enable dinosaur mode' : 'Disable dinosaur mode'}
        onClick={toggleNoDinos}
        className="flex items-center gap-3 px-4 py-2 rounded-full transition-colors"
      >
        {/* Bone emoji + time - highlighted when noDinos is true */}
        <span
          className={`flex items-center gap-1 transition-opacity duration-200 ${
            noDinos ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <span className="text-sm text-comment">5 min</span>
          <span className="text-xl">🦴</span>
        </span>

        {/* Toggle track */}
        <div
          className={`
            relative w-12 h-6 rounded-full transition-colors duration-200
            ${noDinos ? 'bg-gray-600' : 'bg-green-primary/50'}
          `}
        >
          {/* Toggle knob */}
          <span
            className={`
              absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200
              ${noDinos ? 'left-1' : 'left-7'}
            `}
          />
        </div>

        {/* Dino emoji + time - highlighted when noDinos is false (dinos enabled) */}
        <span
          className={`flex items-center gap-1 transition-opacity duration-200 ${
            noDinos ? 'opacity-40' : 'opacity-100'
          }`}
        >
          <span className="text-xl">🦖</span>
          <span className="text-sm text-comment">20 min</span>
        </span>
      </button>
    </div>
  );
}
