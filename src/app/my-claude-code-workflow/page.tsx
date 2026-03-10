import type { Metadata } from 'next'
import type React from 'react'
import { WorkflowPageClient } from '~/components/workflow/WorkflowPageClient'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'My Claude Code Workflow',
  description:
    "Your developers were so preoccupied with whether they could one-shot it, they didn't stop to think if they should",
  image: 'https://kevinandrews.info/assets/workflow/trex-banner.webp',
  author: {
    '@type': 'Person',
    name: 'Kevin Andrews',
    url: 'https://kevinandrews.info',
  },
  publisher: {
    '@type': 'Person',
    name: 'Kevin Andrews',
  },
  datePublished: '2025-03-10',
  dateModified: '2025-03-10',
} as const

export const metadata: Metadata = {
  title: 'My Claude Code Workflow | Kevin Andrews',
  description:
    "Your developers were so preoccupied with whether they could one-shot it, they didn't stop to think if they should",
  openGraph: {
    title: 'My Claude Code Workflow',
    description:
      "Your developers were so preoccupied with whether they could one-shot it, they didn't stop to think if they should",
    images: ['https://kevinandrews.info/assets/workflow/trex-banner.webp'],
    type: 'article',
    authors: ['Kevin Andrews'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Claude Code Workflow',
    description:
      "Your developers were so preoccupied with whether they could one-shot it, they didn't stop to think if they should",
    images: ['https://kevinandrews.info/assets/workflow/trex-banner.webp'],
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
