import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'

export default function FeaturedPost() {
  return (
    <Card className="border-green-500/30 bg-gradient-to-r from-green-500/5 to-emerald-500/5 backdrop-blur-sm overflow-hidden">
      <a href="/my-claude-code-workflow" className="block group">
        <div className="flex flex-col sm:flex-row">
          {/* Hero Image - 30% on desktop, full width on mobile */}
          <div className="relative w-full sm:w-[30%] aspect-[16/9] sm:aspect-auto sm:min-h-[180px] overflow-hidden flex-shrink-0">
            <img
              src="/assets/workflow/trex-banner.webp"
              alt="My Claude Code Workflow"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center">
            <div className="mb-2">
              <Badge
                variant="default"
                className="bg-green-500/20 text-green-300 border-green-500/30"
              >
                New Post
              </Badge>
            </div>
            <h3 className="text-green-400 font-bold text-lg sm:text-xl mb-2 flex items-center gap-2">
              <span className="text-gray-500">{'//'}</span> My Claude Code Workflow
            </h3>
            <p className="text-gray-400 text-sm sm:text-base mb-4">
              Seven phases from idea to shipped code. Discuss → Plan → Review → Best-idea →
              Improve → Implement → Code-review. With dinosaurs.
            </p>
            <div>
              <Button variant="terminal" className="text-sm">
                Read the Post →
              </Button>
            </div>
          </div>
        </div>
      </a>
    </Card>
  )
}
