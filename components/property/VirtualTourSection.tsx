'use client';

import { useState } from 'react';
import { Play, Eye, Sparkles } from 'lucide-react';

interface VirtualTourSectionProps {
  tourUrl: string;
  propertyName: string;
  thumbnailUrl?: string;
}

export function VirtualTourSection({ tourUrl, propertyName, thumbnailUrl }: VirtualTourSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function loadTour() {
    setIsLoading(true);
    // Small delay for UX feedback
    setTimeout(() => {
      setIsLoaded(true);
      setIsLoading(false);
    }, 600);
  }

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-xl font-extrabold text-foreground mb-4">360° Virtual Tour</h2>

      <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[#243C4C] to-[#1a2d3a]">
        {!isLoaded ? (
          /* Preview state — tap to load */
          <div className="absolute inset-0">
            {/* Background image or gradient */}
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={`${propertyName} virtual tour preview`}
                className="w-full h-full object-cover opacity-50"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#243C4C] via-[#2c4a5c] to-[#1a2d3a]" />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {isLoading ? (
                /* Loading spinner */
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white animate-spin" />
                  <p className="text-white font-medium">Loading tour...</p>
                </div>
              ) : (
                /* Play button */
                <button
                  onClick={loadTour}
                  className="group flex flex-col items-center gap-4 cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full bg-[#5289AD] flex items-center justify-center shadow-2xl shadow-[#5289AD]/40 group-hover:scale-105 group-active:scale-95 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-lg">Start Virtual Tour</p>
                    <p className="text-white/60 text-sm">Tap to explore in 360°</p>
                  </div>
                </button>
              )}
            </div>

            {/* Data saver notice */}
            {!isLoading && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4C4A8] flex-shrink-0" />
                  <p className="text-xs text-white/70">
                    Tour loads on tap to save data &amp; battery
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Loaded iframe */
          <iframe
            src={tourUrl}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; clipboard-write; gyroscope; xr-spatial-tracking"
            allowFullScreen
          />
        )}
      </div>

      {/* Branding footer */}
      <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Eye className="w-3.5 h-3.5" />
        <span>Presented by Straits Advisory</span>
      </div>
    </div>
  );
}
