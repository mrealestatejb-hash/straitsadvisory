'use client';

import { useEffect, useRef, useState } from 'react';
import { Train, GraduationCap, Hospital, ShoppingBag } from 'lucide-react';

interface LocationMapProps {
  coordinates: [number, number];
  propertyName: string;
}

const POIS = [
  { name: 'CIQ / RTS Link Station', cat: 'transit', lng: 103.7623, lat: 1.4665, dist: '1.0 km' },
  { name: 'JB Sentral', cat: 'transit', lng: 103.7647, lat: 1.4625, dist: '450m' },
  { name: 'Woodlands CIQ (Singapore)', cat: 'transit', lng: 103.7691, lat: 1.4456, dist: '1.5 km' },
  { name: 'R&F Mall', cat: 'shopping', lng: 103.7692, lat: 1.4594, dist: '150m' },
  { name: 'City Square Mall', cat: 'shopping', lng: 103.7642, lat: 1.4612, dist: '450m' },
  { name: 'KOMTAR JBCC', cat: 'shopping', lng: 103.7628, lat: 1.4637, dist: '700m' },
  { name: 'KSL City Mall', cat: 'shopping', lng: 103.7624, lat: 1.4855, dist: '3.0 km' },
  { name: 'Hospital Sultanah Aminah', cat: 'hospital', lng: 103.7461, lat: 1.4588, dist: '2.4 km' },
  { name: 'KPJ Johor Specialist Hospital', cat: 'hospital', lng: 103.7414, lat: 1.4761, dist: '3.4 km' },
  { name: 'Foon Yew High School', cat: 'school', lng: 103.7787, lat: 1.4691, dist: '1.5 km' },
  { name: 'SK Sultan Ibrahim', cat: 'school', lng: 103.7513, lat: 1.4740, dist: '2.4 km' },
  { name: 'Fairview International School', cat: 'school', lng: 103.7340, lat: 1.5579, dist: '11.5 km' },
];

const CAT_COLORS: Record<string, string> = {
  transit: '#3B82F6',
  shopping: '#8B5CF6',
  hospital: '#EF4444',
  school: '#F59E0B',
};

const CAT_CONFIG: Record<string, { icon: typeof Train; label: string }> = {
  transit: { icon: Train, label: 'Transit' },
  shopping: { icon: ShoppingBag, label: 'Shopping' },
  hospital: { icon: Hospital, label: 'Healthcare' },
  school: { icon: GraduationCap, label: 'Schools' },
};

export function LocationMap({ coordinates, propertyName }: LocationMapProps) {
  const mapDiv = useRef<HTMLDivElement>(null);
  const mapReady = useRef(false);
  const [activeCat, setActiveCat] = useState('all');
  const [mapObj, setMapObj] = useState<any>(null);

  const categories = [...new Set(POIS.map(p => p.cat))];

  useEffect(() => {
    if (!mapDiv.current || mapReady.current) return;
    mapReady.current = true;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/maplibre-gl@4.1.2/dist/maplibre-gl.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/maplibre-gl@4.1.2/dist/maplibre-gl.js';
    script.onload = tryInit;
    document.head.appendChild(script);

    function tryInit() {
      const ml = (window as any).maplibregl;
      if (!ml) { setTimeout(tryInit, 200); return; }

      const map = new ml.Map({
        container: mapDiv.current,
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: coordinates,
        zoom: 14,
        pitch: 0,
        attributionControl: false,
      });

      map.addControl(new ml.NavigationControl({ showCompass: false }), 'top-right');

      map.on('load', () => {
        // ── Property source ──
        map.addSource('property', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: coordinates },
            properties: { name: propertyName },
          },
        });

        // Property outer glow ring
        map.addLayer({
          id: 'property-glow',
          type: 'circle',
          source: 'property',
          paint: {
            'circle-radius': 20,
            'circle-color': '#0F172A',
            'circle-opacity': 0.08,
            'circle-blur': 0.7,
          },
        });

        // Property main dot
        map.addLayer({
          id: 'property-pin',
          type: 'circle',
          source: 'property',
          paint: {
            'circle-radius': 8,
            'circle-color': '#0F172A',
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#ffffff',
          },
        });

        // Property inner white dot
        map.addLayer({
          id: 'property-inner',
          type: 'circle',
          source: 'property',
          paint: {
            'circle-radius': 2.5,
            'circle-color': '#ffffff',
          },
        });

        // ── POI source ──
        const poiFeatures = POIS.map(poi => ({
          type: 'Feature' as const,
          geometry: { type: 'Point' as const, coordinates: [poi.lng, poi.lat] },
          properties: {
            name: poi.name,
            cat: poi.cat,
            dist: poi.dist,
            color: CAT_COLORS[poi.cat] || '#6B7280',
          },
        }));

        map.addSource('pois', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: poiFeatures },
        });

        // POI shadow
        map.addLayer({
          id: 'poi-shadow',
          type: 'circle',
          source: 'pois',
          paint: {
            'circle-radius': 8,
            'circle-color': '#000000',
            'circle-opacity': 0.06,
            'circle-blur': 0.6,
            'circle-translate': [0, 1],
          },
        });

        // POI main dot
        map.addLayer({
          id: 'poi-pins',
          type: 'circle',
          source: 'pois',
          paint: {
            'circle-radius': 6,
            'circle-color': ['get', 'color'],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
          },
        });

        // ── Popup on click ──
        const popup = new ml.Popup({
          closeButton: false,
          closeOnClick: true,
          offset: [0, -12],
          className: 'clean-popup',
        });

        map.on('click', 'poi-pins', (e: any) => {
          const feat = e.features[0];
          const color = feat.properties.color;
          popup
            .setLngLat(feat.geometry.coordinates)
            .setHTML(
              `<div style="font-family:Inter,-apple-system,sans-serif;padding:6px 10px">` +
              `<div style="display:flex;align-items:center;gap:6px">` +
              `<div style="width:6px;height:6px;border-radius:50%;background:${color};flex-shrink:0"></div>` +
              `<strong style="font-size:12px;font-weight:600;color:#1e293b">${feat.properties.name}</strong>` +
              `</div>` +
              `<div style="font-size:11px;color:#64748b;margin-top:2px;padding-left:12px">${feat.properties.dist} away</div>` +
              `</div>`
            )
            .addTo(map);
        });

        map.on('click', 'property-pin', () => {
          popup
            .setLngLat(coordinates)
            .setHTML(
              `<div style="font-family:Inter,-apple-system,sans-serif;padding:6px 10px">` +
              `<strong style="font-size:12px;font-weight:600;color:#0f172a">${propertyName}</strong>` +
              `<div style="font-size:11px;color:#64748b;margin-top:1px">Your property</div>` +
              `</div>`
            )
            .addTo(map);
        });

        map.on('mouseenter', 'poi-pins', () => { map.getCanvas().style.cursor = 'pointer'; });
        map.on('mouseleave', 'poi-pins', () => { map.getCanvas().style.cursor = ''; });
        map.on('mouseenter', 'property-pin', () => { map.getCanvas().style.cursor = 'pointer'; });
        map.on('mouseleave', 'property-pin', () => { map.getCanvas().style.cursor = ''; });

        setMapObj(map);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter by category
  useEffect(() => {
    if (!mapObj) return;
    try {
      const filter = activeCat === 'all' ? null : ['==', ['get', 'cat'], activeCat];
      mapObj.setFilter('poi-pins', filter);
      mapObj.setFilter('poi-shadow', filter);
    } catch { /* map not ready */ }
  }, [activeCat, mapObj]);

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-xl font-extrabold text-foreground mb-4">Location</h2>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveCat('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            activeCat === 'all' ? 'bg-[#243C4C] text-white' : 'bg-[#A8C4EC]/15 text-[#5379AE]'
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
                activeCat === cat ? 'bg-[#243C4C] text-white' : 'bg-[#A8C4EC]/15 text-[#5379AE]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Map */}
      <div ref={mapDiv} className="w-full rounded-xl overflow-hidden border border-border" style={{ height: 400 }} />

      {/* POI list */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {POIS
          .filter(p => activeCat === 'all' || p.cat === activeCat)
          .map((poi, i) => {
            const Icon = CAT_CONFIG[poi.cat]?.icon || Train;
            const color = CAT_COLORS[poi.cat] || '#3B82F6';
            return (
              <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-lg">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}12` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{poi.name}</p>
                </div>
                <span className="text-xs font-semibold flex-shrink-0" style={{ color }}>{poi.dist}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
