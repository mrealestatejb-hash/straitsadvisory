# CLAUDE.md - Straits Advisory

## Project Overview

Premium animated real estate website for Straits Advisory - Singapore's gateway to Johor Bahru property investment. Target: Award-winning, Apple-inspired design with sub-3s mobile load times.

**Live Domain:** straitsadvisory.com (pending deployment)
**Target Audience:** Singapore buyers investing in JB properties
**Key Differentiator:** RTS Link proximity, freehold ownership, 6-8% yields vs SG's 2-3%

---

## Tech Stack (AntiGravity)

### Core Framework
```
next@15.x          # App Router, Server Components, Turbopack
typescript@5.x     # Strict mode enabled
tailwindcss@3.4+   # JIT compiler, custom design tokens
```

### Animation Layer
```
gsap@3.12+                    # Timeline animations, ScrollTrigger
framer-motion@11+             # Component animations, AnimatePresence
@studio-freight/lenis@1.1+    # Smooth scroll (60fps target)
next-transition-router        # Page transitions for App Router
split-type                    # Text splitting for reveal animations
@formkit/auto-animate         # Zero-config micro-interactions
```

### 3D & Visual Effects
```
three@0.160+                      # WebGL foundation
@react-three/fiber@8+             # React renderer for Three.js
@react-three/drei                 # R3F helpers (Float, Environment, etc.)
@react-three/postprocessing       # Bloom, DOF, vignette effects
@splinetool/react-spline          # Spline 3D embeds
@mesh-gradient/react              # Apple-style animated gradients
```

### Maps & Geospatial
```
maplibre-gl              # Free Mapbox alternative (WebGL maps)
react-map-gl             # React wrapper for MapLibre/Mapbox
@turf/turf               # Geospatial calculations (distance, boundaries)
supercluster             # Marker clustering for large datasets
```

### Internationalization & Currency
```
next-intl@3+             # App Router i18n (recommended over next-i18next)
```
Native `Intl` API for number/currency/date formatting - zero bundle cost.

### UI Components
```
@radix-ui/*              # Headless accessible primitives
shadcn/ui                # CLI-installed Radix + Tailwind components
sonner                   # Toast notifications with smooth animations
vaul                     # iOS-style drawer/sheet component
react-hook-form          # Performant forms
zod                      # Schema validation + TypeScript inference
```

### Performance & Analytics
```
@next/bundle-analyzer    # Bundle size monitoring
posthog-js               # Analytics, heatmaps, session replay, A/B testing
```

---

## Project Structure

```
straits-advisory/
├── app/
│   ├── [locale]/                    # i18n route groups
│   │   ├── layout.tsx               # Locale-aware layout
│   │   ├── page.tsx                 # Home
│   │   ├── properties/
│   │   │   ├── page.tsx             # Listings
│   │   │   └── [slug]/page.tsx      # Property detail + virtual tour
│   │   ├── map/page.tsx             # Interactive district map
│   │   ├── calculator/page.tsx      # Corridor calculator
│   │   └── about/page.tsx
│   ├── api/
│   │   ├── exchange-rates/route.ts  # Currency conversion endpoint
│   │   └── properties/route.ts      # Property data API
│   └── globals.css
├── components/
│   ├── animations/
│   │   ├── PageTransition.tsx       # GSAP page transitions
│   │   ├── TextReveal.tsx           # SplitType + GSAP
│   │   ├── ScrollReveal.tsx         # ScrollTrigger wrapper
│   │   └── ParallaxSection.tsx
│   ├── three/
│   │   ├── Scene.tsx                # R3F canvas wrapper
│   │   ├── Globe.tsx                # 3D Singapore-JB visualization
│   │   └── PropertyModel.tsx
│   ├── maps/
│   │   ├── InteractiveMap.tsx       # MapLibre main component
│   │   ├── PropertyMarker.tsx       # Custom animated markers
│   │   ├── DistrictLayer.tsx        # GeoJSON boundaries
│   │   └── MapControls.tsx
│   ├── tours/
│   │   ├── VirtualTourViewer.tsx    # Lazy-loaded tour container
│   │   ├── MatterportEmbed.tsx      # Matterport SDK wrapper
│   │   ├── KuulaEmbed.tsx           # Kuula iframe wrapper
│   │   └── TourThumbnail.tsx        # Pre-load state
│   ├── ui/                          # shadcn/ui components
│   ├── PropertyCard.tsx
│   ├── CorridorCalculator.tsx
│   ├── ChatBot.tsx
│   └── Navigation.tsx
├── lib/
│   ├── gsap.ts                      # GSAP registration & config
│   ├── i18n.ts                      # next-intl configuration
│   ├── currency.ts                  # Exchange rate utilities
│   └── maps.ts                      # MapLibre utilities
├── hooks/
│   ├── useScrollTrigger.ts
│   ├── useCurrency.ts               # Currency conversion hook
│   ├── useLocale.ts
│   └── useIntersectionObserver.ts   # Lazy loading
├── messages/                        # i18n translation files
│   ├── en-SG.json
│   ├── zh-SG.json
│   └── ms-MY.json
├── public/
│   ├── models/                      # GLB/GLTF 3D assets
│   ├── geojson/                     # District boundaries
│   └── images/
└── styles/
    └── animations.css               # GSAP/CSS animation classes
```

---

## Animation Patterns

### Page Transitions (next-transition-router + GSAP)
```tsx
// app/[locale]/layout.tsx
import { TransitionRouter } from 'next-transition-router';
import gsap from 'gsap';

export default function Layout({ children }) {
  return (
    <TransitionRouter
      leave={(next) => {
        gsap.to('.page-content', {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: next,
        });
      }}
      enter={(next) => {
        gsap.fromTo('.page-content',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', onComplete: next }
        );
      }}
    >
      {children}
    </TransitionRouter>
  );
}
```

### Text Reveal Animation
```tsx
// components/animations/TextReveal.tsx
'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function TextReveal({ children, className }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    
    const split = new SplitType(ref.current, { types: 'words,chars' });
    
    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.02,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
      },
    });

    return () => split.revert(); // Cleanup
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
```

### Scroll-Triggered Sections
```tsx
// Always use useLayoutEffect for GSAP + React
// Always return cleanup function to kill ScrollTriggers
// Use data-speed attribute for parallax intensity

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.parallax-bg', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
  
  return () => ctx.revert();
}, []);
```

### Lenis Smooth Scroll Setup
```tsx
// app/providers.tsx
'use client';
import { ReactLenis } from '@studio-freight/react-lenis';

export function Providers({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,           // Smoothness (0.05-0.15 range)
        duration: 1.2,       // Scroll duration
        smoothWheel: true,
        syncTouch: true,     // Enable on touch devices
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

---

## Virtual Tour Implementation

### Lazy Loading Pattern (CRITICAL for mobile performance)
```tsx
// components/tours/VirtualTourViewer.tsx
'use client';
import { useState, useCallback } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import dynamic from 'next/dynamic';

// Dynamic import - only loads when needed
const MatterportEmbed = dynamic(() => import('./MatterportEmbed'), {
  loading: () => <TourSkeleton />,
});

const KuulaEmbed = dynamic(() => import('./KuulaEmbed'), {
  loading: () => <TourSkeleton />,
});

interface VirtualTourViewerProps {
  property: {
    name: string;
    tourUrl: string;
    tourProvider: 'matterport' | 'kuula' | 'generic';
    thumbnail: string;
  };
  onClose: () => void;
}

export function VirtualTourViewer({ property, onClose }: VirtualTourViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // User-initiated load only - saves data & battery
  const loadTour = useCallback(() => {
    setIsLoading(true);
    // Small delay for UX feedback
    setTimeout(() => {
      setIsLoaded(true);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="bg-background rounded-2xl overflow-hidden shadow-2xl">
      {/* Branded Header */}
      <div className="px-4 py-3 bg-muted flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <EyeIcon className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-semibold">{property.name}</p>
            <p className="text-xs text-muted-foreground">360° Virtual Tour</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <XIcon className="w-5 h-5" />
        </Button>
      </div>

      {/* Tour Container */}
      <div className="relative aspect-video bg-black">
        {!isLoaded ? (
          <TourPreview
            thumbnail={property.thumbnail}
            isLoading={isLoading}
            onLoad={loadTour}
          />
        ) : (
          <>
            {property.tourProvider === 'matterport' && (
              <MatterportEmbed spaceId={extractMatterportId(property.tourUrl)} />
            )}
            {property.tourProvider === 'kuula' && (
              <KuulaEmbed url={property.tourUrl} />
            )}
            {property.tourProvider === 'generic' && (
              <iframe
                src={property.tourUrl}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; xr-spatial-tracking"
                allowFullScreen
                loading="lazy"
              />
            )}
          </>
        )}
      </div>

      {/* Branding Footer */}
      <div className="px-4 py-2 bg-muted/50 flex items-center justify-center gap-2">
        <Building2 className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">
          Presented by Straits Advisory
        </span>
      </div>
    </div>
  );
}

// Preview state with load CTA
function TourPreview({ thumbnail, isLoading, onLoad }) {
  return (
    <div className="absolute inset-0">
      <img
        src={thumbnail}
        alt="Tour preview"
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white animate-spin" />
            <p className="text-white font-medium">Loading tour...</p>
          </div>
        ) : (
          <button onClick={onLoad} className="group flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-2xl group-active:scale-95 transition-transform">
              <PlayIcon className="w-8 h-8 text-primary-foreground ml-1" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-lg">Start Virtual Tour</p>
              <p className="text-white/70 text-sm">Tap to explore in 360°</p>
            </div>
          </button>
        )}
      </div>

      {/* Data saver notice */}
      {!isLoading && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-primary" />
            <p className="text-xs text-muted-foreground">
              Tour loads on tap to save data & battery
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Matterport SDK Integration
```tsx
// components/tours/MatterportEmbed.tsx
'use client';
import { useEffect, useRef } from 'react';

interface MatterportEmbedProps {
  spaceId: string;
  onReady?: () => void;
}

export default function MatterportEmbed({ spaceId, onReady }: MatterportEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // For basic embedding, iframe is sufficient
    // For SDK features (navigation, measurements), use @matterport/sdk
    if (onReady) onReady();
  }, [onReady]);

  return (
    <iframe
      ref={iframeRef}
      src={`https://my.matterport.com/show/?m=${spaceId}&play=1&qs=1&brand=0`}
      className="absolute inset-0 w-full h-full border-0"
      allow="xr-spatial-tracking; gyroscope; accelerometer"
      allowFullScreen
    />
  );
}

// URL params explanation:
// play=1    - Auto-start tour
// qs=1      - Quick start (skip intro)
// brand=0   - Hide Matterport branding (requires paid plan)
```

### Kuula Embed
```tsx
// components/tours/KuulaEmbed.tsx
'use client';

export default function KuulaEmbed({ url }: { url: string }) {
  // Add initload=1 for user-initiated loading
  const embedUrl = url.includes('?') ? `${url}&initload=1` : `${url}?initload=1`;

  return (
    <iframe
      src={embedUrl}
      className="absolute inset-0 w-full h-full border-0"
      allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
      allowFullScreen
    />
  );
}
```

---

## Interactive Map Implementation

### MapLibre Setup (Free Mapbox Alternative)
```tsx
// components/maps/InteractiveMap.tsx
'use client';
import { useState, useCallback, useMemo } from 'react';
import Map, { Marker, Popup, Source, Layer, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY;

// JB center coordinates
const INITIAL_VIEW = {
  longitude: 103.7500,
  latitude: 1.4927,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

interface Property {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  price: { sgd: number; myr: number };
  rtsDistance: string;
}

export function InteractiveMap({ properties }: { properties: Property[] }) {
  const [viewState, setViewState] = useState(INITIAL_VIEW);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  // Fly to property with animation
  const flyToProperty = useCallback((property: Property) => {
    setViewState({
      ...viewState,
      longitude: property.coordinates[0],
      latitude: property.coordinates[1],
      zoom: 15,
      pitch: 60,
      bearing: 30,
      transitionDuration: 2000,
    });
    setSelectedProperty(property);
  }, [viewState]);

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle={`https://api.maptiler.com/maps/streets-v2-dark/style.json?key=${MAPTILER_KEY}`}
      attributionControl={false}
    >
      <NavigationControl position="top-right" />

      {/* District boundaries layer */}
      <Source id="districts" type="geojson" data="/geojson/jb-districts.geojson">
        <Layer
          id="district-fill"
          type="fill"
          paint={{
            'fill-color': [
              'case',
              ['==', ['get', 'name'], hoveredDistrict],
              'rgba(59, 130, 246, 0.3)',
              'rgba(59, 130, 246, 0.1)',
            ],
            'fill-outline-color': 'rgba(59, 130, 246, 0.8)',
          }}
        />
      </Source>

      {/* RTS Line visualization */}
      <Source id="rts-line" type="geojson" data="/geojson/rts-route.geojson">
        <Layer
          id="rts-line-layer"
          type="line"
          paint={{
            'line-color': '#f59e0b',
            'line-width': 4,
            'line-dasharray': [2, 1],
          }}
        />
      </Source>

      {/* Property markers */}
      {properties.map((property) => (
        <Marker
          key={property.id}
          longitude={property.coordinates[0]}
          latitude={property.coordinates[1]}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            flyToProperty(property);
          }}
        >
          <PropertyMarker
            price={property.price.sgd}
            isSelected={selectedProperty?.id === property.id}
          />
        </Marker>
      ))}

      {/* Property popup */}
      {selectedProperty && (
        <Popup
          longitude={selectedProperty.coordinates[0]}
          latitude={selectedProperty.coordinates[1]}
          anchor="bottom"
          offset={25}
          onClose={() => setSelectedProperty(null)}
          closeButton={false}
          className="property-popup"
        >
          <PropertyPopupContent property={selectedProperty} />
        </Popup>
      )}
    </Map>
  );
}
```

### Custom Animated Marker
```tsx
// components/maps/PropertyMarker.tsx
'use client';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/currency';

interface PropertyMarkerProps {
  price: number;
  isSelected: boolean;
}

export function PropertyMarker({ price, isSelected }: PropertyMarkerProps) {
  return (
    <motion.div
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      className={`
        cursor-pointer transition-all duration-200
        ${isSelected ? 'z-10' : 'z-0'}
      `}
    >
      <div
        className={`
          px-3 py-1.5 rounded-full font-semibold text-sm whitespace-nowrap
          shadow-lg transition-colors duration-200
          ${isSelected
            ? 'bg-primary text-primary-foreground scale-110'
            : 'bg-background text-foreground hover:bg-primary hover:text-primary-foreground'
          }
        `}
      >
        S${(price / 1000).toFixed(0)}K
      </div>
      {/* Marker pin */}
      <div
        className={`
          w-3 h-3 rotate-45 mx-auto -mt-1.5
          transition-colors duration-200
          ${isSelected ? 'bg-primary' : 'bg-background'}
        `}
      />
    </motion.div>
  );
}
```

### Geospatial Calculations with Turf.js
```tsx
// lib/maps.ts
import * as turf from '@turf/turf';

// Calculate distance from property to RTS station
export function distanceToRTS(propertyCoords: [number, number]): string {
  const rtsStation = turf.point([103.7644, 1.4469]); // Bukit Chagar RTS
  const property = turf.point(propertyCoords);
  
  const distance = turf.distance(rtsStation, property, { units: 'kilometers' });
  
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
}

// Check if property is within district
export function isInDistrict(
  propertyCoords: [number, number],
  districtPolygon: GeoJSON.Feature
): boolean {
  const point = turf.point(propertyCoords);
  return turf.booleanPointInPolygon(point, districtPolygon);
}

// Get properties within radius
export function propertiesWithinRadius(
  center: [number, number],
  properties: Property[],
  radiusKm: number
): Property[] {
  const centerPoint = turf.point(center);
  
  return properties.filter((property) => {
    const propertyPoint = turf.point(property.coordinates);
    const distance = turf.distance(centerPoint, propertyPoint, { units: 'kilometers' });
    return distance <= radiusKm;
  });
}
```

---

## Internationalization & Currency

### next-intl Configuration
```tsx
// i18n.ts
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en-SG', 'zh-SG', 'ms-MY'] as const;
export const defaultLocale = 'en-SG' as const;

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));
```

### Middleware for Locale Detection
```tsx
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true, // Auto-detect from Accept-Language header
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
```

### Translation Files Structure
```json
// messages/en-SG.json
{
  "common": {
    "viewProperties": "View Properties",
    "bookViewing": "Book Viewing",
    "whatsappUs": "WhatsApp Us",
    "learnMore": "Learn More"
  },
  "home": {
    "hero": {
      "title": "Singapore Living, Johor Prices",
      "subtitle": "Premium JB properties from S$300K. 5-minute RTS commute to Singapore.",
      "badge": "RTS Link 2026"
    },
    "comparison": {
      "title": "S$1.5M in Singapore vs JB",
      "singapore": "Singapore",
      "johorBahru": "Johor Bahru",
      "betterValue": "Better Value"
    }
  },
  "property": {
    "yield": "{value} yield",
    "rtsDistance": "{distance} to RTS",
    "freehold": "Freehold",
    "leasehold": "{years}-year lease",
    "beds": "{count} Beds",
    "baths": "{count} Baths"
  },
  "calculator": {
    "title": "Corridor Calculator",
    "subtitle": "See what your Singapore budget buys in JB",
    "budget": "Your Budget (SGD)"
  }
}
```

```json
// messages/zh-SG.json
{
  "common": {
    "viewProperties": "查看房产",
    "bookViewing": "预约看房",
    "whatsappUs": "WhatsApp联系",
    "learnMore": "了解更多"
  },
  "home": {
    "hero": {
      "title": "新加坡生活，新山价格",
      "subtitle": "优质新山房产，低至S$30万。RTS轻轨5分钟通勤新加坡。",
      "badge": "RTS轻轨2026"
    }
  }
}
```

### Currency Conversion Hook
```tsx
// hooks/useCurrency.ts
'use client';
import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';

interface ExchangeRates {
  SGD: number;
  MYR: number;
  USD: number;
}

const CACHE_KEY = 'exchange_rates';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export function useCurrency() {
  const locale = useLocale();
  const [rates, setRates] = useState<ExchangeRates | null>(null);

  // Determine default currency from locale
  const defaultCurrency = locale.includes('MY') ? 'MYR' : 'SGD';
  const [currency, setCurrency] = useState(defaultCurrency);

  useEffect(() => {
    async function fetchRates() {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setRates(data);
          return;
        }
      }

      // Fetch fresh rates
      const res = await fetch('/api/exchange-rates');
      const data = await res.json();
      
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: data.rates,
        timestamp: Date.now(),
      }));
      
      setRates(data.rates);
    }

    fetchRates();
  }, []);

  // Format price in selected currency
  const formatPrice = useCallback(
    (priceInSGD: number): string => {
      if (!rates) {
        // Fallback formatting without conversion
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: 'SGD',
          maximumFractionDigits: 0,
        }).format(priceInSGD);
      }

      const converted = currency === 'SGD'
        ? priceInSGD
        : priceInSGD * (rates.MYR / rates.SGD);

      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(converted);
    },
    [rates, currency, locale]
  );

  // Format with both currencies
  const formatDualPrice = useCallback(
    (priceInSGD: number): { primary: string; secondary: string } => {
      const myrRate = rates?.MYR || 3.35; // Fallback rate
      const priceInMYR = priceInSGD * myrRate;

      return {
        primary: new Intl.NumberFormat('en-SG', {
          style: 'currency',
          currency: 'SGD',
          maximumFractionDigits: 0,
        }).format(priceInSGD),
        secondary: new Intl.NumberFormat('ms-MY', {
          style: 'currency',
          currency: 'MYR',
          maximumFractionDigits: 0,
        }).format(priceInMYR),
      };
    },
    [rates]
  );

  return {
    currency,
    setCurrency,
    formatPrice,
    formatDualPrice,
    isLoading: !rates,
  };
}
```

### Exchange Rate API Route
```tsx
// app/api/exchange-rates/route.ts
import { NextResponse } from 'next/server';

const EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest/SGD';

// Cache rates server-side
let cachedRates: { rates: any; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET() {
  // Return cached if fresh
  if (cachedRates && Date.now() - cachedRates.timestamp < CACHE_DURATION) {
    return NextResponse.json({ rates: cachedRates.rates });
  }

  try {
    const res = await fetch(EXCHANGE_API_URL);
    const data = await res.json();

    cachedRates = {
      rates: {
        SGD: 1,
        MYR: data.rates.MYR,
        USD: data.rates.USD,
      },
      timestamp: Date.now(),
    };

    return NextResponse.json({ rates: cachedRates.rates });
  } catch (error) {
    // Fallback rates if API fails
    return NextResponse.json({
      rates: { SGD: 1, MYR: 3.35, USD: 0.74 },
    });
  }
}
```

---

## Performance Guidelines

### Code Splitting for Heavy Libraries
```tsx
// ALWAYS use dynamic imports for:
// - React Three Fiber components
// - Map components
// - Virtual tour embeds

// ❌ DON'T
import { Canvas } from '@react-three/fiber';
import Map from 'react-map-gl/maplibre';

// ✅ DO
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

const Map = dynamic(
  () => import('react-map-gl/maplibre'),
  { ssr: false, loading: () => <MapSkeleton /> }
);
```

### GSAP Optimal Imports
```tsx
// lib/gsap.ts
// Import from specific modules to enable tree-shaking

import { gsap } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip'; // Only if using Flip animations

// Register plugins once
gsap.registerPlugin(ScrollTrigger, Flip);

// Configure for performance
gsap.config({
  autoSleep: 60,
  nullTargetWarn: false,
});

export { gsap, ScrollTrigger, Flip };
```

### R3F Performance Settings
```tsx
// For 3D scenes, always include performance optimizations

<Canvas
  frameloop="demand"           // Only render when needed
  dpr={[1, 1.5]}              // Limit pixel ratio on mobile
  performance={{ min: 0.5 }}  // Adaptive performance
  gl={{ antialias: false }}   // Disable on mobile for performance
>
  <Suspense fallback={<LoadingSpinner />}>
    <Scene />
  </Suspense>
</Canvas>

// Check for low-power devices
const isLowPower = typeof navigator !== 'undefined' && 
  (navigator.connection?.saveData || window.innerWidth < 768);

// Conditionally render 3D
{!isLowPower && <Canvas>...</Canvas>}
```

### Image Optimization
```tsx
// Use Next.js Image with blur placeholder
import Image from 'next/image';

<Image
  src="/property-hero.jpg"
  alt="Property"
  fill
  priority                          // For above-fold images
  placeholder="blur"
  blurDataURL={blurDataUrl}        // Generate with plaiceholder
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// For property galleries, use loading="lazy"
<Image
  src={property.image}
  alt={property.name}
  width={800}
  height={600}
  loading="lazy"
  className="object-cover"
/>
```

---

## Component Patterns

### Shadcn/ui Installation
```bash
# Install base components
npx shadcn@latest init

# Add commonly used components
npx shadcn@latest add button card dialog drawer sheet
npx shadcn@latest add form input label select textarea
npx shadcn@latest add toast sonner
npx shadcn@latest add tabs accordion carousel
```

### Animated Dialog with Vaul
```tsx
// For mobile-first drawers that feel native
import { Drawer } from 'vaul';

export function MobilePropertyDrawer({ property, open, onClose }) {
  return (
    <Drawer.Root open={open} onOpenChange={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-background rounded-t-[20px] max-h-[85vh]">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted my-4" />
          <PropertyDetail property={property} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

### Toast Notifications with Sonner
```tsx
// Sonner is already styled for premium feel
import { toast } from 'sonner';

// Success
toast.success('Property saved to favorites');

// With action
toast('Viewing request sent', {
  description: 'Our specialist will contact you within 24 hours.',
  action: {
    label: 'View details',
    onClick: () => router.push('/bookings'),
  },
});
```

---

## Environment Variables

```env
# .env.local

# Maps
NEXT_PUBLIC_MAPTILER_KEY=your_maptiler_key

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Virtual Tours (if using Matterport SDK)
NEXT_PUBLIC_MATTERPORT_SDK_KEY=your_matterport_key

# Exchange Rates (optional - has free tier)
EXCHANGE_RATE_API_KEY=your_api_key

# CMS/Database (future)
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server (Turbopack)
npm run build            # Production build
npm run start            # Start production server

# Analysis
ANALYZE=true npm run build   # Bundle analysis

# Components
npx shadcn@latest add [component]   # Add shadcn component

# i18n
npm run extract-messages   # Extract translation keys (if configured)

# Linting
npm run lint             # ESLint
npm run typecheck        # TypeScript check
```

---

## File Naming Conventions

- Components: `PascalCase.tsx` (e.g., `PropertyCard.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useCurrency.ts`)
- Utils: `camelCase.ts` (e.g., `formatPrice.ts`)
- Types: `types.ts` or inline in component files
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `const DEFAULT_ZOOM = 12`)

---

## Key Reminders for Claude Code

1. **Always use `'use client'`** for components with:
   - useState, useEffect, useRef
   - Event handlers (onClick, onChange)
   - Browser APIs (window, document, navigator)
   - Animation libraries (GSAP, Framer Motion)

2. **Always use dynamic imports with `ssr: false`** for:
   - React Three Fiber / Three.js
   - MapLibre / react-map-gl
   - Virtual tour embeds

3. **Always clean up** GSAP ScrollTriggers and Lenis in useEffect/useLayoutEffect return

4. **Always lazy load** virtual tours - never auto-load iframes

5. **Always provide fallbacks** for 3D/maps on low-power devices

6. **Use native Intl API** for formatting - zero bundle cost

7. **Test on mobile first** - all animations must hit 60fps on mid-range phones
