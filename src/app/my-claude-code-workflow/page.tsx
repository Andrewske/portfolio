import type { Metadata } from 'next'
import type React from 'react'
import { WorkflowPageClient } from '~/components/workflow/WorkflowPageClient'

export const metadata: Metadata = {
  title: 'My Claude Code Workflow | Kevin Andrews',
  description:
    'How I get Claude to write code I trust - an 8-phase workflow from discussion through code review, built for human-AI collaboration',
}

export default function MyClaudeCodeWorkflowPage(): React.ReactElement {
  return <WorkflowPageClient />
}
