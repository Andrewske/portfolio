import type { ImageResponse } from 'next/og'
import { ogSize, renderOgCard } from '~/lib/og-card'
import { siteConfig } from '~/lib/site-config'

export const alt = siteConfig.title
export const size = ogSize
export const contentType = 'image/png'

export default function OpengraphImage(): ImageResponse {
  return renderOgCard({
    heading: siteConfig.name,
    subheading: 'AI Systems Engineer & Full-Stack Developer',
  })
}
