import type * as d3 from 'd3'
import {
  groupSkillsByCategory,
  type ProjectSkill,
  projects,
  type SkillCategory,
} from '~/lib/projects'
import { type Link, type Node, techStackLinks, techStackNodes } from '~/lib/techStack'

export type GraphNode = Node & d3.SimulationNodeDatum

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  strength: number
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
  nodesById: Map<string, GraphNode>
  adjacency: Map<string, Set<string>>
}

export interface NodeDetails {
  node: GraphNode
  connected: GraphNode[]
  allSkills: [SkillCategory, ProjectSkill[]][]
}

export interface SkillListEntry {
  node: GraphNode
  projects: GraphNode[]
}

export interface SkillListGroup {
  category: string
  skills: SkillListEntry[]
}

const FALLBACK_COLOR = '#6b7280'

export const CATEGORY_COLORS: Readonly<Record<string, string>> = {
  project: '#06b6d4',
  Languages: '#a855f7',
  'AI/ML': '#22d3ee',
  Frontend: '#3b82f6',
  Backend: '#eab308',
  'Data & Analytics': '#10b981',
  'APIs & Integrations': '#f97316',
  Infrastructure: '#ef4444',
}

const CATEGORY_ORDER: readonly string[] = [
  'AI/ML',
  'Languages',
  'Frontend',
  'Backend',
  'Data & Analytics',
  'APIs & Integrations',
  'Infrastructure',
]

export const colorFor = (key: string | undefined): string =>
  CATEGORY_COLORS[key ?? ''] ?? FALLBACK_COLOR

export const nodeColor = (node: GraphNode): string =>
  colorFor(node.type === 'project' ? 'project' : node.category)

export const getLinkEndId = (end: string | number | GraphNode): string =>
  typeof end === 'object' ? end.id : String(end)

const linkKey = (link: Link | GraphLink, side: 'source' | 'target'): string => {
  const end = link[side]
  return typeof end === 'object' ? end.id : String(end)
}

const addEdge = (adjacency: Map<string, Set<string>>, from: string, to: string): void => {
  const set = adjacency.get(from) ?? new Set<string>()
  set.add(to)
  adjacency.set(from, set)
}

const buildAdjacency = (links: readonly GraphLink[]): Map<string, Set<string>> => {
  const adjacency = new Map<string, Set<string>>()
  links.forEach(link => {
    const source = getLinkEndId(link.source)
    const target = getLinkEndId(link.target)
    addEdge(adjacency, source, target)
    addEdge(adjacency, target, source)
  })
  return adjacency
}

/** Fresh, component-owned copies so d3's in-place mutation never leaks into module data. */
export const createGraphData = (): GraphData => {
  const nodes: GraphNode[] = techStackNodes.map(node => ({ ...node }))
  const links: GraphLink[] = techStackLinks.map(link => ({
    source: linkKey(link, 'source'),
    target: linkKey(link, 'target'),
    strength: link.strength,
  }))
  return {
    nodes,
    links,
    nodesById: new Map(nodes.map(node => [node.id, node])),
    adjacency: buildAdjacency(links),
  }
}

export const getConnectedNodes = (graph: GraphData, id: string): GraphNode[] =>
  Array.from(graph.adjacency.get(id) ?? [])
    .map(otherId => graph.nodesById.get(otherId))
    .filter((node): node is GraphNode => node !== undefined)

export const getNodeDetails = (graph: GraphData, id: string | null): NodeDetails | null => {
  const node = id ? graph.nodesById.get(id) : undefined
  if (!node) return null
  const project = node.type === 'project' ? projects.find(p => p.id === node.id) : undefined
  return {
    node,
    connected: getConnectedNodes(graph, node.id),
    allSkills: project ? groupSkillsByCategory(project.skills) : [],
  }
}

const pluralize = (count: number, word: string): string =>
  `${count} ${word}${count === 1 ? '' : 's'}`

export const describeNode = (graph: GraphData, node: GraphNode): string => {
  const count = graph.adjacency.get(node.id)?.size ?? 0
  if (node.type === 'project') return `${node.name}, project, uses ${pluralize(count, 'skill')}`
  const years = node.experience ?? 0
  return `${node.name}, ${node.category ?? 'other'} skill, ${pluralize(years, 'year')}, used in ${pluralize(count, 'project')}`
}

const compareSkills = (a: SkillListEntry, b: SkillListEntry): number =>
  (b.node.experience ?? 0) - (a.node.experience ?? 0) || a.node.name.localeCompare(b.node.name)

const categoryRank = (category: string): number => {
  const index = CATEGORY_ORDER.indexOf(category)
  return index === -1 ? CATEGORY_ORDER.length : index
}

export const buildSkillListGroups = (graph: GraphData): SkillListGroup[] => {
  const entries = graph.nodes
    .filter(node => node.type === 'skill')
    .map(node => ({ node, projects: getConnectedNodes(graph, node.id) }))
  const categories = Array.from(new Set(entries.map(entry => entry.node.category ?? 'Other')))
  return categories
    .sort((a, b) => categoryRank(a) - categoryRank(b))
    .map(category => ({
      category,
      skills: entries.filter(e => (e.node.category ?? 'Other') === category).sort(compareSkills),
    }))
}
