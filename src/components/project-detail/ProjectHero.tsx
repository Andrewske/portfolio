import { Badge } from '~/components/ui/badge';
import type { Project } from '~/lib/projects';

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="mb-12">
      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <div className="flex">
          <div className="w-16 bg-gray-900 flex flex-col items-center py-6 text-gray-600 text-sm">

          </div>
          <div className="flex-1 p-8">
            {/* Header with Class Syntax */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                <span className="text-purple-400">class</span>{' '}
                <span className="text-yellow-300">{project.className}</span>:
              </h1>
              <p className="text-xl text-gray-300 mb-4">{project.subtitle}</p>

              {/* Status and Timeline */}
              <div className="flex items-center gap-4 mb-4">
                <Badge variant={project.status === 'PRODUCTION' ? 'statusProduction' : project.status === 'LIVE' ? 'statusLive' : 'statusDevelopment'}>
                  {project.status}
                </Badge>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{project.timeline}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{project.role}</span>
              </div>
            </div>

            {/* Business Impact Highlight */}
            <div className="p-4 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-l-4 border-green-400/50 rounded mb-6">
              <p className="text-green-300 flex items-center gap-2">
                <span className="text-green-400 font-bold">💡</span>
                <span className="font-medium">Business Impact:</span> {project.businessImpact}
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.metrics.map((metric, index) => (
                <div key={`${metric.label}-${index}`} className="text-center p-4 bg-gray-900/50 rounded border border-gray-800">
                  <div className={`text-2xl font-bold text-${metric.color || 'cyan'}-400 mb-1`}>
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-500">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}