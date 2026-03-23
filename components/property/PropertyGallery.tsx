'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface PropertyGalleryProps {
  images: string[];
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [];
  if (displayImages.length === 0) return null;

  const mainImage = displayImages[0];
  const smallImages = displayImages.slice(1, 5);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <>
      <div className="grid grid-cols-[2fr_1fr_1fr] grid-rows-[220px_220px] gap-1 relative overflow-hidden cursor-pointer">
        {/* Main image */}
        <div
          className="row-span-2 relative overflow-hidden hover:opacity-90 transition-opacity"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={mainImage}
            alt="Property main"
            fill
            priority
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Small images */}
        {smallImages.map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden hover:opacity-90 transition-opacity"
            onClick={() => openLightbox(i + 1)}
          >
            <Image
              src={img}
              alt={`Property photo ${i + 2}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}

        {/* Fill empty slots with placeholders */}
        {Array.from({ length: Math.max(0, 4 - smallImages.length) }).map((_, i) => (
          <div
            key={`placeholder-${i}`}
            className="bg-muted flex items-center justify-center"
          >
            <Camera className="w-8 h-8 text-muted-foreground/30" />
          </div>
        ))}

        {/* Photo count badge */}
        <button
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 z-5 glass-dark text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 hover:opacity-90 transition-all border-none cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          {displayImages.length} Photos
        </button>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 bg-black border-none">
          <DialogTitle className="sr-only">Photo Gallery</DialogTitle>
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={displayImages[lightboxIndex]}
              alt={`Photo ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              unoptimized
            />

            {/* Nav buttons */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-dark text-white flex items-center justify-center transition-all hover:opacity-90"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-dark text-white flex items-center justify-center transition-all hover:opacity-90"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-1.5 rounded-full text-sm font-medium">
              {lightboxIndex + 1} / {displayImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
