'use client';

import { useEffect, useRef, useState } from 'react';
import { Train, Bus, GraduationCap, Hospital, ShoppingBag } from 'lucide-react';

interface LocationMapProps {
  coordinates: [number, number];
  propertyName: string;
}

const POIS = [
  { name: 'CIQ / RTS Link Station', cat: 'transit', lng: 103.7644, lat: 1.4469, dist: '1.0 km' },
  { name: 'JB Sentral', cat: 'transit', lng: 103.7631, lat: 1.4613, dist: '1.2 km' },
  { name: 'Woodlands CIQ (Singapore)', cat: 'transit', lng: 103.7710, lat: 1.4480, dist: '15 min' },
  { name: 'R&F Mall', cat: 'shopping', lng: 103.7650, lat: 1.4595, dist: '200m' },
  { name: 'City Square Mall', cat: 'shopping', lng: 103.7620, lat: 1.4610, dist: '500m' },
  { name: 'KOMTAR JBCC', cat: 'shopping', lng: 103.7590, lat: 1.4630, dist: '1.0 km' },
  { name: 'KSL City Mall', cat: 'shopping', lng: 103.7570, lat: 1.4750, dist: '3.5 km' },
  { name: 'Hospital Sultanah Aminah', cat: 'hospital', lng: 103.7580, lat: 1.4720, dist: '2.5 km' },
  { name: 'KPJ Johor Specialist Hospital', cat: 'hospital', lng: 103.7520, lat: 1.4750, dist: '3.0 km' },
  { name: 'Foon Yew High School', cat: 'school', lng: 103.7530, lat: 1.4650, dist: '1.5 km' },
  { name: 'SK Sultan Ibrahim', cat: 'school', lng: 103.7570, lat: 1.4690, dist: '1.8 km' },
  { name: 'Fairview International School', cat: 'school', lng: 103.7500, lat: 1.4800, dist: '3.5 km' },
];

const CAT_CONFIG: Record<string, { icon: typeof Train; color: string; label: string }> = {
  transit: { icon: Train, color: '#5289AD', label: 'Transit' },
  bus: { icon: Bus, color: '#5379AE', label: 'Bus' },
  school: { icon: GraduationCap, color: '#D4C4A8', label: 'Schools' },
  hospital: { icon: Hospital, color: '#dc2626', label: 'Healthcare' },
  shopping: { icon: ShoppingBag, color: '#7c3aed', label: 'Shopping' },
};

export function LocationMap({ coordinates, propertyName }: LocationMapProps) {
  const mapDiv = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [activeCat, setActiveCat] = useState('all');

  const categories = [...new Set(POIS.map(p => p.cat))];

  useEffect(() => {
    if (!mapDiv.current || mapInstance.current) return;

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/maplibre-gl@4.1.2/dist/maplibre-gl.js';
    script.onload = initMap;
    document.head.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/maplibre-gl@4.1.2/dist/maplibre-gl.css';
    document.head.appendChild(link);

    function initMap() {
      if (typeof (window as any).maplibregl === 'undefined') {
        setTimeout(initMap, 200);
        return;
      }
      const ml = (window as any).maplibregl;

      const map = new ml.Map({
        container: mapDiv.current,
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: coordinates,
        zoom: 14,
        pitch: 45,
        attributionControl: false,
      });

      // Property marker — use built-in marker (no custom DOM)
      new ml.Marker({ color: '#243C4C' })
        .setLngLat(coordinates)
        .setPopup(new ml.Popup({ offset: 25 }).setHTML(
          `<strong>${propertyName}</strong>`
        ))
        .addTo(map);

      // POI markers — use built-in colored markers
      POIS.forEach(poi => {
        const config = CAT_CONFIG[poi.cat];
        const marker = new ml.Marker({ color: config?.color || '#5289AD', scale: 0.7 })
          .setLngLat([poi.lng, poi.lat])
          .setPopup(new ml.Popup({ offset: 20 }).setHTML(
            `<strong>${poi.name}</strong><br/><span style="color:#5379AE">${poi.dist}</span>`
          ))
          .addTo(map);

        // Store reference for filtering
        const el = marker.getElement();
        el.dataset.cat = poi.cat;
      });

      map.addControl(new ml.NavigationControl({ showCompass: false }), 'top-right');
      mapInstance.current = map;
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter markers by category
  useEffect(() => {
    if (!mapInstance.current) return;
    const container = mapDiv.current;
    if (!container) return;

    const markers = container.querySelectorAll('.maplibregl-marker');
    markers.forEach((el: Element) => {
      const htmlEl = el as HTMLElement;
      const cat = htmlEl.dataset.cat;
      if (!cat) return; // Property marker — always show
      if (activeCat === 'all' || cat === activeCat) {
        htmlEl.style.display = '';
      } else {
        htmlEl.style.display = 'none';
      }
    });
  }, [activeCat]);

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-xl font-extrabold text-foreground mb-4">Location</h2>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveCat('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            activeCat === 'all'
              ? 'bg-[#243C4C] text-white'
              : 'bg-[#A8C4EC]/15 text-[#5379AE]'
          }`}
        >
          All
        </button>
        {categories.map(cat => {
          const config = CAT_CONFIG[cat];
          if (!config) return null;
          const Icon = config.icon;
          return (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeCat === cat
                  ? 'bg-[#243C4C] text-white'
                  : 'bg-[#A8C4EC]/15 text-[#5379AE]'
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
        ref={mapDiv}
        className="w-full rounded-xl overflow-hidden border border-border"
        style={{ height: 400 }}
      />

      {/* Nearby list */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {POIS
          .filter(p => activeCat === 'all' || p.cat === activeCat)
          .map((poi, i) => {
            const config = CAT_CONFIG[poi.cat];
            const Icon = config?.icon || Train;
            return (
              <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-lg">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${config?.color || '#5289AD'}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color: config?.color || '#5289AD' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{poi.name}</p>
                </div>
                <span className="text-xs font-semibold text-[#5289AD] flex-shrink-0">{poi.dist}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
