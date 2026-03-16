'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Building2,
  Train,
  TrendingUp,
  ChevronRight,
  Layers,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { properties, Property } from '@/lib/properties';
import { useCurrency } from '@/hooks/useCurrency';

// Dynamically import the map to avoid SSR issues
const InteractiveMap = dynamic(
  () =>
    import('@/components/maps/InteractiveMap').then((mod) => mod.InteractiveMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    ),
  }
);

interface District {
  name: string;
  description: string;
  rtsDistance: string;
  avgPrice: string;
  propertyCount: number;
  properties: Property[];
}

const districts: Record<string, District> = {
  'Bukit Chagar': {
    name: 'Bukit Chagar',
    description: 'RTS Station Area - Premium transit-oriented development zone',
    rtsDistance: '0-500m',
    avgPrice: 'S$500K - S$800K',
    propertyCount: 0,
    properties: [],
  },
  'Danga Bay': {
    name: 'Danga Bay',
    description: 'Waterfront living with sea views and lifestyle amenities',
    rtsDistance: '2-3km',
    avgPrice: 'S$450K - S$700K',
    propertyCount: 0,
    properties: [],
  },
  'City Centre': {
    name: 'City Centre',
    description: 'JB Central - Urban core with shopping and entertainment',
    rtsDistance: '1-2km',
    avgPrice: 'S$400K - S$600K',
    propertyCount: 0,
    properties: [],
  },
  'Tanjung Puteri': {
    name: 'Tanjung Puteri',
    description: 'Established residential area with mature amenities',
    rtsDistance: '3-5km',
    avgPrice: 'S$350K - S$550K',
    propertyCount: 0,
    properties: [],
  },
  'Medini': {
    name: 'Medini Iskandar',
    description: 'Modern township with tax incentives and international schools',
    rtsDistance: '5-8km',
    avgPrice: 'S$300K - S$500K',
    propertyCount: 0,
    properties: [],
  },
};

// Map properties to districts
Object.keys(districts).forEach((districtName) => {
  const districtProperties = properties.filter(
    (p) =>
      p.area.toLowerCase().includes(districtName.toLowerCase()) ||
      districtName.toLowerCase().includes(p.area.toLowerCase())
  );
  districts[districtName].properties = districtProperties;
  districts[districtName].propertyCount = districtProperties.length;
});

function PropertyMiniCard({ property }: { property: Property }) {
  const locale = useLocale();
  const { formatDualPrice } = useCurrency();
  const prices = formatDualPrice(property.price.sgd);

  return (
    <Link href={`/${locale}/properties/${property.slug}`}>
      <Card className="p-3 hover:bg-muted/50 transition-colors cursor-pointer">
        <div className="flex gap-3">
          <div className="w-20 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{property.name}</h4>
            <p className="text-xs text-muted-foreground">{property.area}</p>
            <p className="text-sm font-semibold text-primary mt-1">
              {prices.primary}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground self-center" />
        </div>
      </Card>
    </Link>
  );
}

export default function MapPage() {
  const locale = useLocale();
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );
  const [showPanel, setShowPanel] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleDistrictSelect = useCallback((districtName: string) => {
    const district = districts[districtName];
    if (district) {
      setSelectedDistrict(district);
      setShowPanel(true);
    }
  }, []);

  const handlePropertySelect = useCallback((property: Property) => {
    // Find the district for this property
    const districtName = Object.keys(districts).find(
      (name) =>
        property.area.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(property.area.toLowerCase())
    );
    if (districtName) {
      handleDistrictSelect(districtName);
    }
  }, [handleDistrictSelect]);

  const filteredProperties =
    activeFilter === 'all'
      ? properties
      : properties.filter((p) => p.category === activeFilter);

  return (
    <main className="h-screen pt-16 relative">
      {/* Filter Bar */}
      <div className="absolute top-20 left-4 right-4 z-10 flex gap-2 overflow-x-auto pb-2">
        {['all', 'luxury', 'waterfront', 'city', 'resort'].map((filter) => (
          <Button
            key={filter}
            size="sm"
            variant={activeFilter === filter ? 'default' : 'secondary'}
            onClick={() => setActiveFilter(filter)}
            className="rounded-full capitalize whitespace-nowrap shadow-lg"
          >
            {filter === 'all' ? 'All Properties' : filter}
          </Button>
        ))}
      </div>

      {/* Map */}
      <div className="w-full h-full">
        <InteractiveMap />
      </div>

      {/* Mobile: District Panel Trigger */}
      <Sheet open={showPanel} onOpenChange={setShowPanel}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {selectedDistrict?.name || 'Select a District'}
            </SheetTitle>
          </SheetHeader>

          {selectedDistrict && (
            <div className="mt-4 space-y-6 overflow-y-auto h-[calc(100%-80px)]">
              {/* District Info */}
              <div>
                <p className="text-muted-foreground">
                  {selectedDistrict.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Train className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">To RTS</p>
                  <p className="font-semibold text-sm">
                    {selectedDistrict.rtsDistance}
                  </p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <TrendingUp className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Avg Price</p>
                  <p className="font-semibold text-sm">
                    {selectedDistrict.avgPrice}
                  </p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Properties</p>
                  <p className="font-semibold text-sm">
                    {selectedDistrict.propertyCount}
                  </p>
                </div>
              </div>

              {/* Properties in District */}
              {selectedDistrict.properties.length > 0 ? (
                <div>
                  <h3 className="font-semibold mb-3">
                    Properties in {selectedDistrict.name}
                  </h3>
                  <div className="space-y-3">
                    {selectedDistrict.properties.map((property) => (
                      <PropertyMiniCard key={property.id} property={property} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No properties currently available in this district
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setShowPanel(false)}
                  >
                    Explore Other Areas
                  </Button>
                </div>
              )}

              {/* View All CTA */}
              {selectedDistrict.properties.length > 0 && (
                <Button className="w-full" asChild>
                  <Link href={`/${locale}/properties?area=${selectedDistrict.name}`}>
                    View All in {selectedDistrict.name}
                  </Link>
                </Button>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Desktop: Side Panel */}
      <AnimatePresence>
        {selectedDistrict && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="hidden lg:block absolute top-20 right-4 bottom-4 w-96 z-10"
          >
            <Card className="h-full overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{selectedDistrict.name}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedDistrict(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <p className="text-muted-foreground">
                  {selectedDistrict.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Train className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-xs text-muted-foreground">To RTS</p>
                    <p className="font-semibold text-sm">
                      {selectedDistrict.rtsDistance}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <TrendingUp className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-xs text-muted-foreground">Avg Price</p>
                    <p className="font-semibold text-sm">
                      {selectedDistrict.avgPrice}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Building2 className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-xs text-muted-foreground">Properties</p>
                    <p className="font-semibold text-sm">
                      {selectedDistrict.propertyCount}
                    </p>
                  </div>
                </div>

                {/* Properties */}
                {selectedDistrict.properties.length > 0 ? (
                  <div>
                    <h4 className="font-semibold mb-3">Available Properties</h4>
                    <div className="space-y-3">
                      {selectedDistrict.properties.map((property) => (
                        <PropertyMiniCard
                          key={property.id}
                          property={property}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Building2 className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">
                      No properties currently available
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {selectedDistrict.properties.length > 0 && (
                <div className="p-4 border-t">
                  <Button className="w-full" asChild>
                    <Link
                      href={`/${locale}/properties?area=${selectedDistrict.name}`}
                    >
                      View All Properties
                    </Link>
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* District Quick Select (Bottom) */}
      <div className="absolute bottom-4 left-4 right-4 z-10 lg:left-4 lg:right-auto lg:w-80">
        <Card className="p-3">
          <p className="text-xs text-muted-foreground mb-2 font-medium">
            Quick Select District
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(districts).map((name) => (
              <Button
                key={name}
                size="sm"
                variant={selectedDistrict?.name === name ? 'default' : 'outline'}
                onClick={() => handleDistrictSelect(name)}
                className="text-xs"
              >
                {name}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
