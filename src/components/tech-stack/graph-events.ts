import * as d3 from 'd3'
import type { GraphData, GraphNode } from '~/components/tech-stack/graph-data'
import {
  applyHighlight,
  type GraphSelections,
  renderPositions,
} from '~/components/tech-stack/graph-dom'
import { clampNode, type GraphDims } from '~/components/tech-stack/layout'
import type { GraphSimulation } from '~/components/tech-stack/simulation'

export interface GraphContext {
  graph: GraphData
  sel: GraphSelections
  simulation: GraphSimulation
  getSelected: () => string | null
  select: (id: string | null) => void
  getDims: () => GraphDims
  isReducedMotion: () => boolean
}

type DragSubject = GraphNode | d3.SubjectPosition
type DragEvent = d3.D3DragEvent<SVGCircleElement, GraphNode, DragSubject>

const DRAG_RELEASE_MS = 500

const highlightWith = (ctx: GraphContext, activeId: string | null): void =>
  applyHighlight(ctx.sel, ctx.graph.adjacency, activeId, ctx.getSelected())

const toggle = (ctx: GraphContext, id: string): void =>
  ctx.select(ctx.getSelected() === id ? null : id)

const preview = (ctx: GraphContext, id: string): void => {
  if (!ctx.getSelected()) highlightWith(ctx, id)
}

const restore = (ctx: GraphContext): void => highlightWith(ctx, ctx.getSelected())

const onNodeKey =
  (ctx: GraphContext) =>
  (event: KeyboardEvent, node: GraphNode): void => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    toggle(ctx, node.id)
  }

const onSvgKey =
  (ctx: GraphContext) =>
  (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && ctx.getSelected()) ctx.select(null)
  }

// The simulation only restarts once the pointer actually moves, so a plain click never
// nudges the other nodes.
const onDragMove = (ctx: GraphContext, event: DragEvent, node: GraphNode): void => {
  node.fx = event.x
  node.fy = event.y
  if (!ctx.isReducedMotion()) {
    ctx.simulation.alphaTarget(0.1).restart()
    return
  }
  node.x = event.x
  node.y = event.y
  clampNode(node, ctx.getDims())
  renderPositions(ctx.sel)
}

const onDragEnd = (ctx: GraphContext, node: GraphNode): void => {
  ctx.simulation.alphaTarget(0)
  setTimeout(() => {
    ctx.simulation.stop()
    node.fx = null
    node.fy = null
  }, DRAG_RELEASE_MS)
}

const createDrag = (ctx: GraphContext): d3.DragBehavior<SVGCircleElement, GraphNode, DragSubject> =>
  d3
    .drag<SVGCircleElement, GraphNode>()
    .on('start', (_event: DragEvent, node) => {
      node.fx = node.x
      node.fy = node.y
    })
    .on('drag', (event: DragEvent, node) => onDragMove(ctx, event, node))
    .on('end', (_event: DragEvent, node) => onDragEnd(ctx, node))

export const bindGraphEvents = (ctx: GraphContext): void => {
  ctx.sel.circles
    .on('click', (event: MouseEvent, node) => {
      event.stopPropagation()
      toggle(ctx, node.id)
    })
    .on('mouseenter focus', (_event: Event, node) => preview(ctx, node.id))
    .on('mouseleave blur', () => restore(ctx))
    .on('keydown', onNodeKey(ctx))
    .call(createDrag(ctx))
  ctx.sel.svg
    .on('click', (event: MouseEvent) => {
      if (event.target === ctx.sel.svg.node()) ctx.select(null)
    })
    .on('keydown', onSvgKey(ctx))
}

export const unbindGraphEvents = (sel: GraphSelections): void => {
  sel.svg.on('click', null).on('keydown', null)
}
