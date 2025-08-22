'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  name: string;
  type: 'skill' | 'project';
  category?: string;
  experience?: number;
  group: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
  strength: number;
}

const TechStackVisualization = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Data structure
  const nodes: Node[] = [
    // Projects
    { id: 'knowledge-graph', name: 'Knowledge Graph MCP', type: 'project', group: 1 },
    { id: 'admin-dashboard', name: 'Admin Dashboard', type: 'project', group: 1 },
    { id: 'masakali', name: 'Masakali Payment', type: 'project', group: 1 },
    { id: 'zoho-twilio', name: 'Zoho-Twilio', type: 'project', group: 1 },
    { id: 'multi-agent', name: 'Multi-Agent Notes', type: 'project', group: 1 },

    // AI/ML Skills
    { id: 'llms', name: 'LLMs', type: 'skill', category: 'AI/ML', experience: 2, group: 2 },
    { id: 'mcp', name: 'MCP Protocol', type: 'skill', category: 'AI/ML', experience: 1, group: 2 },
    { id: 'knowledge-graphs', name: 'Knowledge Graphs', type: 'skill', category: 'AI/ML', experience: 1.5, group: 2 },
    { id: 'prompt-eng', name: 'Prompt Engineering', type: 'skill', category: 'AI/ML', experience: 2, group: 2 },

    // Backend Skills
    { id: 'python', name: 'Python', type: 'skill', category: 'Backend', experience: 4, group: 3 },
    { id: 'nodejs', name: 'Node.js', type: 'skill', category: 'Backend', experience: 4, group: 3 },
    { id: 'postgresql', name: 'PostgreSQL', type: 'skill', category: 'Backend', experience: 3, group: 3 },
    { id: 'mongodb', name: 'MongoDB', type: 'skill', category: 'Backend', experience: 2, group: 3 },
    { id: 'prisma', name: 'Prisma', type: 'skill', category: 'Backend', experience: 2, group: 3 },
    { id: 'fastapi', name: 'FastAPI', type: 'skill', category: 'Backend', experience: 2, group: 3 },

    // Frontend Skills
    { id: 'react', name: 'React', type: 'skill', category: 'Frontend', experience: 4, group: 4 },
    { id: 'nextjs', name: 'Next.js', type: 'skill', category: 'Frontend', experience: 3, group: 4 },
    { id: 'typescript', name: 'TypeScript', type: 'skill', category: 'Frontend', experience: 3, group: 4 },
    { id: 'tailwind', name: 'Tailwind CSS', type: 'skill', category: 'Frontend', experience: 3, group: 4 },

    // DevOps Skills
    { id: 'aws', name: 'AWS', type: 'skill', category: 'DevOps', experience: 3, group: 5 },
    { id: 'docker', name: 'Docker', type: 'skill', category: 'DevOps', experience: 2, group: 5 },
    { id: 'vercel', name: 'Vercel', type: 'skill', category: 'DevOps', experience: 3, group: 5 },
  ];

  const links: Link[] = [
    // Knowledge Graph MCP connections
    { source: 'knowledge-graph', target: 'python', strength: 1 },
    { source: 'knowledge-graph', target: 'llms', strength: 1 },
    { source: 'knowledge-graph', target: 'mcp', strength: 1 },
    { source: 'knowledge-graph', target: 'knowledge-graphs', strength: 1 },
    { source: 'knowledge-graph', target: 'fastapi', strength: 0.8 },

    // Admin Dashboard connections
    { source: 'admin-dashboard', target: 'react', strength: 1 },
    { source: 'admin-dashboard', target: 'python', strength: 1 },
    { source: 'admin-dashboard', target: 'postgresql', strength: 1 },
    { source: 'admin-dashboard', target: 'typescript', strength: 1 },
    { source: 'admin-dashboard', target: 'aws', strength: 0.8 },

    // Masakali connections
    { source: 'masakali', target: 'nextjs', strength: 1 },
    { source: 'masakali', target: 'react', strength: 1 },
    { source: 'masakali', target: 'postgresql', strength: 1 },
    { source: 'masakali', target: 'prisma', strength: 1 },
    { source: 'masakali', target: 'typescript', strength: 1 },
    { source: 'masakali', target: 'tailwind', strength: 0.8 },
    { source: 'masakali', target: 'vercel', strength: 0.8 },

    // Zoho-Twilio connections
    { source: 'zoho-twilio', target: 'nextjs', strength: 1 },
    { source: 'zoho-twilio', target: 'postgresql', strength: 1 },
    { source: 'zoho-twilio', target: 'prisma', strength: 1 },
    { source: 'zoho-twilio', target: 'typescript', strength: 1 },
    { source: 'zoho-twilio', target: 'nodejs', strength: 0.8 },

    // Multi-Agent connections
    { source: 'multi-agent', target: 'llms', strength: 1 },
    { source: 'multi-agent', target: 'prompt-eng', strength: 1 },
    { source: 'multi-agent', target: 'knowledge-graphs', strength: 0.8 },
    { source: 'multi-agent', target: 'python', strength: 0.8 },
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    svg.attr('width', width).attr('height', height);

    const container = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Color scales
    const colorScale = d3.scaleOrdinal()
      .domain(['project', 'AI/ML', 'Backend', 'Frontend', 'DevOps'])
      .range(['#06b6d4', '#22d3ee', '#eab308', '#a855f7', '#3b82f6']);

    // Helper function to check if nodes are connected
    const isConnected = (nodeId1: string, nodeId2: string) => {
      return links.some(link => 
        (typeof link.source === 'string' ? link.source : (link.source as Node).id) === nodeId1 && 
        (typeof link.target === 'string' ? link.target : (link.target as Node).id) === nodeId2 ||
        (typeof link.target === 'string' ? link.target : (link.target as Node).id) === nodeId1 && 
        (typeof link.source === 'string' ? link.source : (link.source as Node).id) === nodeId2
      );
    };

    // Initialize nodes with random positions spread across the area
    const centerX = (width - margin.left - margin.right) / 2;
    const centerY = (height - margin.top - margin.bottom) / 2;
    const spreadRadius = Math.min(centerX, centerY) * 0.6; // Use 60% of available space
    
    nodes.forEach((node: any) => {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * spreadRadius;
      node.x = centerX + Math.cos(angle) * radius;
      node.y = centerY + Math.sin(angle) * radius;
    });

    // Create simulation with better spacing and slower movement
    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(links).id((d: any) => d.id).strength((d: any) => d.strength * 0.3))
      .force('charge', d3.forceManyBody().strength(-400)) // Stronger repulsion
      .force('center', d3.forceCenter(centerX, centerY).strength(0.05)) // Weaker center force
      .force('collision', d3.forceCollide().radius((d: any) => {
        // Dynamic collision radius based on node type and label length
        const baseRadius = d.type === 'project' ? 35 : 25;
        const textLength = d.name.length * 3; // Approximate text width
        return Math.max(baseRadius, textLength);
      }))
      .force('x', d3.forceX(centerX).strength(0.02))
      .force('y', d3.forceY(centerY).strength(0.02))
      .velocityDecay(0.7) // Slower movement (default is 0.4, higher = slower)
      .alphaDecay(0.01); // Longer settling time (default is ~0.023, lower = longer)

    // Create links
    const link = container.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', '#374151')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', (d: any) => Math.sqrt(d.strength) * 2);

    // Create nodes
    const node = container.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', (d) => {
        if (d.type === 'project') return 20;
        return 8 + (d.experience || 1) * 3;
      })
      .attr('fill', (d) => {
        if (d.type === 'project') return colorScale('project') as string;
        return colorScale(d.category || '') as string;
      })
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer');

    // Create labels with background for better readability
    const labelGroup = container.append('g');
    
    // Add text backgrounds
    const labelBg = labelGroup
      .selectAll('rect')
      .data(nodes)
      .enter().append('rect')
      .attr('fill', 'rgba(0, 0, 0, 0.7)')
      .attr('stroke', 'rgba(255, 255, 255, 0.1)')
      .attr('stroke-width', 0.5)
      .attr('rx', 3)
      .attr('ry', 3)
      .style('pointer-events', 'none');

    // Add text labels
    const label = labelGroup
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      .text(d => d.name)
      .attr('font-size', (d) => d.type === 'project' ? '11px' : '9px')
      .attr('font-family', 'monospace')
      .attr('fill', '#ffffff')
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => d.type === 'project' ? 38 : 28)
      .style('pointer-events', 'none');

    // Calculate text dimensions and update background rectangles
    label.each(function(d: any) {
      const textNode = this as SVGTextElement;
      const bbox = textNode.getBBox();
      d.textWidth = bbox.width;
      d.textHeight = bbox.height;
    });

    labelBg
      .attr('width', (d: any) => d.textWidth + 6)
      .attr('height', (d: any) => d.textHeight + 4)
      .attr('x', (d: any) => -d.textWidth / 2 - 3)
      .attr('y', (d: any) => {
        const yOffset = d.type === 'project' ? 30 : 20;
        return yOffset - d.textHeight / 2 - 2;
      });

    // Highlight function for hover/selection
    const highlight = (activeNodeId: string | null) => {
      if (!activeNodeId) {
        // Reset to normal state
        node.style('opacity', 1);
        label.style('opacity', 1);
        labelBg.style('opacity', 1);
        link.style('opacity', 0.3);
        return;
      }

      const opacityFunction = (d: any) => {
        if (d.id === activeNodeId) return 1;
        return isConnected(d.id, activeNodeId) ? 1 : 0.4; // Improved visibility for non-selected
      };

      // Update nodes
      node.style('opacity', opacityFunction);

      // Update labels and backgrounds
      label.style('opacity', opacityFunction);
      labelBg.style('opacity', opacityFunction);

      // Update links
      link.style('opacity', (d: any) => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        return (sourceId === activeNodeId || targetId === activeNodeId) ? 0.8 : 0.15; // Slightly more visible
      });
    };

    // Add drag behavior
    const drag = d3.drag<SVGCircleElement, Node>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag);

    // Add event listeners - handle hover purely in D3, no React state
    node
      .on('click', (event, d) => {
        event.stopPropagation();
        const newSelectedNode = selectedNode === d.id ? null : d.id;
        setSelectedNode(newSelectedNode);
        highlight(newSelectedNode);
      })
      .on('mouseenter', (event, d) => {
        if (!selectedNode) { // Only show hover if no node is selected
          highlight(d.id);
        }
      })
      .on('mouseleave', (event, d) => {
        if (!selectedNode) { // Only clear hover if no node is selected
          highlight(null);
        }
      });

    // Click outside to deselect
    svg.on('click', (event) => {
      if (event.target === svg.node()) {
        setSelectedNode(null);
        highlight(null);
      }
    });

    // Apply initial highlight state based on selected node
    highlight(selectedNode);

    // Update positions on simulation tick with bounds checking
    simulation.on('tick', () => {
      // Keep nodes within bounds with extra padding for labels
      nodes.forEach((d: any) => {
        const padding = 50; // Extra padding for text labels
        d.x = Math.max(padding, Math.min(width - margin.left - margin.right - padding, d.x));
        d.y = Math.max(padding, Math.min(height - margin.top - margin.bottom - padding, d.y));
      });

      link
        .attr('x1', (d: any) => (d.source as Node).x!)
        .attr('y1', (d: any) => (d.source as Node).y!)
        .attr('x2', (d: any) => (d.target as Node).x!)
        .attr('y2', (d: any) => (d.target as Node).y!);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      label
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);

      labelBg
        .attr('x', (d: any) => d.x - d.textWidth / 2 - 3)
        .attr('y', (d: any) => {
          const yOffset = d.type === 'project' ? 30 : 20;
          return d.y + yOffset - d.textHeight / 2 - 2;
        });
    });

    // Cleanup
    return () => {
      simulation.stop();
    };

  }, [selectedNode]);

  const getNodeInfo = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return null;

    if (node.type === 'project') {
      const connectedSkills = links
        .filter(link => 
          (typeof link.source === 'string' ? link.source : (link.source as Node).id) === nodeId ||
          (typeof link.target === 'string' ? link.target : (link.target as Node).id) === nodeId
        )
        .map(link => {
          const targetId = (typeof link.source === 'string' ? link.source : (link.source as Node).id) === nodeId 
            ? (typeof link.target === 'string' ? link.target : (link.target as Node).id)
            : (typeof link.source === 'string' ? link.source : (link.source as Node).id);
          return nodes.find(n => n.id === targetId);
        })
        .filter(Boolean);

      return {
        ...node,
        connectedSkills
      };
    } else {
      const connectedProjects = links
        .filter(link => 
          (typeof link.source === 'string' ? link.source : (link.source as Node).id) === nodeId ||
          (typeof link.target === 'string' ? link.target : (link.target as Node).id) === nodeId
        )
        .map(link => {
          const targetId = (typeof link.source === 'string' ? link.source : (link.source as Node).id) === nodeId 
            ? (typeof link.target === 'string' ? link.target : (link.target as Node).id)
            : (typeof link.source === 'string' ? link.source : (link.source as Node).id);
          return nodes.find(n => n.id === targetId);
        })
        .filter(Boolean);

      return {
        ...node,
        connectedProjects
      };
    }
  };

  const selectedNodeInfo = selectedNode ? getNodeInfo(selectedNode) : null;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          <span className="text-green-400">$</span> visualize tech-stack --interactive
        </h2>
        <p className="text-gray-400">Click nodes to explore connections • Drag to rearrange</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/30">
            <svg ref={svgRef} className="w-full max-w-full h-auto"></svg>
          </div>
        </div>

        <div className="lg:w-80">
          <div className="border border-cyan-500/30 rounded-lg p-6 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 min-h-[300px]">
            {selectedNodeInfo ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: selectedNodeInfo.type === 'project' 
                        ? '#06b6d4' 
                        : selectedNodeInfo.category === 'AI/ML' ? '#22d3ee'
                        : selectedNodeInfo.category === 'Backend' ? '#eab308'
                        : selectedNodeInfo.category === 'Frontend' ? '#a855f7'
                        : '#3b82f6'
                    }}
                  />
                  <h3 className="text-xl font-bold text-white">{selectedNodeInfo.name}</h3>
                </div>

                {selectedNodeInfo.type === 'skill' && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-1">Experience</div>
                    <div className="text-cyan-400 font-mono">{selectedNodeInfo.experience} years</div>
                  </div>
                )}

                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">
                    {selectedNodeInfo.type === 'project' ? 'Technologies Used' : 'Used In Projects'}
                  </div>
                  <div className="space-y-1">
                    {(selectedNodeInfo.type === 'project' 
                      ? (selectedNodeInfo as any).connectedSkills 
                      : (selectedNodeInfo as any).connectedProjects
                    )?.map((item: any) => (
                      <div key={item.id} className="text-sm text-gray-300 font-mono">
                        • {item.name}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedNode(null)}
                  className="text-sm text-gray-500 hover:text-gray-300"
                >
                  Close
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-4">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-300 mb-2">Explore the Graph</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Click on any node to see detailed information about projects and technologies.
                </p>
                <p className="text-xs text-gray-500">
                  Hover to highlight connections<br />
                  Drag nodes to rearrange
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {!selectedNode && (
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <span className="text-gray-400">Projects</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-cyan-300"></div>
              <span className="text-gray-400">AI/ML</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span className="text-gray-400">Backend</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <span className="text-gray-400">Frontend</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-gray-400">DevOps</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechStackVisualization;