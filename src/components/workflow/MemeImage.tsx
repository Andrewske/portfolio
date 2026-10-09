import Image, { type StaticImageData } from 'next/image'
import type React from 'react'

interface MemeImageProps {
  src: StaticImageData
  alt: string
}

export function MemeImage({ src, alt }: MemeImageProps): React.ReactElement {
  return (
    <div className="flex justify-center my-6">
      <div className="relative rounded-lg overflow-hidden border border-gray-800 bg-gray-900/30">
        <Image
          src={src}
          alt={alt}
          sizes="(max-width: 768px) 100vw, 768px"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  )
}

export default MemeImage
