import Link from 'next/link';
import { Button } from '~/components/ui/button';
import type { Project } from '~/lib/projects';
import { ArchitectureSection } from './project-detail/ArchitectureSection';
import { ChallengesAndSolutions } from './project-detail/ChallengesAndSolutions';
import { PerformanceMetrics } from './project-detail/PerformanceMetrics';
import { ProjectHero } from './project-detail/ProjectHero';
import { TechnicalImplementation } from './project-detail/TechnicalImplementation';

interface ProjectDetailTemplateProps {
  project: Project;
}

export default function ProjectDetailTemplate({ project }: ProjectDetailTemplateProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/#projects" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            ← Back to Projects
          </Link>
        </div>

        {/* Hero Section */}
        <ProjectHero project={project} />

        {/* Executive Summary */}
        {project.longDescription && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
              <span className="text-gray-500">{'//'}</span> Executive Summary
            </h2>
            <div className="p-4 sm:p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
              <p className="text-gray-300 leading-relaxed text-lg">{project.longDescription}</p>
            </div>
          </section>
        )}

        {/* Architecture Deep Dive */}
        <ArchitectureSection project={project} />

        {/* Technical Implementation */}
        <TechnicalImplementation project={project} />

        {/* Performance & Metrics */}
        <PerformanceMetrics project={project} />

        {/* Challenges & Solutions */}
        <ChallengesAndSolutions project={project} />

        {/* Safety & Reliability */}
        {project.safetyAndReliability && project.safetyAndReliability.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
              <span className="text-gray-500">{'//'}</span> Safety & Reliability
            </h2>
            <div className="p-4 sm:p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
              <div className="space-y-3">
                {project.safetyAndReliability.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* AI Evaluation */}
        {project.aiEvaluation && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <span className="text-gray-500">{'//'}</span> AI Evaluation & Performance
            </h2>
            <div className="p-4 sm:p-6 bg-purple-900/10 border-l-4 border-purple-400 rounded-lg">
              <p className="text-gray-300 leading-relaxed">{project.aiEvaluation}</p>
            </div>
          </section>
        )}


        {/* Action Buttons */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <Button variant="terminalGhost" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  View on GitHub →
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="terminalGhost" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo →
                </a>
              </Button>
            )}
            <Button variant="terminalGhost" asChild>
              <Link href="/#projects">
                Back to Portfolio
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}