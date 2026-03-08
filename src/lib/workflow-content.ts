// Discriminated union for content blocks - extend as content types are needed
export type ContentBlock =
  | { type: 'placeholder'; label: string }
  | { type: 'text'; content: string }
  | { type: 'chat'; speaker: 'hammond' | 'claude'; content: string; id?: string }
  | { type: 'kevin'; content: string; whatBreaks?: string; id?: string }
  | { type: 'timeskip'; content: string }
  | { type: 'finding'; severity: 'critical' | 'high' | 'medium' | 'low'; title: string; confidence: number; content: string }
  | { type: 'collapsible'; title: string; content: string }
  | { type: 'phase'; phase: string }
  | { type: 'code'; language: string; content: string; title?: string };

export interface WorkflowPhase {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

export interface WorkflowContent {
  intro: {
    title: string;
    subtitle: string;
    hook?: string;
  };
  phases: WorkflowPhase[];
  outro: {
    blocks: ContentBlock[];
  };
}

export const workflowContent: WorkflowContent = {
  intro: {
    title: "My Claude Code Workflow",
    subtitle: "How I get Claude to write code I trust",
  },
  phases: [
    { id: "discussion", title: "Phase 1: Discussion", blocks: [] },
    { id: "planning", title: "Phase 2: Planning", blocks: [] },
    { id: "handoff", title: "Phase 3: Handoff", blocks: [] },
    { id: "review", title: "Phase 4: Plan Review", blocks: [] },
    { id: "best-idea", title: "Phase 5: Best Idea", blocks: [] },
    { id: "improve", title: "Phase 6: Improve Idea", blocks: [] },
    { id: "implement", title: "Phase 7: Implementation", blocks: [] },
    { id: "code-review", title: "Phase 8: Code Review", blocks: [] },
  ],
  outro: { blocks: [] }
};
