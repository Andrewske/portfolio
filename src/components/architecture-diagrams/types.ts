export interface DiagramNode {
  id: string;
  label: string;
  type: 'process' | 'database' | 'api' | 'service' | 'client' | 'decision' | 'state' | 'agent';
  color?: string;
  x?: number;
  y?: number;
  metadata?: Record<string, any>;
}

export interface DiagramLink {
  source: string;
  target: string;
  label?: string;
  type?: 'flow' | 'data' | 'dependency' | 'webhook' | 'api-call' | 'trigger';
  animated?: boolean;
  bidirectional?: boolean;
  metadata?: Record<string, any>;
}

export interface DiagramData {
  nodes: DiagramNode[];
  links: DiagramLink[];
  layout?: 'horizontal' | 'vertical' | 'radial' | 'force';
  title?: string;
  description?: string;
}

export interface DiagramProps {
  data: DiagramData;
  width?: number;
  height?: number;
  className?: string;
  interactive?: boolean;
  onNodeClick?: (node: DiagramNode) => void;
  onLinkClick?: (link: DiagramLink) => void;
}

export type DiagramType =
  | 'pipeline-flow'
  | 'sequence'
  | 'component'
  | 'state-flow'
  | 'flowchart'
  | 'agent-architecture';