/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Retired project pages: send old links to the homepage instead of a 404
  redirects: async () => [
    { source: '/project/knowledge-graph-mcp', destination: '/', permanent: true },
  ],
}

export default nextConfig
