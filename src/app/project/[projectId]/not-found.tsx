import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="border border-gray-800 rounded-lg p-12 max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 bg-gray-900 flex flex-col items-center py-4 text-gray-600 text-sm rounded">
              <span>4</span>
              <span>0</span>
              <span>4</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            <span className="text-purple-400">class</span>{' '}
            <span className="text-yellow-300">ProjectNotFound</span>:
          </h1>

          <p className="text-xl text-gray-300 mb-6">
            The requested project could not be found in the portfolio.
          </p>

          <div className="p-4 bg-red-900/10 border-l-4 border-red-400/50 rounded mb-8">
            <p className="text-red-300 flex items-center justify-center gap-2">
              <span className="text-red-400 font-bold">⚠</span>
              <span className="font-medium">Error:</span> Invalid project identifier
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-400">
              Available projects: analytics-platform, masakali-booking, zoho-twilio,
              ai-product-optimizer, knowledge-graph-mcp, personal-management
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="terminalGhost" asChild>
                <Link href="/#projects">
                  View All Projects
                </Link>
              </Button>
              <Button variant="terminalGhost" asChild>
                <Link href="/">
                  Back to Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}