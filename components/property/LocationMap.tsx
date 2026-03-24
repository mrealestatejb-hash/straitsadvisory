'use client';

import { useEffect, useRef, useState } from 'react';
import { Train, Bus, GraduationCap, Hospital, ShoppingBag } from 'lucide-react';
import 'maplibre-gl/dist/maplibre-gl.css';

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

const defaultPOIs = [
  { name: 'CIQ / RTS Link Station', category: 'transit', coordinates: [103.7644, 1.4627] as [number, number], distance: '650m' },
  { name: 'JB Sentral', category: 'transit', coordinates: [103.7630, 1.4612] as [number, number], distance: '1km' },
  { name: 'City Square Mall', category: 'shopping', coordinates: [103.7617, 1.4615] as [number, number], distance: '800m' },
  { name: 'KOMTAR JBCC', category: 'shopping', coordinates: [103.7580, 1.4620] as [number, number], distance: '1.2km' },
  { name: 'R&F Mall', category: 'shopping', coordinates: [103.7652, 1.4580] as [number, number], distance: '300m' },
  { name: 'KPJ Johor Specialist Hospital', category: 'hospital', coordinates: [103.7550, 1.4680] as [number, number], distance: '2km' },
  { name: 'Foon Yew High School', category: 'school', coordinates: [103.7600, 1.4700] as [number, number], distance: '1.5km' },
];

const categoryConfig: Record<string, { icon: typeof Train; color: string; label: string }> = {
  transit: { icon: Train, color: '#5289AD', label: 'Transit' },
  bus: { icon: Bus, color: '#5379AE', label: 'Bus' },
  school: { icon: GraduationCap, color: '#D4C4A8', label: 'Schools' },
  hospital: { icon: Hospital, color: '#dc2626', label: 'Healthcare' },
  shopping: { icon: ShoppingBag, color: '#7c3aed', label: 'Shopping' },
};

export function LocationMap({ coordinates, propertyName, nearbyPOIs }: LocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [mapLoaded, setMapLoaded] = useState(false);

  const pois = nearbyPOIs && nearbyPOIs.length > 0 ? nearbyPOIs : defaultPOIs;
  const categories = [...new Set(pois.map(p => p.category))];

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    import('maplibre-gl').then((maplibregl) => {
      const map = new maplibregl.default.Map({
        container: mapContainer.current!,
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: coordinates,
        zoom: 15,
        pitch: 45,
        bearing: -15,
        attributionControl: false,
      });

      map.addControl(new maplibregl.default.NavigationControl(), 'top-right');

      map.on('load', () => {
        setMapLoaded(true);

        // Property marker (main)
        const propertyEl = document.createElement('div');
        propertyEl.innerHTML = `<div style="width:40px;height:40px;border-radius:50%;background:#243C4C;border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center"><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22" fill="rgba(255,255,255,0.3)" stroke="white" stroke-width="1.5"/></svg></div>`;
        new maplibregl.default.Marker({ element: propertyEl })
          .setLngLat(coordinates)
          .setPopup(new maplibregl.default.Popup({ offset: 25 }).setHTML(
            `<div style="font-family:Inter,sans-serif;padding:4px"><strong style="font-size:14px">${propertyName}</strong></div>`
          ))
          .addTo(map);

        // POI markers
        pois.forEach(poi => {
          const config = categoryConfig[poi.category] || categoryConfig.transit;
          const el = document.createElement('div');
          el.className = `poi-marker poi-${poi.category}`;
          el.style.cssText = `width:28px;height:28px;border-radius:50%;background:${config.color};border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;color:white;transition:transform 0.2s;`;
          el.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/></svg>`;
          el.onmouseenter = () => { el.style.transform = 'scale(1.2)'; };
          el.onmouseleave = () => { el.style.transform = 'scale(1)'; };

          new maplibregl.default.Marker({ element: el })
            .setLngLat(poi.coordinates)
            .setPopup(new maplibregl.default.Popup({ offset: 18 }).setHTML(
              `<div style="font-family:Inter,sans-serif;padding:4px"><strong style="font-size:13px">${poi.name}</strong><br/><span style="font-size:12px;color:#666">${poi.distance}</span></div>`
            ))
            .addTo(map);
        });
      });

      mapRef.current = map;
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [coordinates, propertyName, pois]);

  // Filter POI markers by category
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const markers = document.querySelectorAll('.poi-marker');
    markers.forEach(el => {
      const htmlEl = el as HTMLElement;
      if (activeCategory === 'all') {
        htmlEl.style.display = 'flex';
      } else {
        htmlEl.style.display = htmlEl.classList.contains(`poi-${activeCategory}`) ? 'flex' : 'none';
      }
    });
  }, [activeCategory, mapLoaded]);

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-xl font-extrabold text-foreground mb-4">Location</h2>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            activeCategory === 'all'
              ? 'bg-[#243C4C] text-white'
              : 'bg-[#A8C4EC]/15 text-[#5379AE] hover:bg-[#A8C4EC]/25'
          }`}
        >
          All
        </button>
        {categories.map(cat => {
          const config = categoryConfig[cat];
          if (!config) return null;
          const Icon = config.icon;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

      {/* Map */}
      <div
        ref={mapContainer}
        className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-border"
      />

      {/* Nearby list */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {pois
          .filter(p => activeCategory === 'all' || p.category === activeCategory)
          .map((poi, i) => {
            const config = categoryConfig[poi.category] || categoryConfig.transit;
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
