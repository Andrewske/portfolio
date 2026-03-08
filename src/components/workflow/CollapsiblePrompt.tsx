import { ReactNode } from 'react';

interface CollapsiblePromptProps {
  title: string;
  children: ReactNode;
}

export default function CollapsiblePrompt({ title, children }: CollapsiblePromptProps) {
  return (
    <details
      className="border border-gray-800 rounded-lg overflow-hidden"
      data-testid="collapsible-prompt"
    >
      <summary className="px-4 py-3 bg-gray-900/50 cursor-pointer text-gray-400 text-sm font-mono hover:bg-gray-900/70 transition-colors">
        {title}
      </summary>
      <div className="p-4 bg-gray-950 font-mono text-sm text-gray-300 whitespace-pre-wrap">
        {children}
      </div>
    </details>
  );
}
