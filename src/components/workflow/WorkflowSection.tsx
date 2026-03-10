import type { ReactNode } from 'react'

interface WorkflowSectionProps {
  id: string
  title: string
  children: ReactNode
}

export default function WorkflowSection({ id, title, children }: WorkflowSectionProps) {
  return (
    <section id={id} className="border border-green-500/20 rounded-lg bg-black/50 backdrop-blur-sm">
      {/* Terminal-style header */}
      <div className="flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-green-500/20">
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 sm:ml-4 text-gray-500 text-xs sm:text-sm">{title}</span>
      </div>

      {/* Content area - children control layout */}
      <div>{children}</div>
    </section>
  )
}
