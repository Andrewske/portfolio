import { Project } from '~/lib/projects';

interface ChallengesAndSolutionsProps {
  project: Project;
}

export function ChallengesAndSolutions({ project }: ChallengesAndSolutionsProps) {
  // If no challenges/solutions data, don't render the section
  if (!project.challenges && !project.solutions && !project.lessonsLearned) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
          <span className="text-gray-500">{'//'}</span> Challenges & Solutions
        </h2>
        <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-lg">
          <p className="text-gray-500">
            <span className="text-yellow-400">TODO:</span> Document key technical challenges overcome and solutions implemented for this project
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
        <span className="text-gray-500">{'//'}</span> Challenges & Solutions
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <div className="p-6 bg-red-900/10 border border-red-800/50 rounded-lg">
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              Technical Challenges
            </h3>
            <div className="space-y-3">
              {project.challenges.map((challenge, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 text-sm">⚠</span>
                  <p className="text-gray-300 text-sm leading-relaxed">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Solutions */}
        {project.solutions && project.solutions.length > 0 && (
          <div className="p-6 bg-green-900/10 border border-green-800/50 rounded-lg">
            <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Solutions Implemented
            </h3>
            <div className="space-y-3">
              {project.solutions.map((solution, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1 text-sm">✓</span>
                  <p className="text-gray-300 text-sm leading-relaxed">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lessons Learned */}
      {project.lessonsLearned && project.lessonsLearned.length > 0 && (
        <div className="mt-6 p-6 bg-blue-900/10 border border-blue-800/50 rounded-lg">
          <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            Key Learnings & Insights
          </h3>
          <div className="space-y-3">
            {project.lessonsLearned.map((lesson, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-blue-400 mt-1 text-sm">💡</span>
                <p className="text-gray-300 text-sm leading-relaxed">{lesson}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}