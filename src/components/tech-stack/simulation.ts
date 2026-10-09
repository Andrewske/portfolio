import * as d3 from 'd3'
import type { GraphData, GraphLink, GraphNode } from '~/components/tech-stack/graph-data'
import { clampAll, collideRadius, type GraphDims } from '~/components/tech-stack/layout'

export type GraphSimulation = d3.Simulation<GraphNode, GraphLink>

export const INITIAL_TICKS = 300
export const RESIZE_TICKS = 80
export const RESIZE_ALPHA = 0.3

const centerForce = (dims: GraphDims): d3.ForceX<GraphNode> =>
  d3.forceX<GraphNode>(dims.innerWidth / 2).strength(0.03)

/** Builds a stopped simulation; callers decide whether to tick synchronously or animate. */
export const createSimulation = (graph: GraphData, dims: GraphDims): GraphSimulation =>
  d3
    .forceSimulation<GraphNode, GraphLink>(graph.nodes)
    .force(
      'link',
      d3
        .forceLink<GraphNode, GraphLink>(graph.links)
        .id(node => node.id)
        .strength(0.1),
    )
    .force('charge', d3.forceManyBody<GraphNode>().strength(-800))
    .force('x', centerForce(dims))
    .force('collision', d3.forceCollide<GraphNode>().radius(collideRadius).strength(0.9))
    .velocityDecay(0.9)
    .alphaDecay(0.05)
    .alphaMin(0.001)
    .stop()

export const updateSimulationDims = (simulation: GraphSimulation, dims: GraphDims): void => {
  simulation.force('x', centerForce(dims))
}

/** Runs the simulation to rest without animation, keeping nodes inside the bounds each step. */
export const settle = (
  simulation: GraphSimulation,
  dims: GraphDims,
  ticks: number,
  alpha: number,
): void => {
  simulation.stop().alpha(alpha)
  Array.from({ length: ticks }).forEach(() => {
    simulation.tick()
    clampAll(simulation.nodes(), dims)
  })
}
