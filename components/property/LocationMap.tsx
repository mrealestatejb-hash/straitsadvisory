'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Train, Bus, GraduationCap, Hospital, ShoppingBag } from 'lucide-react';

interface LocationMapProps {
  coordinates: [number, number]; // [lng, lat]
  propertyName: string;
  nearbyPOIs?: Array<{
    name: string;
    category: string;
    coordinates: [number, number];
    distance: string;
  }>;
}

const DEFAULT_POIS = [
  { name: 'CIQ / RTS Link Station', category: 'transit', coordinates: [103.7644, 1.4469] as [number, number], distance: '1.0 km' },
  { name: 'JB Sentral', category: 'transit', coordinates: [103.7631, 1.4613] as [number, number], distance: '1.2 km' },
  { name: 'Singapore — Woodlands CIQ', category: 'transit', coordinates: [103.7710, 1.4480] as [number, number], distance: '15 min' },
  { name: 'R&F Mall', category: 'shopping', coordinates: [103.7650, 1.4595] as [number, number], distance: '200m' },
  { name: 'City Square Mall', category: 'shopping', coordinates: [103.7620, 1.4610] as [number, number], distance: '500m' },
  { name: 'KOMTAR JBCC', category: 'shopping', coordinates: [103.7590, 1.4630] as [number, number], distance: '1.0 km' },
  { name: 'KSL City Mall', category: 'shopping', coordinates: [103.7570, 1.4750] as [number, number], distance: '3.5 km' },
  { name: 'Hospital Sultanah Aminah', category: 'hospital', coordinates: [103.7580, 1.4720] as [number, number], distance: '2.5 km' },
  { name: 'KPJ Johor Specialist Hospital', category: 'hospital', coordinates: [103.7520, 1.4750] as [number, number], distance: '3.0 km' },
  { name: 'Foon Yew High School', category: 'school', coordinates: [103.7530, 1.4650] as [number, number], distance: '1.5 km' },
  { name: 'SK Sultan Ibrahim', category: 'school', coordinates: [103.7570, 1.4690] as [number, number], distance: '1.8 km' },
  { name: 'Fairview International School', category: 'school', coordinates: [103.7500, 1.4800] as [number, number], distance: '3.5 km' },
];

const CATEGORY_CONFIG: Record<string, { icon: typeof Train; color: string; label: string }> = {
  transit: { icon: Train, color: '#5289AD', label: 'Transit' },
  bus: { icon: Bus, color: '#5379AE', label: 'Bus' },
  school: { icon: GraduationCap, color: '#D4C4A8', label: 'Schools' },
  hospital: { icon: Hospital, color: '#dc2626', label: 'Healthcare' },
  shopping: { icon: ShoppingBag, color: '#7c3aed', label: 'Shopping' },
};

// Tile style with fallback
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const FALLBACK_STYLE = 'https://demotiles.maplibre.org/style.json';

export function LocationMap({ coordinates, propertyName, nearbyPOIs }: LocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Array<{ marker: any; popup: any; el: HTMLElement; category: string }>>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [mapError, setMapError] = useState(false);

  const pois = useMemo(() => {
    return nearbyPOIs && nearbyPOIs.length > 0 ? nearbyPOIs : DEFAULT_POIS;
  }, [nearbyPOIs]);

  const categories = useMemo(() => [...new Set(pois.map(p => p.category))], [pois]);

  // Initialize map once
  useEffect(() => {
    if (!mapContainer.current) return;

    // Prevent double-init
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    markersRef.current = [];

    let cancelled = false;

    import('maplibre-gl').then((mod) => {
      if (cancelled || !mapContainer.current) return;

      const maplibregl = mod.default;

      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: MAP_STYLE,
        center: coordinates,
        zoom: 14,
        pitch: 45,
        bearing: -15,
        attributionControl: false,
      });

      map.on('error', (e: any) => {
        // If style fails to load, try fallback
        if (e?.error?.message?.includes('Failed to fetch') || e?.error?.status === 0) {
          console.warn('Primary map style failed, trying fallback');
          try {
            map.setStyle(FALLBACK_STYLE);
          } catch {
            setMapError(true);
          }
        }
      });

      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

      map.on('load', () => {
        if (cancelled) return;

        // Property marker (main pin)
        const propEl = document.createElement('div');
        propEl.style.cssText = 'pointer-events:auto;cursor:pointer;';
        propEl.innerHTML = `
          <div style="width:44px;height:44px;border-radius:50%;background:#243C4C;border:3px solid white;
            box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
              <polyline points="9 22 9 12 15 12 15 22" fill="rgba(255,255,255,0.3)" stroke="white" stroke-width="1.5"/>
            </svg>
          </div>`;

        new maplibregl.Marker({ element: propEl, anchor: 'center' })
          .setLngLat(coordinates)
          .addTo(map);

        // POI markers
        pois.forEach(poi => {
          const config = CATEGORY_CONFIG[poi.category] || CATEGORY_CONFIG.transit;

          const el = document.createElement('div');
          el.className = `poi-marker poi-${poi.category}`;
          el.style.cssText = `
            width:26px;height:26px;border-radius:50%;
            background:${config.color};border:2px solid white;
            box-shadow:0 2px 6px rgba(0,0,0,0.2);
            cursor:pointer;display:flex;align-items:center;justify-content:center;
            pointer-events:auto;
          `;
          el.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="3"/></svg>`;

          const popup = new maplibregl.Popup({
            offset: [0, -16],
            closeButton: false,
            closeOnClick: false,
            className: 'sa-popup',
          }).setHTML(
            `<div style="font-family:Inter,system-ui,sans-serif;padding:6px 2px">
              <strong style="font-size:13px;color:#243C4C">${poi.name}</strong><br/>
              <span style="font-size:12px;color:#5379AE">${poi.distance}</span>
            </div>`
          );

          const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
            .setLngLat(poi.coordinates)
            .addTo(map);

          // Hover: show popup at the POI coords (not attached to marker element)
          el.addEventListener('mouseenter', () => {
            popup.setLngLat(poi.coordinates).addTo(map);
            el.style.boxShadow = `0 0 0 3px ${config.color}50, 0 2px 8px rgba(0,0,0,0.3)`;
          });
          el.addEventListener('mouseleave', () => {
            popup.remove();
            el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
          });

          markersRef.current.push({ marker, popup, el, category: poi.category });
        });
      });

      mapRef.current = map;
    }).catch(() => {
      setMapError(true);
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markersRef.current = [];
    };
    // Only re-init if coordinates change (not on every render)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates[0], coordinates[1], propertyName]);

  // Filter POI markers by category using stored refs
  const filterMarkers = useCallback((category: string) => {
    setActiveCategory(category);
    markersRef.current.forEach(({ el, category: cat }) => {
      if (category === 'all' || cat === category) {
        el.style.display = 'flex';
      } else {
        el.style.display = 'none';
      }
    });
  }, []);

  if (mapError) {
    return (
      <div className="py-8 border-b border-border">
        <h2 className="text-xl font-extrabold text-foreground mb-4">Location</h2>
        <div className="aspect-[16/9] rounded-xl bg-[#FAF9F7] flex items-center justify-center text-muted-foreground">
          <p>Map unavailable. The property is located at {propertyName}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-xl font-extrabold text-foreground mb-4">Location</h2>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => filterMarkers('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            activeCategory === 'all'
              ? 'bg-[#243C4C] text-white'
              : 'bg-[#A8C4EC]/15 text-[#5379AE] hover:bg-[#A8C4EC]/25'
          }`}
        >
          All
        </button>
        {categories.map(cat => {
          const config = CATEGORY_CONFIG[cat];
          if (!config) return null;
          const Icon = config.icon;
          return (
            <button
              key={cat}
              onClick={() => filterMarkers(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeCategory === cat
                  ? 'bg-[#243C4C] text-white'
                  : 'bg-[#A8C4EC]/15 text-[#5379AE] hover:bg-[#A8C4EC]/25'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Map container */}
      <div
        ref={mapContainer}
        className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-border"
        style={{ minHeight: 300 }}
      />

      {/* Nearby list */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {pois
          .filter(p => activeCategory === 'all' || p.category === activeCategory)
          .map((poi, i) => {
            const config = CATEGORY_CONFIG[poi.category] || CATEGORY_CONFIG.transit;
            const Icon = config.icon;
            return (
              <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-[#A8C4EC]/10 transition-colors">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${config.color}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color: config.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{poi.name}</p>
                </div>
                <span className="text-xs font-semibold text-[#5289AD] flex-shrink-0">{poi.distance}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
