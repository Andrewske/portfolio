import type { ConsoleMessage, Page } from '@playwright/test'

// Vercel Analytics only exists on Vercel; locally its script and beacons 404.
const IGNORED_URL_PARTS: readonly string[] = ['/_vercel/insights/']

const isIgnored = (message: ConsoleMessage): boolean => {
  const source = `${message.location().url} ${message.text()}`
  return IGNORED_URL_PARTS.some(part => source.includes(part))
}

const describe = (message: ConsoleMessage): string => {
  const { url, lineNumber } = message.location()
  return `${message.text()} (at ${url || 'unknown'}:${lineNumber})`
}

/**
 * Starts recording console errors and uncaught page errors.
 * Call before navigating; the returned function reads what was recorded so far.
 */
export const recordConsoleErrors = (page: Page): (() => string[]) => {
  const errors: string[] = []
  page.on('console', message => {
    if (message.type() === 'error' && !isIgnored(message)) errors.push(describe(message))
  })
  page.on('pageerror', error => {
    errors.push(`Uncaught ${error.name}: ${error.message}`)
  })
  return () => [...errors]
}
