import { defineConfig, devices } from '@playwright/test'

const PORT = 3100
const BASE_URL = `http://localhost:${PORT}`
const isCI = Boolean(process.env.CI)

// Tests always hit a production server. Set E2E_SKIP_BUILD=1 to reuse an existing `.next`
// build (CI builds once in an earlier step); otherwise the server command builds first.
const START = `bunx next start --port ${PORT}`
const serverCommand = process.env.E2E_SKIP_BUILD ? START : `bun run build && ${START}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,
  reporter: isCI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
    },
  ],
  webServer: {
    command: serverCommand,
    url: BASE_URL,
    reuseExistingServer: !isCI,
    timeout: 300_000,
    env: { NEXT_TELEMETRY_DISABLED: '1' },
  },
})
