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

const CAT_COLORS: Record<string, { main: string; light: string; dark: string; shadow: string }> = {
  transit:  { main: '#3B82F6', light: '#60A5FA', dark: '#2563EB', shadow: '#1e40af' },
  shopping: { main: '#8B5CF6', light: '#A78BFA', dark: '#7C3AED', shadow: '#5b21b6' },
  hospital: { main: '#EF4444', light: '#F87171', dark: '#DC2626', shadow: '#991b1b' },
  school:   { main: '#F59E0B', light: '#FBBF24', dark: '#D97706', shadow: '#92400e' },
  property: { main: '#0F172A', light: '#334155', dark: '#020617', shadow: '#000000' },
};

const CAT_CONFIG: Record<string, { icon: typeof Train; label: string }> = {
  transit: { icon: Train, label: 'Transit' },
  shopping: { icon: ShoppingBag, label: 'Shopping' },
  hospital: { icon: Hospital, label: 'Healthcare' },
  school: { icon: GraduationCap, label: 'Schools' },
};

/**
 * Renders a 3D teardrop pin SVG to a canvas ImageData at 2x resolution.
 * Includes gradient body, white inner circle, and ground shadow ellipse.
 */
function createPinImage(
  colors: { main: string; light: string; dark: string; shadow: string },
  size: number = 40
): ImageData {
  const scale = 2; // 2x for retina
  const w = size * scale;
  const h = (size + 10) * scale; // extra space for ground shadow
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const cx = w / 2;
  const pinH = size * scale * 0.82;
  const pinR = size * scale * 0.32;
  const pinTop = 4 * scale;
  const pinBottom = pinTop + pinH;

  // ── Ground shadow ellipse ──
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx, h - 4 * scale, pinR * 0.7, 4 * scale, 0, 0, Math.PI * 2);
  ctx.fillStyle = `${colors.shadow}30`;
  ctx.fill();
  ctx.restore();

  // ── Pin body (teardrop) ──
  ctx.save();
  ctx.beginPath();
  // Start from bottom point
  ctx.moveTo(cx, pinBottom);
  // Left curve up to circle
  ctx.bezierCurveTo(
    cx - pinR * 1.1, pinBottom - pinH * 0.35,
    cx - pinR, pinTop + pinR * 0.5,
    cx - pinR, pinTop + pinR
  );
  // Arc across the top
  ctx.arc(cx, pinTop + pinR, pinR, Math.PI, 0, false);
  // Right curve back down to point
  ctx.bezierCurveTo(
    cx + pinR, pinTop + pinR * 0.5,
    cx + pinR * 1.1, pinBottom - pinH * 0.35,
    cx, pinBottom
  );
  ctx.closePath();

  // 3D gradient fill (light top-left to dark bottom-right)
  const grad = ctx.createLinearGradient(cx - pinR, pinTop, cx + pinR * 0.5, pinBottom);
  grad.addColorStop(0, colors.light);
  grad.addColorStop(0.4, colors.main);
  grad.addColorStop(1, colors.dark);
  ctx.fillStyle = grad;
  ctx.fill();

  // Subtle inner shadow for depth
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 3 * scale;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2 * scale;
  ctx.fill();
  ctx.restore();

  // ── White highlight (top-left specular) ──
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(
    cx - pinR * 0.25,
    pinTop + pinR * 0.75,
    pinR * 0.3,
    pinR * 0.2,
    -0.5,
    0, Math.PI * 2
  );
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fill();
  ctx.restore();

  // ── White inner circle ──
  ctx.save();
  ctx.beginPath();
  const innerR = pinR * 0.45;
  ctx.arc(cx, pinTop + pinR, innerR, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();

  return ctx.getImageData(0, 0, w, h);
}

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
        // ── Generate & register pin images ──
        const pinSize = 34;
        const propertyPinSize = 42;

        // Property pin (larger, dark)
        const propImg = createPinImage(CAT_COLORS.property, propertyPinSize);
        map.addImage('pin-property', propImg, { pixelRatio: 2 });

        // Category pins
        for (const [cat, colors] of Object.entries(CAT_COLORS)) {
          if (cat === 'property') continue;
          const img = createPinImage(colors, pinSize);
          map.addImage(`pin-${cat}`, img, { pixelRatio: 2 });
        }

        // ── Property source & layer ──
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
            'icon-size': 1,
            'icon-anchor': 'bottom',
            'icon-allow-overlap': true,
            'icon-pitch-alignment': 'viewport',
            'icon-rotation-alignment': 'viewport',
          },
        });

        // ── POI source & layer ──
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
            'icon-size': 1,
            'icon-anchor': 'bottom',
            'icon-allow-overlap': true,
            'icon-pitch-alignment': 'viewport',
            'icon-rotation-alignment': 'viewport',
          },
        });

        // ── Popup on click ──
        const popup = new ml.Popup({
          closeButton: false,
          closeOnClick: true,
          offset: [0, -44],
          className: 'clean-popup',
        });

        map.on('click', 'poi-pins', (e: any) => {
          const feat = e.features[0];
          const cat = feat.properties.cat;
          const color = CAT_COLORS[cat]?.main || '#6B7280';
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
            const color = CAT_COLORS[poi.cat]?.main || '#3B82F6';
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
