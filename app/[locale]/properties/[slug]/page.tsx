'use client';

import { useState, use, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Share2,
  Play,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Train,
  Percent,
  Calendar,
  Shield,
  Check,
  MessageCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
  X,
  ImageOff,
  Building2,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { VirtualTourViewer } from '@/components/tours/VirtualTourViewer';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { useCurrency } from '@/hooks/useCurrency';
import { getPropertyBySlug } from '@/lib/properties';
import { notFound } from 'next/navigation';

interface PropertyDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// Status badge configuration
const statusConfig = {
  'sold-out': {
    label: 'SOLD OUT',
    bgColor: 'bg-gray-500',
    textColor: 'text-white',
  },
  'limited': {
    label: 'LIMITED UNITS AVAILABLE',
    bgColor: 'bg-[#D4C4A8]',
    textColor: 'text-white',
  },
  'coming-soon': {
    label: 'COMING SOON',
    bgColor: 'bg-[#5289AD]',
    textColor: 'text-white',
  },
  'available': {
    label: 'AVAILABLE NOW',
    bgColor: 'bg-[#5289AD]',
    textColor: 'text-white',
  },
};

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug, locale } = use(params);
  const router = useRouter();
  const t = useTranslations('property');
  const { formatDualPrice } = useCurrency();

  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const [isSaved, setIsSaved] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const prices = formatDualPrice(property.price.sgd);

  // Get status
  const status = property.status || 'available';
  const statusBadge = statusConfig[status];

  // Handle image load errors
  const handleImageError = useCallback((index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  }, []);

  // Get current image URL or fallback to main image
  const getCurrentImageUrl = (index: number) => {
    if (failedImages.has(index)) {
      return null;
    }
    if (property.images.length === 0) {
      return property.image;
    }
    return property.images[index] || property.image;
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: property.name,
        text: `Check out ${property.name} - ${property.priceRange || prices.primary}`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const nextImage = () => {
    const maxIndex = property.images.length > 0 ? property.images.length - 1 : 0;
    setCurrentImageIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const prevImage = () => {
    const maxIndex = property.images.length > 0 ? property.images.length - 1 : 0;
    setCurrentImageIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // Check if specs are valid
  const hasValidSpecs = property.specs.beds !== 'TBD' &&
    property.specs.baths !== 'TBD' &&
    property.specs.size !== 'TBD' &&
    property.specs.beds !== 0;

  // Build key features, filtering out TBD/zero values
  const keyFeatures = [
    {
      icon: Train,
      label: 'RTS Distance',
      value: property.rtsDistance,
      show: property.rtsDistance && property.rtsDistance !== 'TBD',
    },
    {
      icon: Percent,
      label: 'Rental Yield',
      value: property.yield > 0 ? `${property.yield}%` : 'TBD',
      show: property.yield > 0,
    },
    {
      icon: Shield,
      label: 'Tenure',
      value: property.tenure === 'Freehold' || property.tenure === 'freehold'
        ? 'Freehold'
        : property.tenure === 'TBD'
        ? 'TBD'
        : property.tenure,
      show: property.tenure && property.tenure !== 'TBD',
    },
    {
      icon: Calendar,
      label: 'Status',
      value: property.completionYear || property.completion || 'TBD',
      show: (property.completionYear && property.completionYear !== 'TBD') ||
            (property.completion && property.completion !== 'TBD'),
    },
  ].filter(f => f.show);

  // Images to display
  const imagesToShow = property.images.length > 0 ? property.images : [property.image];

  return (
    <>
      <main className="min-h-screen pb-24">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] md:h-[60vh]">
          {/* Main Image */}
          {getCurrentImageUrl(currentImageIndex) ? (
            <Image
              src={getCurrentImageUrl(currentImageIndex)!}
              alt={property.name}
              fill
              priority
              className="object-cover"
              onError={() => handleImageError(currentImageIndex)}
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <ImageOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Image unavailable</p>
                <p className="text-sm">{property.name}</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

          {/* Navigation Controls - only show if multiple images */}
          {imagesToShow.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevImage}
                className="bg-black/30 hover:bg-black/50 text-white rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextImage}
                className="bg-black/30 hover:bg-black/50 text-white rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          )}

          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="bg-black/30 hover:bg-black/50 text-white rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            {/* Status Badge */}
            <div className={`px-4 py-2 ${statusBadge.bgColor} ${statusBadge.textColor} rounded-full font-bold text-sm`}>
              {statusBadge.label}
            </div>

            {/* Save & Share */}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSaved(!isSaved)}
                className="bg-black/30 hover:bg-black/50 text-white rounded-full"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isSaved ? 'fill-[#5289AD] text-[#5289AD]' : ''
                  }`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="bg-black/30 hover:bg-black/50 text-white rounded-full"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Hero Title & Virtual Tour Button */}
          <div className="absolute bottom-16 left-0 right-0 z-20 text-center px-4">
            {/* Property Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              {property.name}
            </h1>

            {/* Virtual Tour Button */}
            {property.tourUrl && (
              <Button
                onClick={() => setShowTour(true)}
                className="rounded-full px-6 gap-2"
              >
                <Play className="w-5 h-5" />
                Start Virtual Tour
              </Button>
            )}

            {/* Image Counter - only show if multiple images */}
            {imagesToShow.length > 1 && (
              <div className="mt-4">
                <div className="inline-flex gap-1.5">
                  {imagesToShow.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex
                          ? 'bg-white'
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Property Info Card */}
            <ScrollReveal>
              <Card className="p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-1">
                      {property.name}
                    </h2>
                    {property.nameZh && (
                      <p className="text-lg text-muted-foreground mb-2">
                        {property.nameZh}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {property.area}{property.district ? `, ${property.district}` : ''}
                      </span>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    {property.price.sgd > 0 ? (
                      <>
                        <p className="text-3xl font-bold text-primary">
                          {property.priceRange || prices.primary}
                        </p>
                        {!property.priceRange && (
                          <p className="text-muted-foreground">{prices.secondary}</p>
                        )}
                      </>
                    ) : (
                      <p className="text-3xl font-bold text-primary">
                        {property.priceRange || 'Price Coming Soon'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Specs */}
                <div className="flex flex-wrap gap-6 pb-6 border-b">
                  {hasValidSpecs ? (
                    <>
                      <div className="flex items-center gap-2">
                        <BedDouble className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">
                          {property.specs.beds} Beds
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">
                          {property.specs.baths} Baths
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Maximize className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">
                          {property.specs.size} sqft
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="text-muted-foreground">
                      Property specifications coming soon
                    </span>
                  )}
                </div>

                {/* Key Features */}
                {keyFeatures.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                    {keyFeatures.map((feature) => (
                      <div key={feature.label} className="text-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                          <feature.icon className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {feature.label}
                        </p>
                        <p className="font-semibold">{feature.value}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pt-6 text-center text-muted-foreground">
                    Key features coming soon
                  </div>
                )}
              </Card>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal>
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">About This Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </Card>
            </ScrollReveal>

            {/* Unit Types */}
            {property.unitTypes && property.unitTypes.length > 0 && (
              <ScrollReveal>
                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    Available Unit Types
                  </h2>
                  <div className="space-y-4">
                    {property.unitTypes.map((unit, index) => (
                      <div
                        key={index}
                        className="p-4 bg-muted/50 rounded-lg border"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{unit.type}</h3>
                          <span className="text-primary font-medium">
                            {unit.size}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {unit.layouts.map((layout, layoutIndex) => (
                            <span
                              key={layoutIndex}
                              className="px-2 py-1 bg-background text-xs rounded-md border"
                            >
                              {layout}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            )}

            {/* Investment Highlights */}
            {property.highlights && property.highlights.length > 0 && (
              <ScrollReveal>
                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">
                    Investment Highlights
                  </h2>
                  <ul className="space-y-3">
                    {property.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            )}

            {/* Towers */}
            {property.towers && property.towers.length > 0 && (
              <ScrollReveal>
                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Towers
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {property.towers.map((tower, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/10 text-primary font-semibold rounded-lg"
                      >
                        Tower {tower}
                      </span>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            )}

            {/* Facilities */}
            {property.features && property.features.length > 0 && (
              <ScrollReveal>
                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Facilities & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {property.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check className="w-4 h-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            )}

            {/* Developer Info */}
            {property.developer && (
              <ScrollReveal>
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Developer</h2>
                  <p className="font-medium">{property.developer}</p>
                  {property.address && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {property.address}
                    </p>
                  )}
                </Card>
              </ScrollReveal>
            )}
          </div>
        </div>

        {/* Fixed Bottom CTA Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-40">
          <div className="container mx-auto max-w-4xl flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() =>
                window.open(
                  `https://wa.me/6591234567?text=Hi, I'm interested in ${property.name}`,
                  '_blank'
                )
              }
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
            <Button className="flex-1">
              <Phone className="w-5 h-5 mr-2" />
              {status === 'coming-soon' ? 'Register Interest' : 'Book Viewing'}
            </Button>
          </div>
        </div>
      </main>

      {/* Virtual Tour Dialog */}
      <Dialog open={showTour} onOpenChange={setShowTour}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            Virtual Tour - {property.name}
          </DialogTitle>
          {property.tourUrl && property.tourProvider && (
            <VirtualTourViewer
              property={{
                name: property.name,
                tourUrl: property.tourUrl,
                tourProvider: property.tourProvider,
                thumbnail: property.image,
              }}
              onClose={() => setShowTour(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
