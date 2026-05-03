'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { properties } from '@/lib/properties';

interface ListingsMapProps {
  activeCity: 'all' | 'jb' | 'kl' | 'pg';
}

const CITY_VIEWS: Record<string, { center: [number, number]; zoom: number; pitch: number; bearing: number }> = {
  all: { center: [103.72, 1.46], zoom: 6, pitch: 0, bearing: 0 },
  jb: { center: [103.75, 1.49], zoom: 11, pitch: 0, bearing: 0 },
  kl: { center: [101.69, 3.15], zoom: 12, pitch: 0, bearing: 0 },
  pg: { center: [100.34, 5.38], zoom: 11, pitch: 0, bearing: 0 },
};

interface SelectedFeature {
  name: string;
  slug: string;
  loc: string;
  price: string;
  lng: number;
  lat: number;
}

const propertiesGeoJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: properties
    .filter((p) => p.coordinates && p.coordinates[0] !== 0 && p.coordinates[1] !== 0)
    .map((p) => ({
      type: 'Feature' as const,
      geometry: { type: 'Point' as const, coordinates: [p.coordinates[0], p.coordinates[1]] },
      properties: {
        name: p.name,
        slug: p.slug,
        loc: `${p.area}, ${p.district || 'Johor Bahru'}`,
        price: p.priceRange
          ? p.priceRange.split('—')[0].trim()
          : p.price.myr > 0
            ? `From RM${p.price.myr.toLocaleString()}`
            : 'Enquire',
      },
    })),
};

export default function ListingsMap({ activeCity }: ListingsMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [selected, setSelected] = useState<SelectedFeature | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const updatePosition = useCallback((feat: SelectedFeature | null) => {
    if (!feat || !map.current) {
      setPos(null);
      return;
    }
    const { x, y } = map.current.project([feat.lng, feat.lat]);
    setPos({ x, y });
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [103.75, 1.49],
      zoom: 11,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
    });

    mapInstance.addControl(new maplibregl.NavigationControl(), 'top-right');

    mapInstance.on('load', () => {
      mapInstance.addSource('properties', {
        type: 'geojson',
        data: propertiesGeoJSON,
      });

      mapInstance.addLayer({
        id: 'properties-shadow',
        type: 'circle',
        source: 'properties',
        paint: {
          'circle-radius': 10,
          'circle-color': '#000000',
          'circle-opacity': 0.08,
          'circle-blur': 0.6,
          'circle-translate': [0, 1],
        },
      });

      mapInstance.addLayer({
        id: 'properties-pins',
        type: 'circle',
        source: 'properties',
        paint: {
          'circle-radius': 7,
          'circle-color': '#0F172A',
          'circle-stroke-width': 2.5,
          'circle-stroke-color': '#ffffff',
        },
      });

      mapInstance.addLayer({
        id: 'properties-inner',
        type: 'circle',
        source: 'properties',
        paint: {
          'circle-radius': 2,
          'circle-color': '#ffffff',
        },
      });

      mapInstance.on('click', 'properties-pins', (e: maplibregl.MapMouseEvent & { features?: maplibregl.GeoJSONFeature[] }) => {
        if (!e.features || !e.features[0]) return;
        const feat = e.features[0];
        const coords = (feat.geometry as GeoJSON.Point).coordinates.slice() as [number, number];
        const props = feat.properties as { name: string; slug: string; loc: string; price: string };

        const selectedFeat: SelectedFeature = {
          name: props.name,
          slug: props.slug,
          loc: props.loc,
          price: props.price,
          lng: coords[0],
          lat: coords[1],
        };
        setSelected(selectedFeat);
        const { x, y } = mapInstance.project(coords);
        setPos({ x, y });
      });

      mapInstance.on('mouseenter', 'properties-pins', () => {
        mapInstance.getCanvas().style.cursor = 'pointer';
      });
      mapInstance.on('mouseleave', 'properties-pins', () => {
        mapInstance.getCanvas().style.cursor = '';
      });

      // Update popup position whenever the map moves/zooms
      mapInstance.on('move', () => {
        setSelected((current) => {
          if (current) {
            const { x, y } = mapInstance.project([current.lng, current.lat]);
            setPos({ x, y });
          }
          return current;
        });
      });
    });

    map.current = mapInstance;

    return () => {
      mapInstance.remove();
    };
  }, []);

  // Handle city switching
  useEffect(() => {
    if (!map.current) return;

    const view = CITY_VIEWS[activeCity];
    map.current.flyTo({
      center: view.center,
      zoom: view.zoom,
      pitch: view.pitch,
      bearing: view.bearing,
      duration: 1500,
      essential: true,
    });
  }, [activeCity]);

  // Keep position synced if selected changes
  useEffect(() => {
    updatePosition(selected);
  }, [selected, updatePosition]);

  return (
    <div className="relative w-full h-[480px] rounded-2xl overflow-hidden border border-gray-200">
      <div ref={mapContainer} className="w-full h-full" />

      {/* Custom React-rendered popup — fully under our control, anchored via map.project() */}
      {selected && pos && (
        <div
          className="absolute pointer-events-none z-10"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: 'translate(-50%, calc(-100% - 18px))',
          }}
        >
          <div
            className="pointer-events-auto bg-white rounded-xl shadow-xl border border-gray-200"
            style={{ minWidth: 220, fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            <div className="px-4 py-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(null);
                  setPos(null);
                }}
                aria-label="Close"
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="text-[15px] font-bold text-[#243C4C] mb-1 pr-6 leading-tight">{selected.name}</div>
              <div className="text-[12px] text-gray-500 mb-2">{selected.loc}</div>
              <div className="text-[14px] font-bold text-[#243C4C] mb-3">{selected.price}</div>
              <a
                href={`/properties/${selected.slug}`}
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/properties/${selected.slug}`;
                }}
                className="inline-block px-3.5 py-2 rounded-md bg-[#243C4C] text-white text-[12px] font-semibold no-underline hover:bg-[#06457F] transition-colors"
              >
                View Details &rarr;
              </a>
            </div>
            {/* Pointer triangle */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0"
              style={{
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid #ffffff',
                filter: 'drop-shadow(0 1px 0 rgb(229 231 235))',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
