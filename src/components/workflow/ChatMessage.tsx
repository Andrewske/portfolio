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
  const isHammond = speaker === 'hammond';
  const speakerName = isHammond ? 'John Hammond' : 'Mr. DNA';
  const speakerColor = isHammond ? 'text-amber-400' : 'text-blue-400';

  return (
    <div id={id} data-chat data-testid="chat-message">
      {/* Header: icon + name */}
      <div className="flex items-center gap-2 mb-1">
        <ChatCharacterIcon speaker={speaker} />
        <span className={`font-mono text-base font-semibold ${speakerColor}`}>
          {speakerName}
        </span>
      </div>

      {/* Message content - indented to align with name */}
      <div className="ml-10 font-mono text-base text-text-body leading-relaxed space-y-3">
        {renderBlocks(blocks)}
      </div>
    </div>
  );
}
