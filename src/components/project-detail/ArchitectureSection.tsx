import { Project } from '~/lib/projects';

interface ArchitectureSectionProps {
  project: Project;
}

export function ArchitectureSection({ project }: ArchitectureSectionProps) {
  if (!project.architecture) return null;

  // Parse the architecture content to handle markdown-style formatting
  const formatArchitectureContent = (content: string) => {
    return content.split('**').map((part, index) => {
      if (index % 2 === 1) {
        // This is a bold section
        return <strong key={index} className="text-cyan-300 font-bold">{part}</strong>;
      }
      return part;
    });
  };

  // Split architecture into sections based on bold headers
  const sections = project.architecture.split(/\*\*([^*]+)\*\*:/).filter(Boolean);
  const architectureSections: { title: string; content: string }[] = [];

  for (let i = 0; i < sections.length; i += 2) {
    if (sections[i + 1]) {
      architectureSections.push({
        title: sections[i],
        content: sections[i + 1].trim()
      });
    }
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
        <span className="text-gray-500">{'//'}</span> Architecture Deep Dive
      </h2>

      <div className="space-y-6">
        {architectureSections.length > 0 ? (
          architectureSections.map((section, index) => (
            <div key={index} className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
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
        )}
      </div>
    </section>
  );
}