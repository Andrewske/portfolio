import { type RefObject, useEffect, useRef, useState } from 'react'
import type { GraphData } from '~/components/tech-stack/graph-data'
import {
  applyDims,
  applyHighlight,
  createGraphDom,
  type GraphSelections,
  renderPositions,
} from '~/components/tech-stack/graph-dom'
import {
  bindGraphEvents,
  type GraphContext,
  unbindGraphEvents,
} from '~/components/tech-stack/graph-events'
import {
  clampAll,
  computeDims,
  type GraphDims,
  isMeaningfulResize,
  rescalePositions,
  seedPositions,
} from '~/components/tech-stack/layout'
import {
  createSimulation,
  type GraphSimulation,
  INITIAL_TICKS,
  RESIZE_ALPHA,
  RESIZE_TICKS,
  settle,
  updateSimulationDims,
} from '~/components/tech-stack/simulation'

interface ForceGraphOptions {
  graph: GraphData
  /** Available width for the graph, or null to keep it unbuilt (e.g. on small screens). */
  width: number | null
  selectedId: string | null
  onSelect: (id: string | null) => void
  reducedMotion: boolean
}

interface LiveOptions {
  width: number | null
  selectedId: string | null
  onSelect: (id: string | null) => void
  reducedMotion: boolean
}

interface GraphRuntime {
  sel: GraphSelections
  simulation: GraphSimulation
}

/** Places nodes for `dims`, reusing earlier positions (rescaled) when the graph was laid out before. */
const prepareLayout = (
  graph: GraphData,
  dims: GraphDims,
  prev: GraphDims | null,
): GraphSimulation => {
  if (prev) rescalePositions(graph.nodes, prev, dims)
  seedPositions(graph.nodes, dims)
  const simulation = createSimulation(graph, dims)
  if (prev) clampAll(graph.nodes, dims)
  else settle(simulation, dims, INITIAL_TICKS, 1)
  return simulation
}

const relayout = (
  runtime: GraphRuntime,
  prev: GraphDims,
  next: GraphDims,
  reduced: boolean,
): void => {
  rescalePositions(runtime.simulation.nodes(), prev, next)
  applyDims(runtime.sel, next)
  updateSimulationDims(runtime.simulation, next)
  if (!reduced) {
    runtime.simulation.alpha(RESIZE_ALPHA).restart()
    return
  }
  settle(runtime.simulation, next, RESIZE_TICKS, RESIZE_ALPHA)
  renderPositions(runtime.sel)
}

const teardown = (runtime: GraphRuntime): void => {
  runtime.simulation.on('tick', null).stop()
  unbindGraphEvents(runtime.sel)
  runtime.sel.svg.selectAll('*').remove()
}

const useLatest = <T>(value: T): RefObject<T> => {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  })
  return ref
}

export const useForceGraph = (options: ForceGraphOptions): ((el: SVGSVGElement | null) => void) => {
  const { graph, width, selectedId } = options
  const [svgEl, setSvgEl] = useState<SVGSVGElement | null>(null)
  const runtimeRef = useRef<GraphRuntime | null>(null)
  // Last applied dimensions; survives rebuilds so positions can be rescaled instead of re-randomized.
  const dimsRef = useRef<GraphDims | null>(null)
  const live = useLatest<LiveOptions>(options)
  const ready = width !== null

  useEffect(() => {
    // Rebuild only when the svg mounts/unmounts or the graph is enabled/disabled; size changes
    // are handled by the resize effect below without touching the DOM structure.
    const available = live.current.width
    if (!svgEl || !ready || available === null) return
    const runtime = startGraph(svgEl, graph, computeDims(available), dimsRef, live)
    runtimeRef.current = runtime
    return () => {
      teardown(runtime)
      runtimeRef.current = null
    }
  }, [svgEl, ready, graph, live])

  useEffect(() => {
    const runtime = runtimeRef.current
    const prev = dimsRef.current
    if (!runtime || !prev || width === null) return
    const next = computeDims(width)
    if (!isMeaningfulResize(prev, next)) return
    dimsRef.current = next
    relayout(runtime, prev, next, live.current.reducedMotion)
  }, [width, live])

  useEffect(() => {
    const runtime = runtimeRef.current
    if (runtime) applyHighlight(runtime.sel, graph.adjacency, selectedId, selectedId)
  }, [selectedId, graph])

  return setSvgEl
}

const makeContext = (
  runtime: GraphRuntime & { graph: GraphData; dims: GraphDims },
  dimsRef: RefObject<GraphDims | null>,
  live: RefObject<LiveOptions>,
): GraphContext => ({
  graph: runtime.graph,
  sel: runtime.sel,
  simulation: runtime.simulation,
  getSelected: () => live.current.selectedId,
  select: id => live.current.onSelect(id),
  getDims: () => dimsRef.current ?? runtime.dims,
  isReducedMotion: () => live.current.reducedMotion,
})

/** Builds simulation + DOM once; later selection and resize changes only update them. */
const startGraph = (
  svgEl: SVGSVGElement,
  graph: GraphData,
  dims: GraphDims,
  dimsRef: RefObject<GraphDims | null>,
  live: RefObject<LiveOptions>,
): GraphRuntime => {
  const simulation = prepareLayout(graph, dims, dimsRef.current)
  dimsRef.current = dims
  const sel = createGraphDom(svgEl, graph)
  applyDims(sel, dims)
  renderPositions(sel)
  const ctx = makeContext({ graph, dims, sel, simulation }, dimsRef, live)
  bindGraphEvents(ctx)
  simulation.on('tick', () => {
    clampAll(graph.nodes, ctx.getDims())
    renderPositions(sel)
  })
  applyHighlight(sel, graph.adjacency, live.current.selectedId, live.current.selectedId)
  return { sel, simulation }
}
