import type { DiagramData, DiagramLink, DiagramNode } from '~/lib/projects/types'

export interface DiagramProps {
  data: DiagramData
  width?: number
  height?: number
  className?: string
  interactive?: boolean
  onNodeClick?: (node: DiagramNode) => void
  onLinkClick?: (link: DiagramLink) => void
}
