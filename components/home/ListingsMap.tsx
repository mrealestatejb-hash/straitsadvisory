'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

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
  slug: string | null;
  lng: number;
  lat: number;
  city: 'jb' | 'kl' | 'pg';
}

const LISTINGS: MapListing[] = [
  { name: 'R&F Princess Cove', loc: 'Bukit Chagar, JB', price: 'From RM380K', slug: 'rf-princess-cove-overview', lng: 103.7694, lat: 1.4600, city: 'jb' },
];

export default function ListingsMap({ activeCity }: ListingsMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef<(maplibregl.Marker & { _cityTag?: string })[]>([]);

  // Initialize map
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
      // Add markers
      LISTINGS.forEach((p) => {
        const linkHtml = p.slug
          ? `<a style="display:inline-block;padding:6px 14px;border-radius:6px;background:#06457F;color:#fff;font-size:12px;font-weight:600;text-decoration:none;transition:background 0.2s" href="/properties/${p.slug}">View Details &rarr;</a>`
          : `<a style="display:inline-block;padding:6px 14px;border-radius:6px;background:#06457F;color:#fff;font-size:12px;font-weight:600;text-decoration:none;transition:background 0.2s" href="/buy">View Listings &rarr;</a>`;

        const popupHtml = `
          <div style="font-family:Inter,system-ui,sans-serif;min-width:200px">
            <div style="font-size:15px;font-weight:700;color:#06457F;margin-bottom:4px">${p.name}</div>
            <div style="font-size:12px;color:#6b7280;margin-bottom:8px">📍 ${p.loc}</div>
            <div style="font-size:14px;font-weight:700;color:#06457F;margin-bottom:8px">${p.price}</div>
            ${linkHtml}
          </div>
        `;

        const popup = new maplibregl.Popup({ offset: 25 }).setHTML(popupHtml);
        const marker = new maplibregl.Marker({ color: '#06457F' })
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
