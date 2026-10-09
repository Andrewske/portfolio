import { withPostHogConfig } from '@posthog/nextjs-config'

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
}

// POSTHOG_ENV_ID is the legacy name; POSTHOG_PROJECT_ID is preferred.
const posthogProjectId = process.env.POSTHOG_PROJECT_ID || process.env.POSTHOG_ENV_ID
const posthogApiKey = process.env.POSTHOG_PERSONAL_API_KEY

// Source map upload is optional: only wrap when upload credentials exist,
// so local/CI builds without PostHog secrets still succeed.
const withPostHog = config =>
  withPostHogConfig(config, {
    personalApiKey: posthogApiKey,
    projectId: posthogProjectId,
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    sourcemaps: {
      enabled: process.env.NODE_ENV === 'production',
      releaseName: 'portfolio',
      deleteAfterUpload: true,
    },
  })

export default posthogApiKey && posthogProjectId ? withPostHog(nextConfig) : nextConfig
