import { ReactNode } from 'react';

interface CollapsiblePromptProps {
  title: string;
  children: ReactNode;
}

export default function CollapsiblePrompt({ title, children }: CollapsiblePromptProps) {
  return (
    <details
      className="text-sm font-mono"
      data-testid="collapsible-prompt"
    >
      <summary className="cursor-pointer text-gray-400 hover:text-gray-300 transition-colors">
        {title}
      </summary>
      <div className="mt-1 pl-4 text-gray-300 leading-snug whitespace-pre-wrap">
        {children}
      </div>
    </details>
  );
}
