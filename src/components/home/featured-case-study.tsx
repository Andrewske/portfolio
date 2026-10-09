import Link from 'next/link'
import type { JSX } from 'react'
import { buttonVariants } from '~/components/ui/button'
import type { Project, ProjectMetric } from '~/lib/projects'

interface FeaturedCaseStudyProps {
  project: Project
}

const METRIC_COLORS: Readonly<Record<NonNullable<ProjectMetric['color']>, string>> = {
  cyan: 'text-cyan-400',
  yellow: 'text-yellow-300',
  green: 'text-green-400',
  purple: 'text-purple-400',
}

const WindowBar = ({ id }: { id: string }): JSX.Element => (
  <div className="flex items-center gap-2 px-4 py-3 border-b border-green-500/20 bg-green-500/[0.03]">
    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" aria-hidden="true" />
    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" aria-hidden="true" />
    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" aria-hidden="true" />
    <span className="ml-3 text-xs text-gray-500 truncate">~/work/{id}/case-study.md</span>
  </div>
)

const MetricGrid = ({ metrics }: { metrics: readonly ProjectMetric[] }): JSX.Element => (
  <dl className="grid grid-cols-2 gap-px bg-gray-800/60 border border-gray-800/60 rounded overflow-hidden">
    {metrics.map(metric => (
      <div key={metric.label} className="flex flex-col-reverse bg-black p-3 sm:p-4">
        <dt className="text-xs text-gray-500 mt-1">{metric.label}</dt>
        <dd className={`text-xl sm:text-2xl font-bold ${METRIC_COLORS[metric.color ?? 'cyan']}`}>
          {metric.value}
        </dd>
      </div>
    ))}
  </dl>
)

const SkillTags = ({ project }: FeaturedCaseStudyProps): JSX.Element => (
  <ul className="list-none ml-0 leading-normal flex flex-wrap gap-1.5" aria-label="Technologies">
    {project.skills.map(skill => (
      <li
        key={skill.name}
        className="text-xs px-2 py-0.5 rounded border border-gray-800 text-gray-400"
      >
        {skill.name}
      </li>
    ))}
  </ul>
)

const Intro = ({ project }: FeaturedCaseStudyProps): JSX.Element => (
  <div className="space-y-4">
    <p className="text-xs uppercase tracking-widest text-green-400/80">
      {'// '}featured case study · {project.timeline}
    </p>
    <h3 className="text-2xl sm:text-4xl font-bold text-white">
      <span className="text-purple-400">class</span>{' '}
      <span className="text-yellow-300">{project.className}</span>
    </h3>
    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{project.subtitle}</p>
    <p className="text-sm text-green-300/90 border-l-2 border-green-400/50 pl-3 leading-relaxed">
      {project.businessImpact}
    </p>
  </div>
)

/** The one large panel at the top of the work: current job, linked to its case study. */
export const FeaturedCaseStudy = ({ project }: FeaturedCaseStudyProps): JSX.Element => (
  <article className="border border-green-500/30 rounded-lg overflow-hidden bg-gradient-to-br from-green-500/[0.06] via-black to-cyan-500/[0.04] shadow-[0_0_60px_-30px_rgba(34,197,94,0.5)]">
    <WindowBar id={project.id} />
    <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[3fr_2fr] lg:gap-10">
      <Intro project={project} />
      <div className="space-y-5">
        <MetricGrid metrics={project.metrics} />
        <SkillTags project={project} />
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-3 px-5 sm:px-8 pb-6 sm:pb-8">
      <Link
        href={`/project/${project.id}`}
        className={buttonVariants({ variant: 'terminal', size: 'lg' })}
      >
        Read the case study →
      </Link>
      <span className="text-xs text-gray-600">{project.role}</span>
    </div>
  </article>
)
