'use client'

import { type ReactElement, useEffect, useState } from 'react'
import { CodeBlock } from '~/components/ui/CodeBlock'

interface GitHubEmbedProps {
  url: string
  language?: string
  title?: string
}

// Cache for GitHub content to avoid re-fetching on re-renders
const contentCache = new Map<string, string>()

export function GitHubEmbed({ url, language = 'markdown', title }: GitHubEmbedProps): ReactElement {
  const [content, setContent] = useState<string | null>(contentCache.get(url) ?? null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(!contentCache.has(url))

  // Extract filename from URL for title fallback
  const filename = url.split('/').pop() ?? 'code'

  useEffect(() => {
    // Skip fetch if already cached
    if (contentCache.has(url)) {
      setContent(contentCache.get(url) ?? null)
      setIsLoading(false)
      return
    }

    const fetchContent = async (): Promise<void> => {
      try {
        setIsLoading(true)
        setError(null)

        // Convert GitHub blob URL to raw URL if needed
        const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/')

        const response = await fetch(rawUrl)

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }

        const text = await response.text()
        contentCache.set(url, text)
        setContent(text)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content')
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [url])

  if (isLoading) {
    return (
      <div className="bg-bg-code rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-border-subtle rounded w-3/4 mb-2" />
        <div className="h-4 bg-border-subtle rounded w-1/2 mb-2" />
        <div className="h-4 bg-border-subtle rounded w-2/3" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-bg-code rounded-lg p-4 text-red-400">
        <p className="font-mono text-sm">Failed to load from GitHub</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-primary underline text-sm"
        >
          View on GitHub →
        </a>
      </div>
    )
  }

  return (
    <div className="relative">
      <CodeBlock code={content ?? ''} language={language} title={title ?? filename} />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-2 right-2 text-xs text-text-muted hover:text-green-primary transition-colors font-mono"
      >
        View on GitHub →
      </a>
    </div>
  )
}
