import Image from 'next/image';
import type React from 'react';

interface ChatCharacterIconProps {
  speaker: 'hammond' | 'claude';
}

export default function ChatCharacterIcon({ speaker }: ChatCharacterIconProps): React.ReactElement {
  const isHammond = speaker === 'hammond';
  const imageSrc = isHammond
    ? '/images/workflow/john-hammond.png'
    : '/images/workflow/mr-dna.webp';
  const altText = isHammond ? 'John Hammond' : 'Mr. DNA';

  return (
    <div
      className="absolute left-0 -top-4 bottom-0 -translate-x-full pr-8 hidden lg:block"
      aria-hidden="true"
    >
      <div className=" w-12 h-12 rounded-full overflow-hidden relative">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
