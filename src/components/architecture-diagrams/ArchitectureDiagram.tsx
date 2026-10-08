'use client'

import type { DiagramData, DiagramNode, DiagramType } from '~/lib/projects'
import { PipelineFlowDiagram } from './PipelineFlowDiagram'
import { SimplePipeline } from './SimplePipeline'

interface ArchitectureDiagramProps {
  type: DiagramType
  data: DiagramData
  className?: string
}

type StageType = 'input' | 'process' | 'storage' | 'output'

const stageTypeByNodeType: Partial<Record<DiagramNode['type'], StageType>> = {
  client: 'input',
  database: 'storage',
  state: 'output',
}

// Nodes without coordinates are a linear pipeline; header and metrics come from metadata
const toPipelineStages = (nodes: DiagramNode[]) =>
  nodes.map(node => ({
    header: node.metadata?.header as string | undefined,
    label: node.label,
    metrics: (node.metadata?.metrics as string[] | undefined) ?? [],
    type: stageTypeByNodeType[node.type] ?? 'process',
  }))

const hasCoordinates = (data: DiagramData) =>
  data.nodes.some(node => node.x !== undefined || node.y !== undefined)

export function ArchitectureDiagram({ type, data, className }: ArchitectureDiagramProps) {
  switch (type) {
    case 'pipeline-flow':
      // Use simple pipeline for knowledge graph, D3 for others
      if (data.title?.includes('Knowledge Graph')) {
        const stages = [
          {
            header: 'Document Input',
            label: 'INPUT',
            metrics: ['8.6k chars'],
            type: 'input' as const,
          },
          {
            header: 'Entity Extraction',
            label: 'EXTRACT',
            metrics: ['44s', '20 triples'],
            type: 'process' as const,
          },
          {
            header: 'Vector Embeddings',
            label: 'EMBED',
            metrics: ['inline', '80 vectors'],
            type: 'process' as const,
          },
          {
            header: 'Knowledge Storage',
            label: 'STORE',
            metrics: ['inline', '20 stored'],
            type: 'storage' as const,
          },
          {
            header: 'Concept Generation',
            label: 'CONCEPTS',
            metrics: ['47s', '0 concepts'],
            type: 'output' as const,
          },
        ]

        return (
          <SimplePipeline
            stages={stages}
            title={data.title}
            description={data.description}
            summary={['Total: 94s', 'Cost: $0.0012', 'Output: 20 triples, 80 vectors']}
            className={className}
          />
        )
      }
      if (!hasCoordinates(data)) {
        return (
          <SimplePipeline
            stages={toPipelineStages(data.nodes)}
            title={data.title}
            description={data.description}
            className={className}
          />
        )
      }
      return <PipelineFlowDiagram data={data} className={className} />

    case 'sequence':
      // TODO: Implement SequenceDiagram
      return (
        <div
          className={`p-8 bg-gray-900/30 border-2 border-dashed border-gray-700 rounded-lg text-center ${className}`}
        >
          <p className="text-gray-500">Sequence Diagram Coming Soon</p>
        </div>
      )

    case 'component':
      // TODO: Implement ComponentDiagram
      return (
        <div
          className={`p-8 bg-gray-900/30 border-2 border-dashed border-gray-700 rounded-lg text-center ${className}`}
        >
          <p className="text-gray-500">Component Diagram Coming Soon</p>
        </div>
      )

    case 'state-flow':
      // TODO: Implement StateFlowDiagram
      return (
        <div
          className={`p-8 bg-gray-900/30 border-2 border-dashed border-gray-700 rounded-lg text-center ${className}`}
        >
          <p className="text-gray-500">State Flow Diagram Coming Soon</p>
        </div>
      )

    case 'flowchart':
      // TODO: Implement FlowchartDiagram
      return (
        <div
          className={`p-8 bg-gray-900/30 border-2 border-dashed border-gray-700 rounded-lg text-center ${className}`}
        >
          <p className="text-gray-500">Flowchart Diagram Coming Soon</p>
        </div>
      )

    case 'agent-architecture':
      // TODO: Implement AgentArchitectureDiagram
      return (
        <div
          className={`p-8 bg-gray-900/30 border-2 border-dashed border-gray-700 rounded-lg text-center ${className}`}
        >
          <p className="text-gray-500">Agent Architecture Diagram Coming Soon</p>
        </div>
      )

    default:
      return null
  }
}
