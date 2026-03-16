'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Heart, MapPin, BedDouble, Bath, Maximize, ImageOff } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';

interface PropertyCardProps {
  property: {
    id: string;
    slug: string;
    name: string;
    area: string;
    price: {
      sgd: number;
      myr: number;
    };
    priceRange?: string;
    specs: {
      beds: number | string;
      baths: number | string;
      size: number | string;
    };
    yield: number;
    rtsDistance: string;
    image: string;
    tourUrl?: string;
    status?: 'available' | 'limited' | 'sold-out' | 'coming-soon';
  };
}

// Status badge configuration
const statusConfig = {
  'sold-out': {
    label: 'SOLD OUT',
    bgColor: 'bg-gray-500',
    textColor: 'text-white',
  },
  'limited': {
    label: 'LIMITED UNITS',
    bgColor: 'bg-amber-500',
    textColor: 'text-white',
  },
  'coming-soon': {
    label: 'COMING SOON',
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
  },
  'available': {
    label: 'AVAILABLE',
    bgColor: 'bg-emerald-500',
    textColor: 'text-white',
  },
};

export function PropertyCard({ property }: PropertyCardProps) {
  const router = useRouter();
  const locale = useLocale();
  const { formatDualPrice } = useCurrency();
  const [isSaved, setIsSaved] = useState(false);
  const [imageError, setImageError] = useState(false);

  const prices = formatDualPrice(property.price.sgd);

  const handleClick = () => {
    router.push(`/${locale}/properties/${property.slug}`);
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  // Get status badge config
  const status = property.status || 'available';
  const statusBadge = statusConfig[status];

  // Check if specs are numeric or strings
  const hasNumericSpecs = typeof property.specs.beds === 'number' &&
                          typeof property.specs.baths === 'number' &&
                          typeof property.specs.size === 'number';

  const specsAreZero = hasNumericSpecs &&
    property.specs.beds === 0 &&
    property.specs.baths === 0 &&
    property.specs.size === 0;

  const specsAreTBD = !hasNumericSpecs &&
    (property.specs.beds === 'TBD' || property.specs.size === 'TBD');

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="group cursor-pointer bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {!imageError ? (
          <Image
            src={property.image}
            alt={property.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <ImageOff className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">Image unavailable</p>
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Status Badge - top left */}
        {status !== 'available' && (
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1.5 ${statusBadge.bgColor} ${statusBadge.textColor} text-xs font-bold rounded-full shadow-lg`}>
              {statusBadge.label}
            </span>
          </div>
        )}

        {/* Yield badge - top left (only show if yield > 0 and status is available/limited) */}
        {property.yield > 0 && status === 'available' && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">
              {property.yield}% yield
            </span>
          </div>
        )}

        {/* Yield badge for limited status - show next to status */}
        {property.yield > 0 && status === 'limited' && (
          <div className="absolute top-3 left-36">
            <span className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">
              {property.yield}% yield
            </span>
          </div>
        )}

        {/* Save button - top right */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSaveToggle}
          className="absolute top-3 right-3 w-9 h-9 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-colors"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isSaved
                ? 'fill-red-500 text-red-500'
                : 'text-muted-foreground hover:text-red-500'
            }`}
          />
        </motion.button>

        {/* RTS Distance badge - bottom left */}
        {property.rtsDistance && property.rtsDistance !== 'TBD' && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 bg-background/90 backdrop-blur-sm text-xs font-medium rounded-full shadow-lg">
              {property.rtsDistance} to RTS
            </span>
          </div>
        )}

        {/* Virtual tour indicator */}
        {property.tourUrl && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2.5 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-full shadow-lg">
              360° Tour
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Property name */}
        <h3 className="font-semibold text-lg truncate">{property.name}</h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm truncate">{property.area}</span>
        </div>

        {/* Price */}
        <div className="mt-3">
          {property.price.sgd > 0 ? (
            <>
              <p className="text-2xl font-bold">
                {property.priceRange || prices.primary}
              </p>
              {!property.priceRange && (
                <p className="text-sm text-muted-foreground">{prices.secondary}</p>
              )}
            </>
          ) : (
            <p className="text-2xl font-bold text-primary">
              {property.priceRange || 'Price Coming Soon'}
            </p>
          )}
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t text-sm text-muted-foreground">
          {specsAreZero || specsAreTBD ? (
            <span className="text-muted-foreground">Details coming soon</span>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4" />
                <span>{property.specs.beds} Beds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4" />
                <span>{property.specs.baths} Baths</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize className="w-4 h-4" />
                <span>{property.specs.size} sqft</span>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}
