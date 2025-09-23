'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { DiagramProps } from './types';
import {
  nodeColors,
  linkColors,
  createArrowMarker,
  calculateNodeSize,
  addZoomBehavior,
  createGradient,
} from './utils';

export function PipelineFlowDiagram({
  data,
  width: providedWidth,
  height: providedHeight,
  className = '',
  interactive = true,
  onNodeClick,
}: DiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1400, height: 800 });

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const aspectRatio = 4.8; // Ultra-wide aspect ratio for new layout
        const newHeight = Math.min(width / aspectRatio, 1200);
        setDimensions({
          width: width,
          height: Math.max(newHeight, 800), // Higher minimum height for taller layout
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate scaled positions for nodes based on viewport
  const scaledData = useMemo(() => {
    if (!data) return null;

    const { width, height } = dimensions;
    const padding = 120; // Increased padding for better edge spacing
    const usableWidth = width - padding * 2;
    const usableHeight = height - padding * 2;

    // Find the bounds of the original positions
    const xExtent = d3.extent(data.nodes, d => d.x || 0) as [number, number];
    const yExtent = d3.extent(data.nodes, d => d.y || 0) as [number, number];

    const xScale = usableWidth / (xExtent[1] - xExtent[0]);
    const yScale = usableHeight / (yExtent[1] - yExtent[0]);
    const scale = Math.min(xScale, yScale, 0.9); // Increased max scaling for better utilization

    // Scale and center the nodes
    const scaledNodes = data.nodes.map(node => ({
      ...node,
      scaledX: padding + (((node.x || 0) - xExtent[0]) * scale),
      scaledY: padding + (((node.y || 0) - yExtent[0]) * scale),
    }));

    return {
      ...data,
      nodes: scaledNodes,
    };
  }, [data, dimensions]);

  useEffect(() => {
    if (!svgRef.current || !scaledData) return;

    const { width, height } = dimensions;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('width', width).attr('height', height);
    svg.attr('viewBox', `0 0 ${width} ${height}`);
    svg.attr('preserveAspectRatio', 'xMidYMid meet');

    // Create defs for gradients and arrows
    const defs = svg.append('defs');

    // Create gradients for node backgrounds
    Object.entries(nodeColors).forEach(([type, color]) => {
      createGradient(defs, `gradient-${type}`, color, color);
    });

    // Create arrow markers for different link types
    Object.entries(linkColors).forEach(([type, color]) => {
      createArrowMarker(svg, `arrow-${type}`, color);
    });

    // Create container for zoom
    const container = svg.append('g');

    // Add zoom behavior if interactive
    if (interactive) {
      addZoomBehavior(svg, container, width, height);
    }

    // Create links
    const linkGroup = container.append('g').attr('class', 'links');

    // Create link paths with curved lines
    const links = linkGroup
      .selectAll('g')
      .data(scaledData.links)
      .enter()
      .append('g');

    // Draw link lines
    const linkPaths = links
      .append('path')
      .attr('d', (d) => {
        const sourceNode = scaledData.nodes.find(n => n.id === d.source);
        const targetNode = scaledData.nodes.find(n => n.id === d.target);
        if (!sourceNode || !targetNode) return '';

        const sx = sourceNode.scaledX || 0;
        const sy = sourceNode.scaledY || 0;
        const tx = targetNode.scaledX || 0;
        const ty = targetNode.scaledY || 0;

        // Calculate control points for curved path
        const dx = tx - sx;
        const dy = ty - sy;

        if (Math.abs(dy) < 20 && Math.abs(dx) > 50) {
          // Horizontal connection - straight line
          return `M ${sx} ${sy} L ${tx} ${ty}`;
        } else if (Math.abs(dx) < 20) {
          // Vertical connection
          const midY = (sy + ty) / 2;
          return `M ${sx} ${sy} C ${sx} ${midY}, ${tx} ${midY}, ${tx} ${ty}`;
        } else {
          // Diagonal connection - slight curve
          const midX = (sx + tx) / 2;
          const midY = (sy + ty) / 2;
          const offsetX = dy * 0.2;
          const offsetY = dx * 0.1;
          return `M ${sx} ${sy} Q ${midX + offsetX} ${midY + offsetY} ${tx} ${ty}`;
        }
      })
      .attr('stroke', (d) => linkColors[d.type || 'flow'] || linkColors.flow)
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6)
      .attr('fill', 'none')
      .attr('marker-end', (d) => `url(#arrow-${d.type || 'flow'})`)
      .style('cursor', interactive ? 'pointer' : 'default');

    // Animate data flow paths
    linkPaths
      .filter(d => d.animated === true)
      .attr('stroke-dasharray', '10 5')
      .append('animate')
      .attr('attributeName', 'stroke-dashoffset')
      .attr('from', '15')
      .attr('to', '0')
      .attr('dur', '2s')
      .attr('repeatCount', 'indefinite');

    // Add link labels with background for readability
    const linkLabels = links
      .append('g')
      .attr('transform', (d) => {
        const sourceNode = scaledData.nodes.find(n => n.id === d.source);
        const targetNode = scaledData.nodes.find(n => n.id === d.target);
        if (!sourceNode || !targetNode) return '';
        const x = ((sourceNode.scaledX || 0) + (targetNode.scaledX || 0)) / 2;
        const y = ((sourceNode.scaledY || 0) + (targetNode.scaledY || 0)) / 2;
        return `translate(${x}, ${y})`;
      });

    // Add background rect for labels
    const labelsWithText = linkLabels.filter((d: any) => d.label && d.label.length > 0);

    labelsWithText
      .append('rect')
      .attr('x', (d: any) => -(d.label?.length || 0) * 4)
      .attr('y', -12)
      .attr('width', (d: any) => (d.label?.length || 0) * 8)
      .attr('height', 20)
      .attr('fill', 'rgba(0, 0, 0, 0.9)')
      .attr('stroke', 'rgba(255, 255, 255, 0.2)')
      .attr('stroke-width', 1)
      .attr('rx', 4);

    labelsWithText
      .append('text')
      .text((d: any) => d.label || '')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-size', '12px') // Larger label text
      .attr('font-weight', '500')
      .attr('fill', '#06b6d4') // Cyan color to match theme
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('pointer-events', 'none');

    // Create nodes
    const nodeGroup = container.append('g').attr('class', 'nodes');

    const nodes = nodeGroup
      .selectAll('g')
      .data(scaledData.nodes)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.scaledX || 0}, ${d.scaledY || 0})`)
      .style('cursor', interactive ? 'pointer' : 'default');

    // Draw node backgrounds
    nodes.each(function(d) {
      const node = d3.select(this);
      const { width: nodeWidth, height: nodeHeight } = calculateNodeSize(d.label, d.type);

      if (d.type === 'database') {
        // Database cylinder shape
        const cylinderGroup = node.append('g');

        // Top ellipse
        cylinderGroup.append('ellipse')
          .attr('cx', 0)
          .attr('cy', -nodeHeight / 2 + 5)
          .attr('rx', nodeWidth / 2)
          .attr('ry', 8)
          .attr('fill', nodeColors[d.type])
          .attr('opacity', 0.9);

        // Body rectangle
        cylinderGroup.append('rect')
          .attr('x', -nodeWidth / 2)
          .attr('y', -nodeHeight / 2 + 5)
          .attr('width', nodeWidth)
          .attr('height', nodeHeight - 10)
          .attr('fill', `url(#gradient-${d.type})`)
          .attr('opacity', 0.9);

        // Bottom ellipse
        cylinderGroup.append('ellipse')
          .attr('cx', 0)
          .attr('cy', nodeHeight / 2 - 5)
          .attr('rx', nodeWidth / 2)
          .attr('ry', 8)
          .attr('fill', nodeColors[d.type])
          .attr('opacity', 0.9);

        // Border
        cylinderGroup.append('ellipse')
          .attr('cx', 0)
          .attr('cy', -nodeHeight / 2 + 5)
          .attr('rx', nodeWidth / 2)
          .attr('ry', 8)
          .attr('fill', 'none')
          .attr('stroke', nodeColors[d.type])
          .attr('stroke-width', 2);

        cylinderGroup.append('ellipse')
          .attr('cx', 0)
          .attr('cy', nodeHeight / 2 - 5)
          .attr('rx', nodeWidth / 2)
          .attr('ry', 8)
          .attr('fill', 'none')
          .attr('stroke', nodeColors[d.type])
          .attr('stroke-width', 2);
      } else if (d.type === 'decision') {
        // Diamond shape for decision
        node.append('path')
          .attr('d', `M 0 ${-nodeHeight/2} L ${nodeWidth/2} 0 L 0 ${nodeHeight/2} L ${-nodeWidth/2} 0 Z`)
          .attr('fill', `url(#gradient-${d.type})`)
          .attr('stroke', nodeColors[d.type])
          .attr('stroke-width', 2);
      } else {
        // Rectangle for other types
        node.append('rect')
          .attr('x', -nodeWidth / 2)
          .attr('y', -nodeHeight / 2)
          .attr('width', nodeWidth)
          .attr('height', nodeHeight)
          .attr('rx', 8)
          .attr('ry', 8)
          .attr('fill', `url(#gradient-${d.type})`)
          .attr('stroke', nodeColors[d.type])
          .attr('stroke-width', 2);
      }
    });

    // Add node labels with much larger, more readable text
    nodes.each(function(d) {
      const node = d3.select(this);
      const lines = d.label.split('\n');
      const lineHeight = 18; // Increased line height
      const startY = -(lines.length - 1) * lineHeight / 2;

      lines.forEach((line, i) => {
        node.append('text')
          .text(line)
          .attr('x', 0)
          .attr('y', startY + (i * lineHeight))
          .attr('font-family', 'JetBrains Mono, monospace')
          .attr('font-size', '14px') // Much larger text
          .attr('font-weight', '600') // Bolder text
          .attr('fill', '#ffffff')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .style('pointer-events', 'none')
          .style('text-shadow', '0 1px 2px rgba(0,0,0,0.8)'); // Add text shadow for better readability
      });
    });

    // Add interactivity
    if (interactive) {
      nodes
        .on('mouseenter', function(event, d) {
          setHoveredNode(d.id);
          d3.select(this).selectAll('rect,ellipse,path').attr('stroke-width', 3);

          // Highlight connected links
          linkPaths
            .attr('stroke-opacity', link =>
              link.source === d.id || link.target === d.id ? 0.9 : 0.2
            )
            .attr('stroke-width', link =>
              link.source === d.id || link.target === d.id ? 3 : 2
            );

          // Highlight connected nodes
          nodes
            .attr('opacity', node => {
              const isConnected = scaledData.links.some(link =>
                (link.source === d.id && link.target === node.id) ||
                (link.target === d.id && link.source === node.id)
              );
              return node.id === d.id || isConnected ? 1 : 0.4;
            });

          // Show labels more prominently
          linkLabels
            .attr('opacity', link =>
              link.source === d.id || link.target === d.id ? 1 : 0.3
            );
        })
        .on('mouseleave', function() {
          setHoveredNode(null);
          d3.select(this).selectAll('rect,ellipse,path').attr('stroke-width', 2);

          // Reset links
          linkPaths.attr('stroke-opacity', 0.6).attr('stroke-width', 2);

          // Reset nodes
          nodes.attr('opacity', 1);

          // Reset labels
          linkLabels.attr('opacity', 1);
        })
        .on('click', function(event, d) {
          setSelectedNode(selectedNode === d.id ? null : d.id);
          if (onNodeClick) {
            onNodeClick(d);
          }
        });
    }

    // Add title and description
    if (scaledData.title || scaledData.description) {
      const titleGroup = svg.append('g')
        .attr('transform', `translate(30, 40)`);

      if (scaledData.title) {
        titleGroup.append('text')
          .text(scaledData.title)
          .attr('font-family', 'JetBrains Mono, monospace')
          .attr('font-size', '20px') // Larger title
          .attr('font-weight', 'bold')
          .attr('fill', '#06b6d4');
      }

      if (scaledData.description) {
        titleGroup.append('text')
          .text(scaledData.description)
          .attr('y', 25)
          .attr('font-family', 'JetBrains Mono, monospace')
          .attr('font-size', '14px') // Larger description
          .attr('fill', '#9ca3af');
      }
    }

  }, [scaledData, dimensions, interactive, onNodeClick, selectedNode]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <svg
          ref={svgRef}
          className="bg-gray-900/30 rounded-lg border border-gray-800"
          style={{ minWidth: '1200px', display: 'block' }} // Ensure minimum width for ultra-wide layouts
        />
      </div>

      {hoveredNode && (
        <div className="absolute top-4 right-4 p-3 bg-gray-900/95 border border-cyan-500/30 rounded-lg text-sm max-w-xs">
          <div className="text-cyan-400 font-mono mb-1">Node: {hoveredNode}</div>
          <div className="text-gray-400 text-xs">Click for details</div>
        </div>
      )}
    </div>
  );
}