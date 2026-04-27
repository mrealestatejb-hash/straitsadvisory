'use client';

import { useEffect, useRef, useState } from 'react';
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

// Build GeoJSON from properties data
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
        city: 'jb',
      },
    })),
};

export default function ListingsMap({ activeCity }: ListingsMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const popup = useRef<maplibregl.Popup | null>(null);

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
      // Add properties source
      mapInstance.addSource('properties', {
        type: 'geojson',
        data: propertiesGeoJSON,
      });

      // Shadow layer
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

      // Main dot
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

      // Inner white dot
      mapInstance.addLayer({
        id: 'properties-inner',
        type: 'circle',
        source: 'properties',
        paint: {
          'circle-radius': 2,
          'circle-color': '#ffffff',
        },
      });

      // Popup on click — anchor: 'bottom' keeps it locked above the pin
      // closeOnClick: false prevents glitching when interacting with popup contents
      const popupInstance = new maplibregl.Popup({
        closeButton: true,
        closeOnClick: false,
        closeOnMove: false,
        anchor: 'bottom',
        offset: 16,
        maxWidth: '260px',
        className: 'listings-map-popup',
      });
      popup.current = popupInstance;

      mapInstance.on('click', 'properties-pins', (e: maplibregl.MapMouseEvent & { features?: maplibregl.GeoJSONFeature[] }) => {
        if (!e.features || !e.features[0]) return;
        e.preventDefault?.();
        const feat = e.features[0];
        const coords = (feat.geometry as GeoJSON.Point).coordinates.slice() as [number, number];
        const props = feat.properties as { name: string; slug: string; loc: string; price: string };

        popupInstance
          .setLngLat(coords)
          .setHTML(
            `<div style="font-family:Inter,system-ui,sans-serif;min-width:200px;padding:4px 2px">` +
            `<div style="font-size:15px;font-weight:700;color:#243C4C;margin-bottom:4px;line-height:1.3">${props.name}</div>` +
            `<div style="font-size:12px;color:#6b7280;margin-bottom:8px">${props.loc}</div>` +
            `<div style="font-size:14px;font-weight:700;color:#243C4C;margin-bottom:10px">${props.price}</div>` +
            `<a data-property-link="${props.slug}" style="display:inline-block;padding:7px 14px;border-radius:6px;background:#243C4C;color:#fff;font-size:12px;font-weight:600;text-decoration:none;cursor:pointer" href="/properties/${props.slug}">View Details &rarr;</a>` +
            `</div>`
          )
          .addTo(mapInstance);

        // Wire up the View Details button manually to guarantee navigation
        // (some popup containers swallow link clicks)
        setTimeout(() => {
          const link = document.querySelector(`a[data-property-link="${props.slug}"]`) as HTMLAnchorElement | null;
          if (link) {
            link.addEventListener('click', (ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              window.location.href = `/properties/${props.slug}`;
            });
          }
        }, 0);
      });

      mapInstance.on('mouseenter', 'properties-pins', () => {
        mapInstance.getCanvas().style.cursor = 'pointer';
      });
      mapInstance.on('mouseleave', 'properties-pins', () => {
        mapInstance.getCanvas().style.cursor = '';
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

  return (
    <div
      ref={mapContainer}
      className="w-full h-[480px] rounded-2xl overflow-hidden border border-gray-200"
    />
  );
}
