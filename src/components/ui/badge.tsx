import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        statusLive:
          "border-green-400/30 bg-transparent text-green-400",
        statusProduction:
          "border-green-400/30 bg-transparent text-green-400",
        statusDevelopment:
          "border-yellow-400/30 bg-transparent text-yellow-400",
        techReact:
          "border-transparent bg-blue-500/10 text-blue-400",
        techPython:
          "border-transparent bg-yellow-500/10 text-yellow-400",
        techDatabase:
          "border-transparent bg-green-500/10 text-green-400",
        techTypeScript:
          "border-transparent bg-purple-500/10 text-purple-400",
        techCloud:
          "border-transparent bg-cyan-500/10 text-cyan-400",
        proficiencyExpert:
          "border-transparent bg-green-500/20 text-green-300",
        proficiencyProficient:
          "border-transparent bg-yellow-500/20 text-yellow-300",
        proficiencyFamiliar:
          "border-blue-400/40 bg-transparent text-blue-400",
        categoryLanguages:
          "border-transparent bg-purple-500/15 text-purple-300",
        categoryFrontend:
          "border-transparent bg-blue-500/15 text-blue-300",
        categoryBackend:
          "border-transparent bg-yellow-500/15 text-yellow-300",
        categoryAiMl:
          "border-transparent bg-cyan-500/15 text-cyan-300",
        categoryData:
          "border-transparent bg-green-500/15 text-green-300",
        categoryApis:
          "border-transparent bg-orange-500/15 text-orange-300",
        categoryInfrastructure:
          "border-transparent bg-red-500/15 text-red-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Badge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> &
    VariantProps<typeof badgeVariants> & {
      asChild?: boolean
    }
>(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      ref={ref}
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge, badgeVariants }
