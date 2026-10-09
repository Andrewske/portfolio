import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetailTemplate from '~/components/ProjectDetailTemplate'
import { projects } from '~/lib/projects'
import { siteConfig } from '~/lib/site-config'

interface ProjectPageProps {
  params: Promise<{ projectId: string }>
}

export async function generateStaticParams(): Promise<{ projectId: string }[]> {
  return projects.map(project => ({
    projectId: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { projectId } = await params
  const project = projects.find(p => p.id === projectId)

  if (!project) {
    return { title: 'Project Not Found', robots: { index: false } }
  }

  const path = `/project/${project.id}`

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      type: 'website',
      url: path,
      siteName: siteConfig.name,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params
  const project = projects.find(p => p.id === projectId)

  if (!project) {
    notFound()
  }

  return <ProjectDetailTemplate project={project} />
}
