'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import { techStackNodes, techStackLinks, type Node, type Link } from '~/lib/techStack';
import { projects, groupSkillsByCategory, getCategoryColor } from '~/lib/projects';


const TechStackVisualization = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Data structure - memoized to prevent useEffect re-runs
  const nodes = useMemo(() => techStackNodes, []);

  const links = useMemo(() => techStackLinks, []);

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

    // Color scales - matching project card vibrant colors from screenshot
    const colorScale = d3.scaleOrdinal()
      .domain(['project', 'Languages', 'AI/ML', 'Frontend', 'Backend', 'Data & Analytics', 'APIs & Integrations', 'Infrastructure'])
      .range(['#06b6d4', '#a855f7', '#22d3ee', '#3b82f6', '#eab308', '#10b981', '#f97316', '#ef4444']);

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

    // Create simulation with stable, minimal movement
    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(links).id((d: any) => d.id).strength(0.1)) // Much weaker links
      .force('charge', d3.forceManyBody().strength(-300)) // Moderate repulsion
      .force('center', d3.forceCenter(centerX, centerY).strength(0.1)) // Stable centering
      .force('collision', d3.forceCollide().radius((d: any) => {
        // Larger collision radius for better spacing
        const baseRadius = d.type === 'project' ? 45 : 35;
        const textLength = d.name.length * 2.5;
        return Math.max(baseRadius, textLength);
      }))
      .velocityDecay(0.9) // Much slower movement for stability
      .alphaDecay(0.05) // Faster settling to prevent continuous movement
      .alphaMin(0.001) // Stop simulation sooner
      .stop(); // Don't auto-start - we'll control it

    // Run simulation for initial positioning, then stop
    for (let i = 0; i < 300; ++i) simulation.tick();
    simulation.restart().alpha(0.3);

    // Stop simulation after brief settling period
    setTimeout(() => {
      simulation.stop();
    }, 2000);

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

    // Add gentle drag behavior that doesn't disturb other nodes
    const drag = d3.drag<SVGCircleElement, Node>()
      .on('start', (event, d) => {
        // Only minimally restart simulation for dragged node
        simulation.alphaTarget(0.1).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        // Stop simulation quickly after drag ends
        simulation.alphaTarget(0);
        setTimeout(() => {
          simulation.stop();
          d.fx = null;
          d.fy = null;
        }, 500);
      });

    node.call(drag);

    // Add event listeners - handle hover purely in D3, no React state
    node
      .on('click', (event, d) => {
        event.stopPropagation();
        const newSelectedNode = selectedNode === d.id ? null : d.id;
        setSelectedNode(newSelectedNode);
        setShowAllSkills(false); // Reset expansion when selecting new node
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
        setShowAllSkills(false); // Reset expansion on deselect
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

  }, [selectedNode, nodes, links]);

  const getNodeInfo = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return null;

    if (node.type === 'project') {
      // Get connected skills from visualization
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

      // Get ALL skills from the project data for expand functionality
      const project = projects.find(p => p.id === nodeId);
      const allSkills = project ? groupSkillsByCategory(project.skills) : [];

      return {
        ...node,
        connectedSkills,
        allSkills,
        project
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
    <TooltipProvider>
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
                        : selectedNodeInfo.category === 'Languages' ? '#a855f7'
                        : selectedNodeInfo.category === 'AI/ML' ? '#22d3ee'
                        : selectedNodeInfo.category === 'Frontend' ? '#3b82f6'
                        : selectedNodeInfo.category === 'Backend' ? '#eab308'
                        : selectedNodeInfo.category === 'Data & Analytics' ? '#10b981'
                        : selectedNodeInfo.category === 'APIs & Integrations' ? '#f97316'
                        : selectedNodeInfo.category === 'Infrastructure' ? '#ef4444'
                        : '#6b7280'
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
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-400">
                      {selectedNodeInfo.type === 'project' ? 'Technologies Used' : 'Used In Projects'}
                    </div>
                    {selectedNodeInfo.type === 'project' && (selectedNodeInfo as any).allSkills?.length > 0 && (
                      <button
                        onClick={() => setShowAllSkills(!showAllSkills)}
                        className="text-xs text-cyan-400 hover:text-cyan-300"
                      >
                        {showAllSkills ? 'Show Fewer' : 'Show All'}
                      </button>
                    )}
                  </div>

                  <div className="space-y-1">
                    {selectedNodeInfo.type === 'project' ? (
                      showAllSkills ? (
                        // Show all skills grouped by category
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {(selectedNodeInfo as any).allSkills?.map(([category, categorySkills]: [string, any[]]) => (
                            <div key={category} className="space-y-1">
                              <div className={`text-xs font-semibold ${getCategoryColor(category as any)}`}>
                                {category}
                              </div>
                              {categorySkills.map((skill: any) => (
                                <div key={skill.name} className="text-xs text-gray-300 font-mono ml-2 flex items-center gap-2">
                                  <span className={`w-1 h-1 rounded-full ${
                                    skill.proficiency === 'Expert' ? 'bg-green-400' :
                                    skill.proficiency === 'Proficient' ? 'bg-yellow-400' : 'bg-gray-400'
                                  }`}></span>
                                  {skill.name}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Show only connected skills (core skills in visualization)
                        (selectedNodeInfo as any).connectedSkills?.map((skill: any) => (
                          <div key={skill.id} className="text-sm text-gray-300 font-mono">
                            • {skill.name}
                          </div>
                        ))
                      )
                    ) : (
                      // Show connected projects for skill nodes
                      (selectedNodeInfo as any).connectedProjects?.map((project: any) => (
                        <div key={project.id} className="text-sm text-gray-300 font-mono">
                          • {project.name}
                        </div>
                      ))
                    )}
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

      </div>
    </TooltipProvider>
  );
};

export default TechStackVisualization;