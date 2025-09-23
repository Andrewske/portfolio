# Pipeline Flow Diagram - Design Brief

## Overview
This design brief outlines the requirements for a beautiful, responsive, and interactive knowledge graph processing pipeline diagram to replace the current D3.js implementation.

## Current Issues
- Complex D3.js implementation with 545+ lines of code and 22 linting issues
- Poor mobile responsiveness
- Inconsistent typography and spacing
- Overly complex zoom/pan interactions
- Accessibility concerns
- Heavy dependencies and performance issues

## Design Requirements

### Visual Style
- **Theme**: Dark mode with terminal/coding aesthetic
- **Primary Colors**:
  - Cyan (#06b6d4) for highlights and interactive elements
  - Soft whites/grays for text
  - Dark grays for backgrounds
- **Typography**: JetBrains Mono (monospace) for consistency with portfolio
- **Node Styling**: Rounded rectangles with subtle gradients and borders
- **Connection Lines**: Smooth curves with directional arrows

### Layout & Structure
```
[Input] → [Stage 1: Knowledge Extraction] → [Queue] → [Stage 2: Concepts] → [Queue] → [Stage 3: Dedup] → [Storage]
                           ↓
           [4 Parallel Extractors in vertical stack]
                           ↓
                    [Monitoring System]
```

### Node Types & Visual Treatment
1. **Client/Input**: Light blue rounded rectangle
2. **Process**: Cyan rounded rectangle with subtle glow
3. **Service**: Yellow/amber rounded rectangle
4. **Database**: Cylinder shape in green
5. **API/Queue**: Purple hexagon or diamond
6. **Monitoring**: Orange circle or badge

### Responsive Behavior
- **Desktop (1200px+)**: Full horizontal layout
- **Tablet (768-1199px)**: Slightly compressed, maintain readability
- **Mobile (< 768px)**: Vertical stacked layout or horizontal scroll with larger touch targets

### Interactive Features
- **Hover Effects**: Highlight connected nodes and paths
- **Click Actions**: Show detailed node information in tooltip/modal
- **Zoom Controls**: Simple +/- buttons and reset
- **Performance Metrics**: Display real-time data (94s processing, $0.0012 cost, etc.)

## Technical Specifications

### Data Structure
```typescript
interface DiagramNode {
  id: string;
  label: string;
  type: 'process' | 'database' | 'api' | 'service' | 'client';
  x?: number;
  y?: number;
  metadata?: {
    cost?: string;
    time?: string;
    description?: string;
  };
}

interface DiagramLink {
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  type?: 'flow' | 'data' | 'trigger';
}
```

### Animation Requirements
- Smooth transitions between states (300ms ease-in-out)
- Animated data flow indicators on key paths
- Subtle pulse effects on active processes
- Entrance animations when diagram loads

### Accessibility
- Keyboard navigation support
- Screen reader friendly labels
- High contrast mode compatibility
- Focus indicators for interactive elements

## Implementation Approach

### Option 1: Modern CSS + SVG
- Pure CSS animations and transitions
- SVG for node shapes and connections
- CSS Grid/Flexbox for responsive layout
- Minimal JavaScript for interactions

### Option 2: React + Framer Motion
- Component-based architecture
- Smooth animations with Framer Motion
- Built-in responsive utilities
- Better maintainability

### Option 3: Canvas-based Solution
- HTML5 Canvas for performance
- Custom drawing functions
- Smooth zoom/pan interactions
- Higher complexity but better performance

## Content & Labels

### Node Labels
- **Input**: "Document\nInput"
- **Stage 1**: "Knowledge\nExtraction"
- **Extractors**: "Entity-Entity", "Entity-Event", "Event-Event", "Emotional Context"
- **Queue**: "QStash\nQueue"
- **Stage 2**: "Concept\nGeneration"
- **Stage 3**: "Deduplication"
- **Storage**: "Knowledge\nGraph Store"
- **MCP**: "MCP Server\n(HTTP/STDIO)"

### Connection Labels
- "Promise.allSettled" (Stage 1 to extractors)
- "20 triples" (data flow indicators)
- "80 vectors" (processing metrics)
- "$0.0012/doc" (cost metrics)

### Performance Overlay
- Processing Time: 94.4s
- Cost per Document: $0.0012
- Output: 20 triples, 80 vectors
- Model: GPT-4o-mini

## Success Metrics
- Load time < 2 seconds
- Smooth 60fps animations
- Zero accessibility violations
- Mobile touch targets ≥ 44px
- Code reduction from 545+ to < 200 lines
- Zero linting errors

## Deliverables
1. Interactive prototype/mockup
2. Responsive design system
3. Component architecture plan
4. Animation specification
5. Accessibility audit checklist

## Timeline
- Design mockups: 2-3 days
- Implementation: 3-5 days
- Testing & refinement: 1-2 days
- Total: 1-2 weeks

This design brief provides a comprehensive foundation for creating a modern, maintainable, and beautiful pipeline diagram that showcases the technical sophistication of the knowledge graph processing system while remaining accessible and performant across all devices.