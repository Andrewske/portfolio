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
    <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0">
      <Image
        src={imageSrc}
        alt={altText}
        fill
        className="object-cover"
      />
    </div>
  );
}
