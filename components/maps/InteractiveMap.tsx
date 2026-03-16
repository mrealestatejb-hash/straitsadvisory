'use client';

import { useState } from 'react';
import Map, { NavigationControl } from 'react-map-gl/maplibre';
import { MapPin, AlertCircle } from 'lucide-react';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY;

const INITIAL_VIEW = {
  longitude: 103.75,
  latitude: 1.4927,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

export function InteractiveMap() {
  const [viewState, setViewState] = useState(INITIAL_VIEW);

  // Show placeholder if no API key is configured
  if (!MAPTILER_KEY) {
    return (
      <div className="w-full h-full bg-muted flex flex-col items-center justify-center p-8">
        <div className="bg-background rounded-2xl p-8 shadow-lg max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
          <p className="text-muted-foreground mb-4">
            Explore JB districts and find properties near the RTS station.
          </p>
          <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Map requires API key configuration</span>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Add NEXT_PUBLIC_MAPTILER_KEY to .env.local to enable the interactive map.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle={`https://api.maptiler.com/maps/streets-v2-dark/style.json?key=${MAPTILER_KEY}`}
      attributionControl={false}
    >
      <NavigationControl position="top-right" />
    </Map>
  );
}
