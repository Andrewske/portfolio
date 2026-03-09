import React, { ReactElement } from 'react';
import type { Block } from '~/lib/workflow-content';
import { renderBlocks } from './BlockRenderer';

import ChatCharacterIcon from './ChatCharacterIcon';

interface ChatMessageProps {
  speaker: 'hammond' | 'claude';
  blocks: Block[];
  id?: string;
}

export default function ChatMessage({ speaker, blocks, id }: ChatMessageProps): ReactElement {
  // Claude gets blue dot on left, Hammond gets yellow pill for short messages or yellow dot
  const isHammond = speaker === 'hammond';

  return (
    <div id={id} data-chat data-testid="chat-message" className="relative">
      {/* Character icon - floating in left margin */}
      <ChatCharacterIcon speaker={speaker} />

      {/* Chat content */}
      <div className="flex gap-3 items-start">
        {/* Indicator dot */}
        <div
          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
            isHammond ? 'bg-amber-400' : 'bg-blue-400'
          }`}
          role="img"
          aria-label={isHammond ? 'Hammond' : 'Claude'}
        />
        {/* Message content - plain text, no box */}
        <div className="font-mono text-sm text-gray-300 leading-snug space-y-2">
          {renderBlocks(blocks)}
        </div>
      </div>
    </div>
  );
}
