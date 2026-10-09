import type { JSX } from 'react'
import { Badge } from '~/components/ui/badge'
import { buttonVariants } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import type { Post } from '~/lib/writing'

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps): JSX.Element {
  return (
    <Card className="border-green-500/30 bg-gradient-to-r from-green-500/5 to-emerald-500/5 backdrop-blur-sm overflow-hidden">
      <a href={post.href} className="block group">
        <div className="flex flex-col sm:flex-row">
          {/* Hero Image - 30% on desktop, full width on mobile */}
          <div className="relative w-full sm:w-[30%] aspect-[16/9] sm:aspect-auto sm:min-h-[180px] overflow-hidden flex-shrink-0">
            <img
              src={post.image}
              alt={post.imageAlt}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center">
            {post.badge && (
              <div className="mb-2">
                <Badge
                  variant="default"
                  className="bg-green-500/20 text-green-300 border-green-500/30"
                >
                  {post.badge}
                </Badge>
              </div>
            )}
            <h3 className="text-green-400 font-bold text-lg sm:text-xl mb-2 flex items-center gap-2">
              <span className="text-gray-500">{'//'}</span> {post.title}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base mb-4">{post.summary}</p>
            <div>
              <span className={buttonVariants({ variant: 'terminal', className: 'text-sm' })}>
                Read the Post →
              </span>
            </div>
          </div>
        </div>
      </a>
    </Card>
  )
}
