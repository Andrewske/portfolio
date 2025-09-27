interface SimplePipelineProps {
  stages: {
    label: string;
    header?: string;
    metrics: string[];
    type: 'input' | 'process' | 'storage' | 'output';
  }[];
  title?: string;
  description?: string;
  className?: string;
}

export function SimplePipeline({ stages, title, description, className = '' }: SimplePipelineProps) {
  const getStageColor = (type: string) => {
    switch (type) {
      case 'input': return 'border-blue-400 bg-blue-400/10 text-blue-300';
      case 'process': return 'border-yellow-400 bg-yellow-400/10 text-yellow-300';
      case 'storage': return 'border-green-400 bg-green-400/10 text-green-300';
      case 'output': return 'border-cyan-400 bg-cyan-400/10 text-cyan-300';
      default: return 'border-gray-400 bg-gray-400/10 text-gray-300';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Title and Description */}
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h3 className="text-xl font-bold text-cyan-400 mb-2 font-mono">{title}</h3>
          )}
          {description && (
            <p className="text-gray-400 text-sm font-mono">{description}</p>
          )}
        </div>
      )}

      {/* Pipeline */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 p-4 sm:p-6 bg-gray-900/30 border border-gray-800 rounded-lg overflow-x-auto">
        {stages.map((stage, index) => (
          <div key={index} className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            {/* Stage Container */}
            <div className="flex flex-col items-center">
              {/* Stage Header */}
              {stage.header && (
                <div className="text-xs text-gray-400 font-mono mb-2 text-center">
                  {stage.header}
                </div>
              )}

              {/* Stage Box */}
              <div className={`
                relative p-3 sm:p-4 border-2 rounded-lg min-w-[120px] sm:min-w-[140px] text-center
                ${getStageColor(stage.type)}
                transition-all duration-200 hover:scale-105 hover:shadow-lg
              `}>
                {/* Stage Label */}
                <div className="font-bold text-xs sm:text-sm font-mono mb-1 sm:mb-2">
                  {stage.label}
                </div>

                {/* Metrics */}
                <div className="space-y-1">
                  {stage.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-xs text-gray-300 font-mono break-words">
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Arrow (except for last stage) */}
            {index < stages.length - 1 && (
              <div className="flex items-center justify-center lg:rotate-0 rotate-90">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="text-cyan-400"
                  fill="currentColor"
                >
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Metrics */}
      <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-4 text-xs font-mono text-gray-400">
        <span>Total: 94s</span>
        <span>Cost: $0.0012</span>
        <span>Output: 20 triples, 80 vectors</span>
      </div>
    </div>
  );
}