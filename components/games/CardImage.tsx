'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  fallback: string;
  alt: string;
  sizes: string;
  priority?: boolean;
};

/**
 * Renders the real gameplay image and quietly falls back to the existing
 * thumbnail if the file is missing, so cards never show a broken image.
 */
export default function CardImage({ src, fallback, alt, sizes, priority }: Props) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      src={failed ? fallback : src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
