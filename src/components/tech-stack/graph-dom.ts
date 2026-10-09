import * as d3 from 'd3'
import {
  describeNode,
  type GraphData,
  type GraphLink,
  type GraphNode,
  getLinkEndId,
  nodeColor,
} from '~/components/tech-stack/graph-data'
import {
  type GraphDims,
  labelBgOffset,
  labelDy,
  labelFontSize,
  MARGIN,
  nodeRadius,
} from '~/components/tech-stack/layout'

type LayerSelection<E extends d3.BaseType, D> = d3.Selection<E, D, SVGGElement, unknown>
type RootSelection = d3.Selection<SVGGElement, unknown, null, undefined>

interface LabelSize {
  width: number
  height: number
}

export interface GraphSelections {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
  links: LayerSelection<SVGLineElement, GraphLink>
  circles: LayerSelection<SVGCircleElement, GraphNode>
  labels: LayerSelection<SVGTextElement, GraphNode>
  labelBgs: LayerSelection<SVGRectElement, GraphNode>
  labelSizes: Map<string, LabelSize>
}

const DEFAULT_STROKE = '#ffffff'
const SELECTED_STROKE = '#22d3ee'

// Tailwind classes: the visible focus ring is a thicker yellow stroke, only for keyboard focus.
const NODE_CLASS =
  'tech-node cursor-pointer outline-none focus-visible:stroke-yellow-300 focus-visible:[stroke-width:4px]'

const appendLinks = (root: RootSelection, links: GraphLink[]): GraphSelections['links'] =>
  root
    .append('g')
    .attr('aria-hidden', 'true')
    .selectAll<SVGLineElement, GraphLink>('line')
    .data(links)
    .join('line')
    .attr('stroke', '#374151')
    .attr('stroke-opacity', 0.3)
    .attr('stroke-width', link => Math.sqrt(link.strength) * 2)

const appendCircles = (root: RootSelection, graph: GraphData): GraphSelections['circles'] =>
  root
    .append('g')
    .selectAll<SVGCircleElement, GraphNode>('circle')
    .data(graph.nodes)
    .join('circle')
    .attr('class', NODE_CLASS)
    .attr('data-node-id', node => node.id)
    .attr('r', nodeRadius)
    .attr('fill', nodeColor)
    .attr('stroke', DEFAULT_STROKE)
    .attr('stroke-width', 2)
    .attr('tabindex', 0)
    .attr('role', 'button')
    .attr('aria-pressed', 'false')
    .attr('aria-label', node => describeNode(graph, node))

const appendLabelBgs = (layer: RootSelection, nodes: GraphNode[]): GraphSelections['labelBgs'] =>
  layer
    .selectAll<SVGRectElement, GraphNode>('rect')
    .data(nodes)
    .join('rect')
    .attr('fill', 'rgba(0, 0, 0, 0.7)')
    .attr('stroke', 'rgba(255, 255, 255, 0.1)')
    .attr('stroke-width', 0.5)
    .attr('rx', 3)
    .attr('ry', 3)

const appendLabels = (layer: RootSelection, nodes: GraphNode[]): GraphSelections['labels'] =>
  layer
    .selectAll<SVGTextElement, GraphNode>('text')
    .data(nodes)
    .join('text')
    .text(node => node.name)
    .attr('font-size', labelFontSize)
    .attr('font-family', 'monospace')
    .attr('fill', '#ffffff')
    .attr('text-anchor', 'middle')
    .attr('dy', labelDy)

const measureLabels = (labels: GraphSelections['labels']): Map<string, LabelSize> => {
  const sizes = new Map<string, LabelSize>()
  labels.each((node, index, groups) => {
    const box = groups[index]?.getBBox()
    sizes.set(node.id, { width: box?.width ?? 0, height: box?.height ?? 0 })
  })
  return sizes
}

const sizeOf = (sel: GraphSelections, node: GraphNode): LabelSize =>
  sel.labelSizes.get(node.id) ?? { width: 0, height: 0 }

export const createGraphDom = (svgEl: SVGSVGElement, graph: GraphData): GraphSelections => {
  const svg = d3.select(svgEl)
  svg.selectAll('*').remove()
  const root = svg.append('g').attr('transform', `translate(${MARGIN}, ${MARGIN})`)
  const links = appendLinks(root, graph.links)
  const circles = appendCircles(root, graph)
  const labelLayer = root.append('g').attr('aria-hidden', 'true').style('pointer-events', 'none')
  const labelBgs = appendLabelBgs(labelLayer, graph.nodes)
  const labels = appendLabels(labelLayer, graph.nodes)
  const sel = { svg, links, circles, labels, labelBgs, labelSizes: measureLabels(labels) }
  labelBgs
    .attr('width', node => sizeOf(sel, node).width + 6)
    .attr('height', node => sizeOf(sel, node).height + 4)
  return sel
}

export const applyDims = (sel: GraphSelections, dims: GraphDims): void => {
  sel.svg
    .attr('width', dims.width)
    .attr('height', dims.height)
    .attr('viewBox', `0 0 ${dims.width} ${dims.height}`)
}

const endX = (end: GraphLink['source']): number => (typeof end === 'object' ? (end.x ?? 0) : 0)
const endY = (end: GraphLink['source']): number => (typeof end === 'object' ? (end.y ?? 0) : 0)

export const renderPositions = (sel: GraphSelections): void => {
  sel.links
    .attr('x1', link => endX(link.source))
    .attr('y1', link => endY(link.source))
    .attr('x2', link => endX(link.target))
    .attr('y2', link => endY(link.target))
  sel.circles.attr('cx', node => node.x ?? 0).attr('cy', node => node.y ?? 0)
  sel.labels.attr('x', node => node.x ?? 0).attr('y', node => node.y ?? 0)
  sel.labelBgs
    .attr('x', node => (node.x ?? 0) - sizeOf(sel, node).width / 2 - 3)
    .attr('y', node => (node.y ?? 0) + labelBgOffset(node) - sizeOf(sel, node).height / 2 - 2)
}

const nodeOpacity =
  (adjacency: GraphData['adjacency'], activeId: string | null) =>
  (node: GraphNode): number => {
    if (!activeId || node.id === activeId) return 1
    return adjacency.get(activeId)?.has(node.id) ? 1 : 0.4
  }

const linkOpacity =
  (activeId: string | null) =>
  (link: GraphLink): number => {
    if (!activeId) return 0.3
    const touches = getLinkEndId(link.source) === activeId || getLinkEndId(link.target) === activeId
    return touches ? 0.8 : 0.15
  }

/** Selection and hover only touch attributes/styles; positions and elements stay as they are. */
export const applyHighlight = (
  sel: GraphSelections,
  adjacency: GraphData['adjacency'],
  activeId: string | null,
  selectedId: string | null,
): void => {
  const opacity = nodeOpacity(adjacency, activeId)
  sel.circles
    .style('opacity', opacity)
    .attr('aria-pressed', node => String(node.id === selectedId))
    .attr('stroke', node => (node.id === selectedId ? SELECTED_STROKE : DEFAULT_STROKE))
    .attr('stroke-width', node => (node.id === selectedId ? 3 : 2))
  sel.labels.style('opacity', opacity)
  sel.labelBgs.style('opacity', opacity)
  sel.links.style('opacity', linkOpacity(activeId))
}
