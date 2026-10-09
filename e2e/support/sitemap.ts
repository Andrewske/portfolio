import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { type APIRequestContext, expect } from '@playwright/test'

const LOC_PATTERN = /<loc>([^<]+)<\/loc>/g
const PROJECT_PATH = /^\/project\/[^/]+$/

/** `https://host/project/x` -> `/project/x`; the bare origin maps to `/`. */
const toPath = (loc: string): string => new URL(loc.trim()).pathname

export const parseSitemapLocs = (xml: string): string[] =>
  Array.from(xml.matchAll(LOC_PATTERN), match => match[1] ?? '').filter(loc => loc !== '')

/** Every path listed in /sitemap.xml, so tests never hardcode project ids. */
export const fetchSitemapPaths = async (request: APIRequestContext): Promise<string[]> => {
  const response = await request.get('/sitemap.xml')
  expect(response.status(), 'GET /sitemap.xml status').toBe(200)
  return parseSitemapLocs(await response.text()).map(toPath)
}

export const isProjectPath = (path: string): boolean => PROJECT_PATH.test(path)

export const fetchProjectPaths = async (request: APIRequestContext): Promise<string[]> => {
  const paths = (await fetchSitemapPaths(request)).filter(isProjectPath)
  expect(paths.length, 'sitemap should list at least one /project/<id> page').toBeGreaterThan(0)
  return paths
}

interface PrerenderManifest {
  routes: Record<string, unknown>
}

const isPrerenderManifest = (value: unknown): value is PrerenderManifest =>
  typeof value === 'object' &&
  value !== null &&
  'routes' in value &&
  typeof value.routes === 'object' &&
  value.routes !== null

/**
 * Project pages Next actually prerendered (from generateStaticParams), read from the build.
 * An independent source of truth to check the sitemap against.
 */
export const builtProjectPaths = (): string[] => {
  const manifestPath = join(process.cwd(), '.next', 'prerender-manifest.json')
  const parsed: unknown = JSON.parse(readFileSync(manifestPath, 'utf8'))
  if (!isPrerenderManifest(parsed)) {
    throw new Error(`builtProjectPaths: ${manifestPath} has no "routes" object`)
  }
  return Object.keys(parsed.routes).filter(isProjectPath)
}
