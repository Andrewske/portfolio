import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Project, ProficiencyLevel, groupSkillsByCategory, getCategoryVariant, getCategoryColor } from '~/lib/projects';

interface ProjectCardProps {
  project: Project;
}

const getProficiencyVariant = (proficiency: ProficiencyLevel) => {
  switch (proficiency) {
    case 'Expert':
      return 'proficiencyExpert';
    case 'Proficient':
      return 'proficiencyProficient';
    case 'Familiar':
      return 'proficiencyFamiliar';
  }
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const groupedSkills = groupSkillsByCategory(project.skills);

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all group">
      <div className="flex">
        <div className="w-12 bg-gray-900 flex flex-col items-center py-4 text-gray-600 text-xs">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 mr-4">
              <h3 className="text-xl font-bold text-white mb-1">
                <span className="text-purple-400">class</span>{' '}
                <span className="text-yellow-300">{project.className}</span>:
              </h3>
              <p className="text-gray-300 mb-2 font-medium">{project.subtitle}</p>
              <div className="p-3 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-l-2 border-green-400/50 rounded">
                <p className="text-sm text-green-300 flex items-center gap-2">
                  <span className="text-green-400 font-bold">💡</span>
                  <span className="font-medium">Impact:</span> {project.businessImpact}
                </p>
              </div>
            </div>
            <Badge variant={project.status === 'PRODUCTION' ? 'statusProduction' : project.status === 'LIVE' ? 'statusLive' : 'statusDevelopment'}>
              {project.status}
            </Badge>
          </div>

          {/* Role, Timeline, Scope Strip */}
          <div className="mb-4 p-3 bg-gray-900/30 rounded border border-gray-800/50">
            <p className="text-sm text-gray-300">
              <span className="text-cyan-400">Role:</span>{' '}
              <span className="text-gray-200">{project.role}</span>
              <span className="text-gray-600 mx-2">•</span>
              <span className="text-cyan-400">Timeline:</span>{' '}
              <span className="text-gray-200">{project.timeline}</span>
              <span className="text-gray-600 mx-2">•</span>
              <span className="text-cyan-400">Scope:</span>{' '}
              <span className="text-gray-200">{project.scope}</span>
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {project.metrics.map((metric, index) => (
              <div key={index} className="text-center p-2 bg-gray-900/50 rounded">
                <div className={`text-lg font-bold text-${metric.color || 'cyan'}-400`}>
                  {metric.value}
                </div>
                <div className="text-xs text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Safety & Reliability */}
          {project.safetyAndReliability && project.safetyAndReliability.length > 0 && (
            <div className="mb-4">
              <h4 className="text-orange-400 text-sm font-bold mb-3 flex items-center gap-2">
                <span className="text-gray-500">{'//'}</span> Safety & Reliability
              </h4>
              <div className="space-y-1">
                {project.safetyAndReliability.map((item, index) => (
                  <div key={index} className="text-xs text-gray-400">• {item}</div>
                ))}
              </div>
            </div>
          )}

          {/* AI Evaluation & Performance */}
          {project.aiEvaluation && (
            <div className="mb-4">
              <h4 className="text-purple-400 text-sm font-bold mb-3 flex items-center gap-2">
                <span className="text-gray-500">{'//'}</span> AI Evaluation & Performance
              </h4>
              <div className="p-3 bg-purple-900/10 border-l-2 border-purple-400/50 rounded">
                <p className="text-xs text-gray-300 leading-relaxed">{project.aiEvaluation}</p>
              </div>
            </div>
          )}

          {/* Skills by Category */}
          <div className="mb-4">
            <h4 className="text-cyan-400 text-sm font-bold mb-3 flex items-center gap-2">
              <span className="text-gray-500">{'//'}</span> Skills & Technologies
            </h4>
            <div className="space-y-3">
              {groupedSkills.map(([category, skills]) => (
                <div key={category} className="space-y-1">
                  <h5 className={`text-xs font-medium ${getCategoryColor(category)} flex items-center gap-1`}>
                    <span className="w-2 h-2 rounded-full bg-current opacity-60"></span>
                    {category}
                  </h5>
                  <div className="flex flex-wrap gap-1.5 pl-3">
                    {skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant={getCategoryVariant(skill.category)}
                        className="text-xs"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.detailPageUrl && (
              <Button variant="terminalGhost" size="sm" asChild>
                <Link href={project.detailPageUrl}>
                  View Project →
                </Link>
              </Button>
            )}
            {project.github && (
              <Button variant="terminalGhost" size="sm" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="terminalGhost" size="sm" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              </Button>
            )}
            {!project.detailPageUrl && !project.github && !project.liveUrl && (
              <Button variant="terminalGhost" size="sm" disabled>
                Internal Tool
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}