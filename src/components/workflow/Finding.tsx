import React, { ReactElement } from 'react';
import type { Block } from '~/lib/workflow-content';
import { renderBlocks } from './BlockRenderer';

interface FindingProps {
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  confidence?: number;
  blocks: Block[];
}

const severityStyles: Record<FindingProps['severity'], { border: string; text: string }> = {
  critical: { border: 'border-l-red-500/50', text: 'text-red-500' },
  high: { border: 'border-l-orange-400/50', text: 'text-orange-400' },
  medium: { border: 'border-l-yellow-400/50', text: 'text-yellow-400' },
  low: { border: 'border-l-slate-400/40', text: 'text-slate-400' },
};

export default function Finding({ severity, title, confidence, blocks }: FindingProps): ReactElement {
  const severityLabel = severity.toUpperCase();
  const confidenceStr = confidence !== undefined ? ` (${confidence}% confidence)` : '';
  const styles = severityStyles[severity];

  return (
    <div
      data-testid="finding"
      className={`space-y-3 font-mono text-base my-4 pl-4 border-l-2 ${styles.border}`}
    >
      <div className="text-text-primary font-semibold">
        Finding (<span className={styles.text}>{severityLabel}</span>): {title}{confidenceStr}
      </div>
      <div className="space-y-3 text-text-body leading-relaxed">
        {renderBlocks(blocks)}
      </div>
    </div>
  );
}
