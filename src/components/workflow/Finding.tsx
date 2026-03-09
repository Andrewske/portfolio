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
    <div data-testid="finding" className="space-y-3 font-mono text-sm my-4">
      <div className="text-text-muted">---</div>
      <div className="text-text-primary font-semibold">
        Finding ({severityLabel}): {title}{confidenceStr}
      </div>
      <div className="space-y-3 text-text-body leading-relaxed">
        {renderBlocks(blocks)}
      </div>
    </div>
  );
}
