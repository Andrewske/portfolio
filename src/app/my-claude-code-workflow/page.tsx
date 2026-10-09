import type { Metadata } from 'next'
import type React from 'react'
import { WorkflowPageClient } from '~/components/workflow/WorkflowPageClient'
import { siteConfig } from '~/lib/site-config'

const bannerUrl = `${siteConfig.url}/assets/workflow/trex-banner.webp`

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'My Claude Code Workflow',
  description:
    "Your developers were so preoccupied with whether they could one-shot it, they didn't stop to think if they should",
  image: bannerUrl,
  author: {
    '@type': 'Person',
    name: 'Kevin Andrews',
    url: siteConfig.url,
  },
  publisher: {
    '@type': 'Person',
    name: 'Kevin Andrews',
  },
  datePublished: '2025-03-10',
  dateModified: '2025-03-10',
} as const

export const metadata: Metadata = {
  title: 'My Claude Code Workflow',
  description:
    "Your developers were so preoccupied with whether they could one-shot it, they didn't stop to think if they should",
  openGraph: {
    title: 'My Claude Code Workflow',
    description:
      "Your developers were so preoccupied with whether they could one-shot it, they didn't stop to think if they should",
    images: [bannerUrl],
    type: 'article',
    authors: ['Kevin Andrews'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Claude Code Workflow',
    description:
      "Your developers were so preoccupied with whether they could one-shot it, they didn't stop to think if they should",
    images: [bannerUrl],
  },
  alternates: {
    canonical: '/my-claude-code-workflow',
  },
}

export default function MyClaudeCodeWorkflowPage(): React.ReactElement {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <WorkflowPageClient />
    </>
  )
}
