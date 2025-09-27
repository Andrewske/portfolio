import { Badge } from '~/components/ui/badge';
import { CodeBlock } from '~/components/ui/CodeBlock';
import { getCategoryColor, getCategoryVariant, groupSkillsByCategory, type Project } from '~/lib/projects';

interface TechnicalImplementationProps {
  project: Project;
}

export function TechnicalImplementation({ project }: TechnicalImplementationProps) {
  const groupedSkills = groupSkillsByCategory(project.skills);

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'Expert':
        return 'text-green-400';
      case 'Proficient':
        return 'text-yellow-400';
      case 'Familiar':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
        <span className="text-gray-500">{'//'}</span> Technical Implementation
      </h2>

      <div className="space-y-6">
        {groupedSkills.map(([category, skills]) => (
          <div key={category} className="p-4 sm:p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${getCategoryColor(category)}`}>
              <span className="w-3 h-3 rounded-full bg-current opacity-60"></span>
              {category}
            </h3>

            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="border-l-2 border-gray-700 pl-3 sm:pl-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <Badge variant={getCategoryVariant(skill.category)} className="text-xs whitespace-nowrap">
                      {skill.name}
                    </Badge>
                    <span className={`text-sm font-medium ${getProficiencyColor(skill.proficiency)}`}>
                      {skill.proficiency}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {skill.usage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Code Examples Section */}
      {project.codeExamples && project.codeExamples.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-gray-500">{'//'}</span> Key Implementation Examples
          </h3>
          <div className="space-y-4">
            {project.codeExamples.map((example, index) => (
              <CodeBlock
                key={index}
                code={example.code}
                language={example.language}
                title={example.title}
                impactContext={example.impactContext}
                technicalExplanation={example.technicalExplanation}
              />
            ))}
          </div>
        </div>
      )}

      {/* TODO: Add code examples for each project */}
      {(!project.codeExamples || project.codeExamples.length === 0) && (
        <div className="mt-8 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
          <p className="text-gray-500 text-sm">
            <span className="text-yellow-400">TODO:</span> Add key code examples and implementation snippets
          </p>
        </div>
      )}
    </section>
  );
}