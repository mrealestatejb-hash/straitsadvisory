'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { properties } from '@/lib/properties';

interface ListingsMapProps {
  activeCity: 'all' | 'jb' | 'kl' | 'pg';
}

const CITY_VIEWS: Record<string, { center: [number, number]; zoom: number; pitch: number; bearing: number }> = {
  all: { center: [103.72, 1.46], zoom: 6, pitch: 35, bearing: 0 },
  jb: { center: [103.75, 1.49], zoom: 11, pitch: 45, bearing: -10 },
  kl: { center: [101.69, 3.15], zoom: 12, pitch: 45, bearing: -8 },
  pg: { center: [100.34, 5.38], zoom: 11, pitch: 45, bearing: -8 },
};

interface MapListing {
  name: string;
  loc: string;
  price: string;
  slug: string;
  lng: number;
  lat: number;
  city: 'jb' | 'kl' | 'pg';
}

// Build listings from properties data — auto-includes any new properties
const LISTINGS: MapListing[] = properties
  .filter((p) => p.coordinates && p.coordinates[0] !== 0 && p.coordinates[1] !== 0)
  .map((p) => ({
    name: p.name,
    loc: `${p.area}, ${p.district || 'Johor Bahru'}`,
    price: p.priceRange
      ? p.priceRange.split('—')[0].trim()
      : p.price.myr > 0
        ? `From RM${p.price.myr.toLocaleString()}`
        : 'Enquire',
    slug: p.slug,
    lng: p.coordinates[0],
    lat: p.coordinates[1],
    city: 'jb' as const, // All current properties are in JB
  }));

/** Creates a 3D teardrop pin canvas (matches the property detail map style) */
function createPinCanvas(
  mainColor: string,
  lightColor: string,
  darkColor: string,
  size: number = 32
): HTMLCanvasElement {
  const scale = 2;
  const w = size * scale;
  const h = (size + 8) * scale;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const cx = w / 2;
  const pinH = size * scale * 0.82;
  const pinR = size * scale * 0.32;
  const pinTop = 4 * scale;
  const pinBottom = pinTop + pinH;

  // Ground shadow
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx, h - 3 * scale, pinR * 0.6, 3 * scale, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fill();
  ctx.restore();

  // Pin body (teardrop)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx, pinBottom);
  ctx.bezierCurveTo(cx - pinR * 1.1, pinBottom - pinH * 0.35, cx - pinR, pinTop + pinR * 0.5, cx - pinR, pinTop + pinR);
  ctx.arc(cx, pinTop + pinR, pinR, Math.PI, 0, false);
  ctx.bezierCurveTo(cx + pinR, pinTop + pinR * 0.5, cx + pinR * 1.1, pinBottom - pinH * 0.35, cx, pinBottom);
  ctx.closePath();

  const grad = ctx.createLinearGradient(cx - pinR, pinTop, cx + pinR * 0.5, pinBottom);
  grad.addColorStop(0, lightColor);
  grad.addColorStop(0.4, mainColor);
  grad.addColorStop(1, darkColor);
  ctx.fillStyle = grad;
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 3 * scale;
  ctx.shadowOffsetY = 2 * scale;
  ctx.fill();
  ctx.restore();

  // Specular highlight
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx - pinR * 0.25, pinTop + pinR * 0.75, pinR * 0.3, pinR * 0.2, -0.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fill();
  ctx.restore();

  // White inner circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, pinTop + pinR, pinR * 0.45, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();

  return canvas;
}

export default function ListingsMap({ activeCity }: ListingsMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef<(maplibregl.Marker & { _cityTag?: string })[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [103.75, 1.49],
      zoom: 11,
      pitch: 45,
      bearing: -10,
      attributionControl: false,
    });

    mapInstance.addControl(new maplibregl.NavigationControl(), 'top-right');

    mapInstance.on('load', () => {
      // Create pin element from canvas
      const pinCanvas = createPinCanvas('#0F172A', '#334155', '#020617', 30);

      LISTINGS.forEach((p) => {
        const popupHtml = `
          <div style="font-family:Inter,system-ui,sans-serif;min-width:200px">
            <div style="font-size:15px;font-weight:700;color:#243C4C;margin-bottom:4px">${p.name}</div>
            <div style="font-size:12px;color:#6b7280;margin-bottom:8px">${p.loc}</div>
            <div style="font-size:14px;font-weight:700;color:#243C4C;margin-bottom:8px">${p.price}</div>
            <a style="display:inline-block;padding:6px 14px;border-radius:6px;background:#243C4C;color:#fff;font-size:12px;font-weight:600;text-decoration:none" href="/properties/${p.slug}">View Details &rarr;</a>
          </div>
        `;

        const popup = new maplibregl.Popup({ offset: 25 }).setHTML(popupHtml);

        // Create custom pin element from the canvas
        const el = document.createElement('div');
        el.style.width = '30px';
        el.style.height = '38px';
        el.style.cursor = 'pointer';
        el.style.backgroundImage = `url(${pinCanvas.toDataURL()})`;
        el.style.backgroundSize = 'contain';
        el.style.backgroundRepeat = 'no-repeat';

        const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([p.lng, p.lat])
          .setPopup(popup)
          .addTo(mapInstance) as maplibregl.Marker & { _cityTag?: string };

        marker._cityTag = p.city;
        markers.current.push(marker);
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

    markers.current.forEach((m) => {
      const el = m.getElement();
      if (activeCity === 'all' || m._cityTag === activeCity) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
        const popup = m.getPopup();
        if (popup && popup.isOpen()) popup.remove();
      }
    });
  }, [activeCity]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[480px] rounded-2xl overflow-hidden border border-gray-200"
    />
  );
}
