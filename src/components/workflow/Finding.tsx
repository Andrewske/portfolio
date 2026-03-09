import React, { ReactElement } from 'react';
import type { Block } from '~/lib/workflow-content';
import { renderBlocks } from './BlockRenderer';

interface FindingProps {
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  confidence?: number;
  blocks: Block[];
}

export default function Finding({ severity, title, confidence, blocks }: FindingProps): ReactElement {
  const severityLabel = severity.toUpperCase();
  const confidenceStr = confidence !== undefined ? ` (${confidence}% confidence)` : '';

  return (
    <div data-testid="finding" className="space-y-1 font-mono text-sm">
      <div className="text-gray-500">---</div>
      <div className="text-white font-semibold">
        Finding ({severityLabel}): {title}{confidenceStr}
      </div>
      <div className="space-y-2 text-gray-300 leading-snug">
        {renderBlocks(blocks)}
      </div>
    </div>
  );
}
