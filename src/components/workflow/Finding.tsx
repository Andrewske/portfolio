import React from 'react';
import { renderFormattedContent } from './renderFormattedContent';

interface FindingProps {
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  confidence?: number;
  content: string;
}

export default function Finding({ severity, title, confidence, content }: FindingProps): React.ReactElement {
  const severityLabel = severity.toUpperCase();
  const confidenceStr = confidence !== undefined ? ` (${confidence}% confidence)` : '';

  return (
    <div data-testid="finding" className="space-y-1 font-mono text-sm">
      <div className="text-gray-500">---</div>
      <div className="text-white font-semibold">
        Finding ({severityLabel}): {title}{confidenceStr}
      </div>
      <div className="space-y-1 text-gray-300 leading-snug">
        {renderFormattedContent(content)}
      </div>
    </div>
  );
}
