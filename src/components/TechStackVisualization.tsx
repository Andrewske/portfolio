'use client';

import * as d3 from 'd3';
import { useEffect, useMemo, useRef, useState } from 'react';
import {  TooltipProvider,  } from '~/components/ui/tooltip';
import { getCategoryColor, groupSkillsByCategory, projects } from '~/lib/projects';
import { type Node, techStackLinks, techStackNodes } from '~/lib/techStack';


const TechStackVisualization = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [_isInitialized, setIsInitialized] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Data structure - memoized to prevent useEffect re-runs
  const allNodes = useMemo(() => techStackNodes, []);
  const allLinks = useMemo(() => techStackLinks, []);

  // Create mobile-optimized data (skills only, most important ones)
  const mobileNodes = useMemo(() => {
    const skillNodes = allNodes.filter(node => node.type === 'skill');

    // Prioritize AI/ML skills and core technologies for hiring managers
    const getSkillPriority = (skill: any) => {
      // AI/ML skills get highest priority
      if (skill.category === 'AI/ML') return 1000 + (skill.experience || 0);
      // Core languages get high priority
      if (['TypeScript', 'Python', 'JavaScript'].includes(skill.name)) return 900 + (skill.experience || 0);
      // Modern frameworks get good priority
      if (['React', 'Next.js', 'PostgreSQL'].includes(skill.name)) return 800 + (skill.experience || 0);
      // Everything else by experience
      return (skill.experience || 0) * 10;
    };

    const topSkills = skillNodes
      .sort((a, b) => getSkillPriority(b) - getSkillPriority(a))
      .slice(0, 12); // Show only top 12 skills
    return topSkills;
  }, [allNodes]);

  const mobileLinks = useMemo(() => {
    // No links on mobile for cleaner visualization
    return [];
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const containerWidth = svgRef.current.parentElement?.offsetWidth || 800;
    const width = Math.min(containerWidth, 800);
    // Detect mobile (screen width < 640px)
    const isMobile = containerWidth < 640;
    const height = isMobile ? Math.min(containerWidth * 1.2, 500) : Math.min(width * 0.75, 600); // More height on mobile

    // Use different data sets for mobile vs desktop
    const nodes = isMobile ? mobileNodes : allNodes;
    const links = isMobile ? mobileLinks : allLinks;

    const margin = isMobile
      ? { top: 15, right: 15, bottom: 15, left: 15 }
      : { top: 20, right: 20, bottom: 20, left: 20 };

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
    
    nodes.forEach((node: any) => {
      // Use rectangular distribution instead of circular to better fill vertical space
      const maxX = width - margin.left - margin.right - 40;
      const maxY = height - margin.top - margin.bottom - 30;
      node.x = margin.left + 40 + Math.random() * (maxX - 80);
      node.y = margin.top + 30 + Math.random() * (maxY - 60);
    });

    // Create simulation with better spreading
    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('link', links.length > 0 ? d3.forceLink(links).id((d: any) => d.id).strength(0.1) : null) // No links on mobile
      .force('charge', d3.forceManyBody().strength(isMobile ? -200 : -800)) // Much stronger repulsion for better spreading
      .force('x', d3.forceX(centerX).strength(0.03)) // Gentle X centering only - no Y centering to allow full vertical spread
      .force('collision', d3.forceCollide().radius((d: any) => {
        if (isMobile) {
          // Increased collision radius on mobile to force more spreading
          const textLength = d.name.length * 2.5;
          return Math.max(32, textLength);
        } else {
          const baseRadius = d.type === 'project' ? 55 : 45;
          const textLength = d.name.length * 3;
          return Math.max(baseRadius, textLength);
        }
      }).strength(0.9))
      .velocityDecay(0.9) // Much slower movement for stability
      .alphaDecay(0.05) // Faster settling to prevent continuous movement
      .alphaMin(0.001) // Stop simulation sooner
      .stop(); // Don't auto-start - we'll control it

    // Run simulation for initial positioning, then stop - more iterations to settle into full space
    for (let i = 0; i < 500; ++i) simulation.tick();

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
        if (isMobile) {
          // More uniform sizing on mobile, less dramatic experience differences
          return 15 + (d.experience || 1) * 1;
        } else {
          if (d.type === 'project') return 20;
          return 8 + (d.experience || 1) * 3;
        }
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
      .attr('font-size', (d) => {
        if (isMobile) {
          // All text same size on mobile for consistency
          return '10px';
        } else {
          return d.type === 'project' ? '10px' : '8px';
        }
      })
      .attr('font-family', 'monospace')
      .attr('fill', '#ffffff')
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => {
        if (isMobile) {
          // Consistent spacing on mobile
          return 17;
        } else {
          return d.type === 'project' ? 38 : 28;
        }
      })
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
        const yOffset = isMobile
          ? 14
          : (d.type === 'project' ? 30 : 20);
        return yOffset - d.textHeight / 2 - 2;
      });

    // Set initial positions immediately after creating all elements
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

    // Brief settling period for smooth initial render
    simulation.restart().alpha(0.3);
    setTimeout(() => {
      simulation.stop();
      setIsInitialized(true);
    }, 1000);

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
      .on('start', (_event, d) => {
        // Only minimally restart simulation for dragged node
        simulation.alphaTarget(0.1).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (_event, d) => {
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
      .on('mouseenter', (_event, d) => {
        if (!selectedNode) { // Only show hover if no node is selected
          highlight(d.id);
        }
      })
      .on('mouseleave', (_event,_dd) => {
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
      // Keep nodes within bounds accounting for text labels that extend below nodes
      nodes.forEach((d: any) => {
        const horizontalPadding = isMobile ? 20 : 35; // Horizontal padding for text
        const topPadding = isMobile ? 15 : 20; // Top padding
        const bottomPadding = isMobile ? 25 : 35; // Extra bottom padding for text labels

        d.x = Math.max(horizontalPadding, Math.min(width - margin.left - margin.right - horizontalPadding, d.x));
        d.y = Math.max(topPadding, Math.min(height - margin.top - margin.bottom - bottomPadding, d.y));
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
          const yOffset = isMobile
            ? 14
            : (d.type === 'project' ? 30 : 20);
          return d.y + yOffset - d.textHeight / 2 - 2;
        });
    });

    // Cleanup
    return () => {
      simulation.stop();
    };

  }, [selectedNode, allNodes, allLinks, mobileNodes, mobileLinks]);

  const getNodeInfo = (nodeId: string) => {
    // Search in the appropriate dataset based on current view
    const isMobile = (svgRef.current?.parentElement?.offsetWidth || 800) < 640;
    const currentNodes = isMobile ? mobileNodes : allNodes;
    const currentLinks = isMobile ? mobileLinks : allLinks;

    const node = currentNodes.find(n => n.id === nodeId);
    if (!node) return null;

    if (node.type === 'project') {
      // Get connected skills from visualization
      const connectedSkills = currentLinks
        .filter(link =>
          (typeof link.source === 'string' ? link.source : (link.source as Node).id) === nodeId ||
          (typeof link.target === 'string' ? link.target : (link.target as Node).id) === nodeId
        )
        .map(link => {
          const targetId = (typeof link.source === 'string' ? link.source : (link.source as Node).id) === nodeId
            ? (typeof link.target === 'string' ? link.target : (link.target as Node).id)
            : (typeof link.source === 'string' ? link.source : (link.source as Node).id);
          return currentNodes.find(n => n.id === targetId);
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
      // For skills on mobile, show no connections since we removed projects
      const connectedProjects = isMobile ? [] : currentLinks
        .filter(link =>
          (typeof link.source === 'string' ? link.source : (link.source as Node).id) === nodeId ||
          (typeof link.target === 'string' ? link.target : (link.target as Node).id) === nodeId
        )
        .map(link => {
          const targetId = (typeof link.source === 'string' ? link.source : (link.source as Node).id) === nodeId
            ? (typeof link.target === 'string' ? link.target : (link.target as Node).id)
            : (typeof link.source === 'string' ? link.source : (link.source as Node).id);
          return currentNodes.find(n => n.id === targetId);
        })
        .filter(Boolean);

      return {
        ...node,
        connectedProjects
      };
    }
  };

  const selectedNodeInfo = selectedNode ? getNodeInfo(selectedNode) : null;

  // Get container width for mobile detection in JSX
  const containerWidth = svgRef.current?.parentElement?.offsetWidth || 800;

  return (
    <TooltipProvider>
      <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          <span className="text-green-400">$</span> visualize tech-stack --interactive
        </h2>
        <p className="text-gray-400">Click nodes to explore connections • Drag to rearrange</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
        <div className="flex-1 overflow-x-auto">
          <div className="border border-gray-800 rounded-lg p-2 sm:p-4 bg-gray-900/30 min-w-[350px]">
            <svg ref={svgRef} className="w-full max-w-full h-auto" style={{ minHeight: '400px' }}></svg>
          </div>
        </div>

        <div className="w-full lg:w-80">
          <div className="border border-cyan-500/30 rounded-lg p-4 sm:p-6 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 min-h-[250px] sm:min-h-[300px]">
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
                      {selectedNodeInfo.type === 'project' ? 'Technologies Used' : (containerWidth < 640 ? 'Core Technology' : 'Used In Projects')}
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
                        <div className="space-y-3 max-h-40 sm:max-h-60 overflow-y-auto">
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
                        (selectedNodeInfo as any).connectedSkills?.map((skill: any, index: number) => (
                          <div key={`${skill.id}-${index}`} className="text-sm text-gray-300 font-mono">
                            • {skill.name}
                          </div>
                        ))
                      )
                    ) : (
                      // Show connected projects for skill nodes (or category on mobile)
                      containerWidth < 640 ? (
                        <div className="text-sm text-gray-300 font-mono">
                          Category: {selectedNodeInfo.category}<br/>
                          Experience: {selectedNodeInfo.experience} years
                        </div>
                      ) : (
                        (selectedNodeInfo as any).connectedProjects?.map((project: any, index: number) => (
                          <div key={`${project.id}-${index}`} className="text-sm text-gray-300 font-mono">
                            • {project.name}
                          </div>
                        ))
                      )
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