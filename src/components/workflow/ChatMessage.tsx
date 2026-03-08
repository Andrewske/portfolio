import React, { ReactNode } from 'react';

interface ChatMessageProps {
  speaker: 'hammond' | 'claude';
  children: ReactNode;
  id?: string;
}

const Avatar = ({ speaker }: { speaker: 'hammond' | 'claude' }) => {
  const config = {
    hammond: { bg: 'bg-gray-600', initial: 'H', alt: 'Hammond' },
    claude: { bg: 'bg-violet-600', initial: 'C', alt: 'Claude' },
  };
  const { bg, initial, alt } = config[speaker];
  return (
    <div
      className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
      role="img"
      aria-label={alt}
    >
      {initial}
    </div>
  );
};

export default function ChatMessage({ speaker, children, id }: ChatMessageProps): React.ReactElement {
  const direction = speaker === 'hammond' ? 'flex-row' : 'flex-row-reverse';
  return (
    <div
      id={id}
      data-chat
      data-testid="chat-message"
      className={`flex gap-3 items-start ${direction} animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      <Avatar speaker={speaker} />
      <div className="bg-gray-900/30 border border-gray-800 rounded-lg px-4 py-3 font-mono text-sm">
        {children}
      </div>
    </div>
  );
}
