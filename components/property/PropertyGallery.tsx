'use client';

import Image from 'next/image';

interface PropertyGalleryProps {
  images: string[];
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  if (!images || images.length === 0) return null;

  const heroImage = images[0];

  return (
    <div className="relative w-full h-[340px] md:h-[440px] lg:h-[500px] overflow-hidden">
      <Image
        src={heroImage}
        alt="Property"
        fill
        priority
        className="object-cover"
        unoptimized
      />
      {/* Subtle gradient overlay at bottom for text readability */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
}
