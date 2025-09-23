import * as d3 from 'd3';

export const nodeColors = {
  process: '#06b6d4',    // cyan
  database: '#eab308',   // yellow
  api: '#a855f7',        // purple
  service: '#22d3ee',    // light cyan
  client: '#3b82f6',     // blue
  decision: '#f97316',   // orange
  state: '#10b981',      // green
  agent: '#ec4899',      // pink
};

export const linkColors = {
  flow: '#374151',       // gray-700
  data: '#06b6d4',       // cyan
  dependency: '#a855f7', // purple
  webhook: '#f97316',    // orange
  'api-call': '#3b82f6', // blue
  trigger: '#10b981',    // green
};

export function createArrowMarker(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  id: string,
  color: string
) {
  svg.append('defs')
    .append('marker')
    .attr('id', id)
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 8)
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', color)
    .style('opacity', 0.8);
}

export function wrapText(
  text: d3.Selection<SVGTextElement, any, any, any>,
  width: number
) {
  text.each(function() {
    const textElement = d3.select(this);
    const words = textElement.text().split(/\s+/);
    const lineHeight = 1.1;
    const x = textElement.attr('x');
    const y = textElement.attr('y');
    const dy = parseFloat(textElement.attr('dy')) || 0;

    textElement.text(null);

    let line: string[] = [];
    let lineNumber = 0;
    let tspan = textElement.append('tspan')
      .attr('x', x)
      .attr('y', y)
      .attr('dy', `${dy}em`);

    words.forEach(word => {
      line.push(word);
      tspan.text(line.join(' '));

      if ((tspan.node()?.getComputedTextLength() || 0) > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        tspan = textElement.append('tspan')
          .attr('x', x)
          .attr('y', y)
          .attr('dy', `${++lineNumber * lineHeight + dy}em`)
          .text(word);
      }
    });
  });
}

export function calculateNodeSize(label: string, type: string) {
  const lines = label.split('\n');
  const maxLineLength = Math.max(...lines.map(line => line.length));

  // Much larger sizes for better readability
  const baseWidth = type === 'database' ? 160 : 180;
  const baseHeight = type === 'decision' ? 80 : 70;
  const charWidth = 10; // Wider character spacing
  const lineHeight = 20; // Height per line

  const minWidth = Math.max(baseWidth, maxLineLength * charWidth + 40);
  const minHeight = Math.max(baseHeight, lines.length * lineHeight + 30);

  return { width: minWidth, height: minHeight };
}

export function createGradient(
  defs: d3.Selection<SVGDefsElement, unknown, null, undefined>,
  id: string,
  startColor: string,
  endColor: string,
  direction: 'horizontal' | 'vertical' = 'vertical'
) {
  const gradient = defs.append('linearGradient')
    .attr('id', id)
    .attr('x1', direction === 'horizontal' ? '0%' : '0%')
    .attr('y1', direction === 'horizontal' ? '0%' : '0%')
    .attr('x2', direction === 'horizontal' ? '100%' : '0%')
    .attr('y2', direction === 'horizontal' ? '0%' : '100%');

  gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', startColor)
    .attr('stop-opacity', 0.1);

  gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', endColor)
    .attr('stop-opacity', 0.3);

  return gradient;
}

export function addZoomBehavior(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  container: d3.Selection<SVGGElement, unknown, null, undefined>,
  width: number,
  height: number
) {
  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.5, 3])
    .on('zoom', (event) => {
      container.attr('transform', event.transform.toString());
    });

  svg.call(zoom);

  // Add zoom controls
  const controls = svg.append('g')
    .attr('class', 'zoom-controls')
    .attr('transform', `translate(${width - 60}, 20)`);

  // Zoom in button
  controls.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 24)
    .attr('height', 24)
    .attr('rx', 4)
    .attr('fill', '#1f2937')
    .attr('stroke', '#374151')
    .attr('cursor', 'pointer')
    .on('click', () => {
      svg.transition().call(zoom.scaleBy, 1.3);
    });

  controls.append('text')
    .attr('x', 12)
    .attr('y', 12)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('fill', '#9ca3af')
    .attr('font-size', '16px')
    .attr('pointer-events', 'none')
    .text('+');

  // Zoom out button
  controls.append('rect')
    .attr('x', 30)
    .attr('y', 0)
    .attr('width', 24)
    .attr('height', 24)
    .attr('rx', 4)
    .attr('fill', '#1f2937')
    .attr('stroke', '#374151')
    .attr('cursor', 'pointer')
    .on('click', () => {
      svg.transition().call(zoom.scaleBy, 0.7);
    });

  controls.append('text')
    .attr('x', 42)
    .attr('y', 12)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('fill', '#9ca3af')
    .attr('font-size', '16px')
    .attr('pointer-events', 'none')
    .text('−');

  // Reset button
  controls.append('rect')
    .attr('x', 0)
    .attr('y', 30)
    .attr('width', 54)
    .attr('height', 24)
    .attr('rx', 4)
    .attr('fill', '#1f2937')
    .attr('stroke', '#374151')
    .attr('cursor', 'pointer')
    .on('click', () => {
      svg.transition().call(zoom.transform, d3.zoomIdentity);
    });

  controls.append('text')
    .attr('x', 27)
    .attr('y', 42)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('fill', '#9ca3af')
    .attr('font-size', '10px')
    .attr('pointer-events', 'none')
    .text('RESET');

  return zoom;
}