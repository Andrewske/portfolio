import type { MetadataRoute } from 'next'
import { projects } from '~/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kevinandrews.info' // Replace with your actual domain

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/my-claude-code-workflow`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ]

  const projectRoutes = projects.map(project => ({
    url: `${baseUrl}/project/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...projectRoutes]
}
