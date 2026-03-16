'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { TourThumbnail } from './TourThumbnail';

interface VirtualTourViewerProps {
  property: {
    name: string;
    tourUrl: string;
    tourProvider: 'matterport' | 'kuula' | 'generic';
    thumbnail: string;
  };
  onClose: () => void;
}

export function VirtualTourViewer({ property, onClose }: VirtualTourViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadTour = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoaded(true);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="bg-background rounded-2xl overflow-hidden shadow-2xl">
      <div className="px-4 py-3 bg-muted flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-lg">360</span>
          </div>
          <div>
            <p className="font-semibold">{property.name}</p>
            <p className="text-xs text-muted-foreground">360° Virtual Tour</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted-foreground/10 rounded-full"
        >
          ✕
        </button>
      </div>

      <div className="relative aspect-video bg-black">
        {!isLoaded ? (
          <TourThumbnail
            thumbnail={property.thumbnail}
            isLoading={isLoading}
            onLoad={loadTour}
          />
        ) : (
          <iframe
            src={property.tourUrl}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; xr-spatial-tracking"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>

      <div className="px-4 py-2 bg-muted/50 flex items-center justify-center gap-2">
        <span className="text-xs text-muted-foreground">
          Presented by Straits Advisory
        </span>
      </div>
    </div>
  );
}
