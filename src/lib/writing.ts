export interface Post {
  slug: string
  href: string
  title: string
  summary: string
  image: string
  imageAlt: string
  badge?: string
}

/** Posts shown in the homepage Writing section, newest first. */
export const posts: readonly Post[] = [
  {
    slug: 'my-claude-code-workflow',
    href: '/my-claude-code-workflow',
    title: 'My Claude Code Workflow',
    summary:
      'Seven phases from idea to shipped code. Discuss → Plan → Review → Best-idea → Improve → Implement → Code-review. With dinosaurs.',
    image: '/assets/workflow/trex-banner.webp',
    imageAlt: 'My Claude Code Workflow',
    badge: 'New Post',
  },
]
