'use client';

import { useEffect, useRef, useState } from 'react';
import { Train, GraduationCap, Hospital, ShoppingBag } from 'lucide-react';

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

const CAT_COLORS: Record<string, string> = {
  transit: '#5289AD',
  shopping: '#7c3aed',
  hospital: '#dc2626',
  school: '#D4C4A8',
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
        pitch: 45,
        attributionControl: false,
      });

      map.addControl(new ml.NavigationControl({ showCompass: false }), 'top-right');

      map.on('load', () => {
        // Load pin images
        const pinImages = [
          { id: 'pin-property', url: '/images/markers/pin-property.png' },
          { id: 'pin-transit', url: '/images/markers/pin-transit.png' },
          { id: 'pin-shopping', url: '/images/markers/pin-shopping.png' },
          { id: 'pin-hospital', url: '/images/markers/pin-hospital.png' },
          { id: 'pin-school', url: '/images/markers/pin-school.png' },
        ];

        let loaded = 0;
        pinImages.forEach(pin => {
          map.loadImage(pin.url, (err: any, image: any) => {
            if (!err && image) {
              map.addImage(pin.id, image);
            }
            loaded++;
            if (loaded === pinImages.length) {
              addLayers();
            }
          });
        });

        function addLayers() {
          // Property marker
          map.addSource('property', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: coordinates },
              properties: { name: propertyName },
            },
          });
          map.addLayer({
            id: 'property-pin',
            type: 'symbol',
            source: 'property',
            layout: {
              'icon-image': 'pin-property',
              'icon-size': 0.8,
              'icon-anchor': 'bottom',
              'icon-allow-overlap': true,
            },
          });

          // POI markers
          const poiFeatures = POIS.map(poi => ({
            type: 'Feature' as const,
            geometry: { type: 'Point' as const, coordinates: [poi.lng, poi.lat] },
            properties: {
              name: poi.name,
              cat: poi.cat,
              dist: poi.dist,
              pinImage: `pin-${poi.cat}`,
            },
          }));

          map.addSource('pois', {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: poiFeatures },
          });

          map.addLayer({
            id: 'poi-pins',
            type: 'symbol',
            source: 'pois',
            layout: {
              'icon-image': ['get', 'pinImage'],
              'icon-size': 0.65,
              'icon-anchor': 'bottom',
              'icon-allow-overlap': true,
            },
          });

          // Popup on click
          const popup = new ml.Popup({ closeButton: false, closeOnClick: true, offset: [0, -40] });

          map.on('click', 'poi-pins', (e: any) => {
            const feat = e.features[0];
            popup
              .setLngLat(feat.geometry.coordinates)
              .setHTML(`<div style="font-family:Inter,sans-serif;padding:2px 4px"><strong style="font-size:13px">${feat.properties.name}</strong><br/><span style="font-size:12px;color:#5289AD">${feat.properties.dist}</span></div>`)
              .addTo(map);
          });

          map.on('click', 'property-pin', () => {
            popup
              .setLngLat(coordinates)
              .setHTML(`<div style="font-family:Inter,sans-serif;padding:2px 4px"><strong style="font-size:14px">${propertyName}</strong></div>`)
              .addTo(map);
          });

          map.on('mouseenter', 'poi-pins', () => { map.getCanvas().style.cursor = 'pointer'; });
          map.on('mouseleave', 'poi-pins', () => { map.getCanvas().style.cursor = ''; });
          map.on('mouseenter', 'property-pin', () => { map.getCanvas().style.cursor = 'pointer'; });
          map.on('mouseleave', 'property-pin', () => { map.getCanvas().style.cursor = ''; });

          setMapObj(map);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter by category
  useEffect(() => {
    if (!mapObj) return;
    try {
      if (activeCat === 'all') {
        mapObj.setFilter('poi-pins', null);
      } else {
        mapObj.setFilter('poi-pins', ['==', ['get', 'cat'], activeCat]);
      }
    } catch { /* map not ready */ }
  }, [activeCat, mapObj]);

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-xl font-extrabold text-foreground mb-4">Location</h2>

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

      <div ref={mapDiv} className="w-full rounded-xl overflow-hidden border border-border" style={{ height: 400 }} />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {POIS
          .filter(p => activeCat === 'all' || p.cat === activeCat)
          .map((poi, i) => {
            const Icon = CAT_CONFIG[poi.cat]?.icon || Train;
            const color = CAT_COLORS[poi.cat] || '#5289AD';
            return (
              <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-lg">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
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
