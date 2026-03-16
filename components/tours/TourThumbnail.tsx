'use client';

interface TourThumbnailProps {
  thumbnail: string;
  isLoading: boolean;
  onLoad: () => void;
}

export function TourThumbnail({ thumbnail, isLoading, onLoad }: TourThumbnailProps) {
  return (
    <div className="absolute inset-0">
      <img
        src={thumbnail}
        alt="Tour preview"
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white animate-spin" />
            <p className="text-white font-medium">Loading tour...</p>
          </div>
        ) : (
          <button
            onClick={onLoad}
            className="group flex flex-col items-center gap-4"
          >
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-2xl group-active:scale-95 transition-transform">
              <span className="text-3xl text-primary-foreground ml-1">▶</span>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-lg">
                Start Virtual Tour
              </p>
              <p className="text-white/70 text-sm">Tap to explore in 360°</p>
            </div>
          </button>
        )}
      </div>

      {!isLoading && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Tour loads on tap to save data & battery
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
