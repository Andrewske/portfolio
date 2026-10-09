import type { ImageResponse } from 'next/og'
import { projects } from '~/lib/projects'
import { ogSize, renderOgCard } from '~/lib/og-card'
import { siteConfig } from '~/lib/site-config'

export const alt = `${siteConfig.name} project`
export const size = ogSize
export const contentType = 'image/png'

interface ProjectImageProps {
  params: Promise<{ projectId: string }>
}

export function generateStaticParams(): { projectId: string }[] {
  return projects.map(project => ({ projectId: project.id }))
}

export default async function ProjectOpengraphImage({
  params,
}: ProjectImageProps): Promise<ImageResponse> {
  const { projectId } = await params
  const project = projects.find(p => p.id === projectId)

  return renderOgCard({
    heading: project?.title ?? siteConfig.name,
    subheading: project?.description ?? 'Project',
  })
}
