import React, { ReactNode } from 'react';

interface FindingProps {
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  confidence: number;
  children: ReactNode;
}

export default function Finding({ severity, title, confidence, children }: FindingProps): React.ReactElement {
  const severityConfig = {
    critical: {
      container: 'bg-red-500/20 border-red-500/30',
      text: 'text-red-400',
    },
    high: {
      container: 'bg-orange-500/20 border-orange-500/30',
      text: 'text-orange-400',
    },
    medium: {
      container: 'bg-yellow-500/20 border-yellow-500/30',
      text: 'text-yellow-400',
    },
    low: {
      container: 'bg-blue-500/20 border-blue-500/30',
      text: 'text-blue-400',
    },
  };

  const config = severityConfig[severity];

  return (
    <div
      data-testid="finding"
      className={`border rounded-lg p-4 space-y-2 animate-in fade-in duration-200 ${config.container}`}
    >
      <div className="flex justify-between items-center">
        <span className={`text-xs font-mono uppercase px-2 py-0.5 rounded ${config.text}`}>
          {severity}
        </span>
        <span className={`text-xs font-mono px-2 py-0.5 rounded ${config.text}`}>
          {confidence}%
        </span>
      </div>
      <div className={`font-bold ${config.text}`}>
        {title}
      </div>
      <div className={config.text}>
        {children}
      </div>
    </div>
  );
}
