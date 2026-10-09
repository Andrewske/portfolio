import type { GraphNode } from '~/components/tech-stack/graph-data'

export interface GraphDims {
  width: number
  height: number
  innerWidth: number
  innerHeight: number
}

const MAX_WIDTH = 800
const MIN_HEIGHT = 400
const MAX_HEIGHT = 600
const RESIZE_THRESHOLD = 8

export const MARGIN = 20

const PADDING = { horizontal: 35, top: 20, bottom: 35 }

export const computeDims = (availableWidth: number): GraphDims => {
  const width = Math.max(Math.min(availableWidth, MAX_WIDTH), 1)
  const height = Math.min(Math.max(width * 0.75, MIN_HEIGHT), MAX_HEIGHT)
  return { width, height, innerWidth: width - MARGIN * 2, innerHeight: height - MARGIN * 2 }
}

export const isMeaningfulResize = (prev: GraphDims, next: GraphDims): boolean =>
  Math.abs(prev.width - next.width) >= RESIZE_THRESHOLD ||
  Math.abs(prev.height - next.height) >= RESIZE_THRESHOLD

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value))

// Monospace glyphs are ~0.6em wide; keep the whole label inside the svg, not just the circle.
const horizontalPadding = (node: GraphNode): number => {
  const charWidth = node.type === 'project' ? 6 : 4.8
  return Math.max(PADDING.horizontal, (node.name.length * charWidth) / 2 + 4)
}

// d3-force works by mutating node objects in place, so the position helpers below do too.
export const clampNode = (node: GraphNode, dims: GraphDims): void => {
  const padX = horizontalPadding(node)
  node.x = clamp(node.x ?? 0, padX, dims.innerWidth - padX)
  node.y = clamp(node.y ?? 0, PADDING.top, dims.innerHeight - PADDING.bottom)
}

export const clampAll = (nodes: readonly GraphNode[], dims: GraphDims): void => {
  nodes.forEach(node => {
    clampNode(node, dims)
  })
}

/** Spread nodes that have no position yet across the full rectangle (fills vertical space). */
export const seedPositions = (nodes: readonly GraphNode[], dims: GraphDims): void => {
  const spanX = Math.max(dims.innerWidth - 160, 1)
  const spanY = Math.max(dims.innerHeight - 90, 1)
  nodes
    .filter(node => node.x === undefined || node.y === undefined)
    .forEach(node => {
      node.x = MARGIN + 40 + Math.random() * spanX
      node.y = MARGIN + 30 + Math.random() * spanY
    })
}

export const rescalePositions = (
  nodes: readonly GraphNode[],
  from: GraphDims,
  to: GraphDims,
): void => {
  const scaleX = to.innerWidth / from.innerWidth
  const scaleY = to.innerHeight / from.innerHeight
  nodes.forEach(node => {
    if (node.x !== undefined) node.x *= scaleX
    if (node.y !== undefined) node.y *= scaleY
  })
}

export const nodeRadius = (node: GraphNode): number =>
  node.type === 'project' ? 20 : 8 + (node.experience ?? 1) * 3

export const collideRadius = (node: GraphNode): number =>
  Math.max(node.type === 'project' ? 55 : 45, node.name.length * 3)

export const labelFontSize = (node: GraphNode): string => (node.type === 'project' ? '10px' : '8px')

export const labelDy = (node: GraphNode): number => (node.type === 'project' ? 38 : 28)

export const labelBgOffset = (node: GraphNode): number => (node.type === 'project' ? 30 : 20)
