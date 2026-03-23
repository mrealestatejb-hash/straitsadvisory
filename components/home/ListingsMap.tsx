'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface ListingsMapProps {
  activeCity: 'all' | 'jb' | 'kl' | 'pg';
}

const CITY_VIEWS: Record<string, { center: [number, number]; zoom: number; pitch: number; bearing: number }> = {
  all: { center: [103.72, 1.46], zoom: 6, pitch: 60, bearing: 0 },
  jb: { center: [103.75, 1.50], zoom: 11, pitch: 85, bearing: -20 },
  kl: { center: [101.69, 3.16], zoom: 12, pitch: 85, bearing: -15 },
  pg: { center: [100.34, 5.39], zoom: 11, pitch: 85, bearing: -15 },
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
  // Johor Bahru
  { name: 'R&F Princess Cove', loc: 'Bukit Chagar', price: 'From RM350K', slug: 'rf-princess-cove', lng: 103.7694, lat: 1.4600, city: 'jb' },
  { name: 'R&F Princess Cove Ph2', loc: 'Bukit Chagar', price: 'From RM500K', slug: 'rf-princess-cove-ph2-bukit-chagar', lng: 103.7710, lat: 1.4580, city: 'jb' },
  { name: 'CTC Skyone', loc: 'Bukit Chagar', price: 'From RM580K', slug: 'ctc-skyone-bukit-chagar', lng: 103.7648, lat: 1.4719, city: 'jb' },
  { name: 'Majestic Gensphere', loc: 'Bukit Chagar', price: 'From RM530K', slug: 'majestic-gensphere-bukit-chagar', lng: 103.7673, lat: 1.4603, city: 'jb' },
  { name: 'Exsim Causewayz', loc: 'Bukit Chagar', price: 'Price on Request', slug: 'exsim-causewayz-bukit-chagar', lng: 103.7660, lat: 1.4695, city: 'jb' },
  { name: 'Summer Suites', loc: 'Bukit Chagar', price: 'From RM600K', slug: 'summer-suites-bukit-chagar', lng: 103.7702, lat: 1.4618, city: 'jb' },
  { name: 'The Arden One', loc: 'Bukit Senyum', price: 'From RM1mil', slug: 'the-arden-one-bukit-senyum', lng: 103.7631, lat: 1.4733, city: 'jb' },
  { name: 'The Astaka One', loc: 'Bukit Senyum', price: 'From RM2.5mil', slug: 'the-astaka-one-bukit-senyum', lng: 103.7644, lat: 1.4736, city: 'jb' },
  { name: 'Paragon Signature Suites', loc: 'Jln Abdul Samad', price: 'From RM450K', slug: 'paragon-signature-suites-jln-abdul-samad', lng: 103.7437, lat: 1.4663, city: 'jb' },
  { name: 'M Grand Minori', loc: 'Taman Pelangi', price: 'Price on Request', slug: 'm-grand-minori-taman-pelangi', lng: 103.7733, lat: 1.4785, city: 'jb' },
  { name: 'Maxim The Address', loc: 'Taman Pelangi', price: 'Price on Request', slug: 'maxim-the-address-taman-pelangi', lng: 103.7750, lat: 1.4795, city: 'jb' },
  { name: 'Skypark Kepler', loc: 'Lido Waterfront', price: 'Price on Request', slug: 'skypark-kepler-lido-waterfront-boulevard', lng: 103.7348, lat: 1.4520, city: 'jb' },
  { name: 'Sunway Majestic Ara', loc: 'Jln Yahya Awal', price: 'Price on Request', slug: 'sunway-majestic-ara-soho', lng: 103.7468, lat: 1.4772, city: 'jb' },
  { name: 'Skyline One Sentosa', loc: 'Taman Sentosa', price: 'Price on Request', slug: 'skyline-one-sentosa-taman-sentosa', lng: 103.7753, lat: 1.4935, city: 'jb' },
  { name: 'Paragon Gateway', loc: 'Taman Suria', price: 'Price on Request', slug: 'paragon-gateway-taman-suria', lng: 103.7636, lat: 1.5031, city: 'jb' },
  { name: 'Country Garden Danga Bay', loc: 'Danga Bay', price: 'Price on Request', slug: 'country-garden-danga-bay', lng: 103.7277, lat: 1.4642, city: 'jb' },
  { name: 'MBW Bay', loc: 'Danga Bay', price: 'Price on Request', slug: 'mbw-bay-danga-bay', lng: 103.7235, lat: 1.4707, city: 'jb' },
  { name: 'Paragon Calia', loc: 'Danga Bay', price: 'Price on Request', slug: 'paragon-calia-danga-bay', lng: 103.7300, lat: 1.4680, city: 'jb' },
  { name: 'Parkland by the River', loc: 'Permas Jaya', price: 'Price on Request', slug: 'parkland-by-the-river-permas', lng: 103.8016, lat: 1.4947, city: 'jb' },
  { name: 'Straits View Duo', loc: 'Permas Jaya', price: 'Price on Request', slug: 'the-straits-view-duo-permas-jaya', lng: 103.8050, lat: 1.4930, city: 'jb' },
  { name: 'Ponderosa Regency', loc: 'Taman Ponderosa', price: 'Price on Request', slug: 'ponderosa-regency', lng: 103.7803, lat: 1.5160, city: 'jb' },
  { name: 'Elysia Park', loc: 'Medini', price: 'Price on Request', slug: 'elysia-park-medini', lng: 103.6383, lat: 1.4248, city: 'jb' },
  { name: 'The M Macrolink', loc: 'Medini', price: 'Price on Request', slug: 'the-m-macrolink-medini', lng: 103.6269, lat: 1.4189, city: 'jb' },
  { name: 'Southern Marina', loc: 'Puteri Harbour', price: 'Price on Request', slug: 'southern-marina-puteri-harbour', lng: 103.6582, lat: 1.4140, city: 'jb' },
  { name: 'Puteri Cove', loc: 'Puteri Harbour', price: 'Price on Request', slug: 'puteri-cove-residences-puteri-harbour', lng: 103.6562, lat: 1.4121, city: 'jb' },
  { name: 'Nadi Residence', loc: 'Southkey', price: 'Price on Request', slug: 'nadi-residence-southkey', lng: 103.7774, lat: 1.5038, city: 'jb' },
  { name: 'Suria Hill', loc: 'Iskandar Puteri', price: 'Price on Request', slug: 'suria-hill-iskandar-puteri', lng: 103.6492, lat: 1.4487, city: 'jb' },
  { name: 'Nigella Park', loc: 'Forest City', price: 'Price on Request', slug: 'nigella-park-forest-city-sfz', lng: 103.5988, lat: 1.3405, city: 'jb' },
  { name: 'Golf Villa', loc: 'Forest City', price: 'Price on Request', slug: 'golf-villa-forest-city-sfz', lng: 103.5560, lat: 1.3440, city: 'jb' },
  { name: 'Avenue MBW City', loc: 'MBW City', price: 'Price on Request', slug: 'avenue-mbw-city', lng: 103.7541, lat: 1.4724, city: 'jb' },
  { name: 'Veranda MBW City', loc: 'MBW City', price: 'Price on Request', slug: 'veranda-mbw-city', lng: 103.7535, lat: 1.4720, city: 'jb' },
  { name: 'Trellis MBW City', loc: 'MBW City', price: 'Price on Request', slug: 'trellis-mbw-city', lng: 103.7548, lat: 1.4728, city: 'jb' },
  { name: 'Marina Residence', loc: 'Bayu Puteri', price: 'Price on Request', slug: 'marina-residence-bayu-puteri', lng: 103.7912, lat: 1.5009, city: 'jb' },
  { name: 'Central Park', loc: 'Country Garden', price: 'Price on Request', slug: 'central-park-country-garden', lng: 103.7183, lat: 1.5120, city: 'jb' },
  { name: 'Ascent Park', loc: 'Iskandar Puteri', price: 'Price on Request', slug: 'ascent-park-iskandar-puteri', lng: 103.6494, lat: 1.4402, city: 'jb' },
  { name: 'Carnelian Tower', loc: 'Forest City', price: 'Price on Request', slug: 'carnelian-tower-forest-city-sfz', lng: 103.5898, lat: 1.3339, city: 'jb' },
  { name: 'Meridin East', loc: 'Pasir Gudang', price: 'Price on Request', slug: 'meridin-east', lng: 103.9503, lat: 1.5142, city: 'jb' },
  { name: 'Senibong Kews', loc: 'Senibong Cove', price: 'Price on Request', slug: 'senibong-kews', lng: 103.8310, lat: 1.4880, city: 'jb' },
  { name: 'Topaz Crest Austin', loc: 'Austin', price: 'Price on Request', slug: 'topaz-crest-austin', lng: 103.7732, lat: 1.5768, city: 'jb' },
  { name: 'Bayou Residences', loc: 'Leisure Farm', price: 'Price on Request', slug: 'bayou-residences-leisure-farm', lng: 103.6109, lat: 1.4077, city: 'jb' },
  { name: 'Daya 1 Residences', loc: 'Taman Daya', price: 'Price on Request', slug: 'daya-1-residences-taman-daya', lng: 103.7676, lat: 1.5441, city: 'jb' },
  { name: 'D Secret Garden 2', loc: 'Taman Kempas', price: 'Price on Request', slug: 'd-secret-garden-2-taman-kempas-indah', lng: 103.7137, lat: 1.5530, city: 'jb' },
  { name: 'Lanna Eco Tropics', loc: 'Pasir Gudang', price: 'Price on Request', slug: 'lanna-eco-tropics', lng: 103.9397, lat: 1.4943, city: 'jb' },
  { name: 'Bee Development', loc: 'Nusajaya', price: 'Price on Request', slug: 'bee-development-nusajaya', lng: 103.6220, lat: 1.4582, city: 'jb' },
  { name: 'Fraser Heights', loc: 'Gelang Patah', price: 'Price on Request', slug: 'fraser-heights-gelang-patah', lng: 103.6187, lat: 1.4233, city: 'jb' },
  { name: 'Isola Coast', loc: 'Senibong Cove', price: 'Price on Request', slug: 'isola-coast-senibong-cove', lng: 103.8389, lat: 1.4810, city: 'jb' },
  // Kuala Lumpur
  { name: 'KL East : East 61', loc: 'KL City Centre', price: 'Price on Request', slug: null, lng: 101.7530, lat: 3.2298, city: 'kl' },
  { name: 'KL East : The Reya', loc: 'KL City Centre', price: 'From RM899,000', slug: null, lng: 101.7510, lat: 3.2285, city: 'kl' },
  { name: 'PSV 2 Residences', loc: 'Bandar Tasik Selatan', price: 'From RM512,000', slug: null, lng: 101.7096, lat: 3.0720, city: 'kl' },
  { name: 'EkoTitiwangsa', loc: 'Setapak', price: 'From RM413,000', slug: null, lng: 101.7027, lat: 3.1868, city: 'kl' },
  { name: 'LSH Sentul Ria', loc: 'Sentul', price: 'Price on Request', slug: null, lng: 101.6920, lat: 3.1839, city: 'kl' },
  { name: 'Papyrus North Kiara', loc: 'Mont Kiara', price: 'From RM868,000', slug: null, lng: 101.6528, lat: 3.1696, city: 'kl' },
  { name: 'SWNK Houze @ BBCC', loc: 'Bukit Bintang', price: 'From RM745,000', slug: null, lng: 101.7078, lat: 3.1417, city: 'kl' },
  { name: 'M Aurora', loc: 'Jalan Klang Lama', price: 'Price on Request', slug: null, lng: 101.6780, lat: 3.1050, city: 'kl' },
  { name: 'Parkside Residences', loc: 'Bangsar', price: 'From RM665,000', slug: null, lng: 101.6788, lat: 3.1394, city: 'kl' },
  { name: 'Sunway Cochrane', loc: 'KL City Centre', price: 'Price on Request', slug: null, lng: 101.7231, lat: 3.1328, city: 'kl' },
  { name: '9 Seputeh', loc: 'Seputeh', price: 'Price on Request', slug: null, lng: 101.6770, lat: 3.1100, city: 'kl' },
  { name: 'SkyAwani PRIMA', loc: 'Setapak', price: 'Price on Request', slug: null, lng: 101.6841, lat: 3.1287, city: 'kl' },
  { name: 'The Maple Residences', loc: 'Jalan Klang Lama', price: 'From RM835,000', slug: null, lng: 101.6730, lat: 3.0960, city: 'kl' },
  { name: 'LSH Segar', loc: 'Cheras', price: 'From RM567,000', slug: null, lng: 101.7400, lat: 3.0918, city: 'kl' },
  { name: 'Tuan Straits Residency', loc: 'Desa Petaling', price: 'Price on Request', slug: null, lng: 101.7028, lat: 3.0923, city: 'kl' },
  { name: 'KL48', loc: 'KL City Centre', price: 'Price on Request', slug: null, lng: 101.7157, lat: 3.1276, city: 'kl' },
  { name: 'M Nova', loc: 'Kepong', price: 'Price on Request', slug: null, lng: 101.6508, lat: 3.2296, city: 'kl' },
  { name: 'J.Rayon Residences', loc: 'Seputeh', price: 'Price on Request', slug: null, lng: 101.6768, lat: 3.1179, city: 'kl' },
  { name: 'Royal Garden', loc: 'KL City Centre', price: 'Price on Request', slug: null, lng: 101.6720, lat: 3.1840, city: 'kl' },
  { name: 'M Azura', loc: 'Setapak', price: 'Price on Request', slug: null, lng: 101.7218, lat: 3.2050, city: 'kl' },
  { name: 'The Nobel Healthcare Park', loc: 'Bukit Jalil', price: 'From RM414,000', slug: null, lng: 101.6650, lat: 3.0540, city: 'kl' },
  { name: 'M Aspira', loc: 'Taman Desa', price: 'From RM452,000', slug: null, lng: 101.6830, lat: 3.1080, city: 'kl' },
  { name: 'Bamboo Hills Residences', loc: 'Segambut', price: 'From RM490,000', slug: null, lng: 101.6810, lat: 3.1920, city: 'kl' },
  { name: 'Radium Arena', loc: 'Jalan Klang Lama', price: 'From RM410,000', slug: null, lng: 101.6710, lat: 3.1020, city: 'kl' },
  { name: 'The Conlay', loc: 'KL City Centre', price: 'From RM1,552,000', slug: null, lng: 101.7145, lat: 3.1505, city: 'kl' },
  { name: 'Chancery Ampang', loc: 'KL City Centre', price: 'From RM422,000', slug: null, lng: 101.7358, lat: 3.1606, city: 'kl' },
  { name: 'Aetas Seputeh', loc: 'Seputeh', price: 'From RM3,285,800', slug: null, lng: 101.6790, lat: 3.1130, city: 'kl' },
  { name: 'Tangen Residences', loc: 'Segambut', price: 'From RM659,000', slug: null, lng: 101.6600, lat: 3.1870, city: 'kl' },
  { name: 'CloutHaus Residences', loc: 'KL City Centre', price: 'From RM1,500,000', slug: null, lng: 101.7037, lat: 3.1528, city: 'kl' },
  { name: 'Aras Residences', loc: 'Jalan Klang Lama', price: 'From RM599,400', slug: null, lng: 101.6720, lat: 3.0950, city: 'kl' },
  { name: 'The Connaught One', loc: 'Cheras', price: 'From RM380,000', slug: null, lng: 101.7387, lat: 3.0804, city: 'kl' },
  { name: 'SkyAman 1 Residences', loc: 'Desa Pandan', price: 'Price on Request', slug: null, lng: 101.7350, lat: 3.1170, city: 'kl' },
  { name: 'Levia Residence', loc: 'Cheras', price: 'From RM684,000', slug: null, lng: 101.7350, lat: 3.1220, city: 'kl' },
  { name: 'PV 22 Residences', loc: 'Setapak', price: 'From RM373,000', slug: null, lng: 101.7190, lat: 3.2050, city: 'kl' },
  { name: 'Vox Residence', loc: 'Sentul', price: 'From RM523,200', slug: null, lng: 101.6920, lat: 3.1850, city: 'kl' },
  { name: 'Platinum Melati', loc: 'KL City Centre', price: 'Price on Request', slug: null, lng: 101.7218, lat: 3.2195, city: 'kl' },
  // Penang
  { name: 'Pinnacle Bukit Gambier', loc: 'Bukit Gambier', price: 'From RM588,800', slug: null, lng: 100.29693, lat: 5.37112, city: 'pg' },
  { name: 'SkyWorld Pearlmont', loc: 'Seberang Jaya', price: 'From RM323,000', slug: null, lng: 100.39527, lat: 5.39385, city: 'pg' },
  { name: 'Eco Sun - Irama', loc: 'Batu Kawan', price: 'From RM477,500', slug: null, lng: 100.44010, lat: 5.25830, city: 'pg' },
  { name: 'SETIA SV2', loc: 'George Town', price: 'From RM969,000', slug: null, lng: 100.31200, lat: 5.40050, city: 'pg' },
  { name: 'Lightwater Residences', loc: 'Gelugor', price: 'Price on Request', slug: null, lng: 100.31631, lat: 5.36511, city: 'pg' },
  { name: 'Harbour View Residence', loc: 'Bagan Dalam', price: 'From RM416,000', slug: null, lng: 100.37332, lat: 5.39846, city: 'pg' },
  { name: 'Eco Sun - Everine', loc: 'Batu Kawan', price: 'From RM772,800', slug: null, lng: 100.43800, lat: 5.25600, city: 'pg' },
  { name: 'Ferringhi Residence 2', loc: 'Batu Ferringhi', price: 'From RM1,064,800', slug: null, lng: 100.25395, lat: 5.46847, city: 'pg' },
  { name: 'Tuan Pavilion', loc: 'Ayer Itam', price: 'Price on Request', slug: null, lng: 100.28410, lat: 5.40260, city: 'pg' },
  { name: 'M Zenni', loc: 'Bayan Lepas', price: 'Price on Request', slug: null, lng: 100.28760, lat: 5.28490, city: 'pg' },
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
      center: [103.75, 1.50],
      zoom: 11,
      pitch: 85,
      bearing: -20,
      maxPitch: 85,
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
