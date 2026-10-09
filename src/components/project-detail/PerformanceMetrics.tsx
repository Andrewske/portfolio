import type { ReactNode } from 'react'
import type { DescribedMetric } from '~/components/project-detail/metric-descriptions'
import type { Project } from '~/lib/projects'

interface PerformanceMetricsProps {
  project: Project
  // Metrics with optional context; pass describeMetrics(project) or your own data
  metrics?: DescribedMetric[]
}

export function PerformanceMetrics({ project, metrics }: PerformanceMetricsProps): ReactNode {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
        <span className="text-gray-500">{'//'}</span> Performance & Impact Metrics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(metrics ?? project.metrics).map((metric: DescribedMetric, index) => (
          <div key={index} className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
            <div className="flex items-center gap-4 mb-3">
              <div className={`text-3xl font-bold text-${metric.color || 'cyan'}-400`}>
                {metric.value}
              </div>
              <div className="flex-1">
                <div className="text-gray-400 text-sm font-medium">{metric.label}</div>
              </div>
            </div>

            {metric.description && (
              <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-gray-700 pl-3">
                {metric.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Project Scope Context */}
      <div className="mt-8 p-6 bg-gray-800/30 border border-gray-700 rounded-lg">
        <h3 className="text-lg font-bold text-yellow-300 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
          Project Scope & Context
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-cyan-400 font-medium">Role:</span>
            <p className="text-gray-300">{project.role}</p>
          </div>
          <div>
            <span className="text-cyan-400 font-medium">Timeline:</span>
            <p className="text-gray-300">{project.timeline}</p>
          </div>
          <div>
            <span className="text-cyan-400 font-medium">Scope:</span>
            <p className="text-gray-300">{project.scope}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
