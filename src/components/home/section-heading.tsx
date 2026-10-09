import type { JSX } from 'react'

interface SectionHeadingProps {
  id: string
  command: string
  description: string
}

/** Shell-prompt style h2 shared by the homepage sections. `id` labels the section. */
export const SectionHeading = ({ id, command, description }: SectionHeadingProps): JSX.Element => (
  <div className="mb-8 sm:mb-10">
    <h2 id={id} className="text-2xl sm:text-3xl font-bold text-white mb-2">
      <span className="text-green-400">$</span> {command}
    </h2>
    <p className="text-sm sm:text-base text-gray-500">{description}</p>
  </div>
)
