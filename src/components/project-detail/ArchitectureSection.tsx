import { ArchitectureDiagram } from '~/components/architecture-diagrams/ArchitectureDiagram';
import type { Project } from '~/lib/projects';

interface ArchitectureSectionProps {
  project: Project;
}

export function ArchitectureSection({ project }: ArchitectureSectionProps) {
  if (!project.architecture && !project.architectureDiagramData) return null;

  // Parse the architecture content to handle markdown-style formatting
  const formatArchitectureContent = (content: string) => {
    const occurrenceCounts: Record<string, number> = {};
    return content.split('**').map((part, idx) => {
      const count = (occurrenceCounts[part] ?? 0) + 1;
      occurrenceCounts[part] = count;
      const key = `${part}-${count}`;
      if (idx % 2 === 1) {
        // This is a bold section
        return <strong key={key} className="text-cyan-300 font-bold">{part}</strong>;
      }
      return <span key={key}>{part}</span>;
    });
  };

  // Split architecture into sections based on bold headers
  const architectureSections: { title: string; content: string }[] = [];

  if (project.architecture) {
    const sections = project.architecture.split(/\*\*([^*]+)\*\*:/).filter(Boolean);
    for (let i = 0; i < sections.length; i += 2) {
      if (sections[i + 1]) {
        architectureSections.push({
          title: sections[i],
          content: sections[i + 1].trim()
        });
      }
    }
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
        <span className="text-gray-500">{'//'}</span> Architecture Deep Dive
      </h2>

      <div className="space-y-6">
        {/* Architecture Diagram */}
        {project.architectureDiagramType && project.architectureDiagramData && (
          <div className="mb-6">
            <ArchitectureDiagram
              type={project.architectureDiagramType}
              data={project.architectureDiagramData}
              className="mb-6"
            />
          </div>
        )}

        {/* Text-based Architecture Description */}
        {project.architecture && (
          architectureSections.length > 0 ? (
            architectureSections.map((section) => (
              <div key={section.title} className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-300 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                  {section.title}
                </h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {formatArchitectureContent(section.content)}
                </p>
              </div>
            ))
          ) : (
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {formatArchitectureContent(project.architecture)}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}