import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MapPin, Zap, Shield, LayoutGrid, TrendingUp } from 'lucide-react';
import { getPropertyDetailData, getAllPropertySlugs } from '@/lib/property-detail-data';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { KeyInfoRow } from '@/components/property/KeyInfoRow';
import { PhaseSelector } from '@/components/property/PhaseSelector';
import { WhyWeRecommend } from '@/components/property/WhyWeRecommend';
import { UnitTypesViewer } from '@/components/property/UnitTypesViewer';
import { FacilitiesSection } from '@/components/property/FacilitiesSection';
import { RentalYieldChart } from '@/components/property/RentalYieldChart';
import { ConnectivitySection } from '@/components/property/ConnectivitySection';
import { MortgageCalculator } from '@/components/property/MortgageCalculator';
import { VirtualTourSection } from '@/components/property/VirtualTourSection';
import { LocationMap } from '@/components/property/LocationMap';
import { PropertyFAQ } from '@/components/property/PropertyFAQ';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = getAllPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getPropertyDetailData(slug);
  if (!data) return { title: 'Property Not Found' };

  const { property } = data;
  return {
    title: `${property.name} | Johor Bahru Property | Straits Advisory`,
    description: `${property.name} - ${property.priceRange || 'Price on enquiry'} ${property.tenure} in ${property.area}. ${property.description?.slice(0, 120)}`,
  };
}

// Icon components for WhyWeRecommend cards
function ZapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

const recommendIconMap: Record<string, React.ReactNode> = {
  '#059669': <ZapIcon />,
  '#d97706': <ShieldIcon />,
  '#7c3aed': <GridIcon />,
  '#db2777': <TrendIcon />,
};

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getPropertyDetailData(slug);

  if (!data) {
    notFound();
  }

  const {
    property,
    detailedUnits,
    facilities,
    rentalData,
    rentalSubtitle,
    toSingapore,
    withinJB,
    whyRecommend,
    phases,
    activePhase,
    brochureUrl,
    whatsappNumber = '60102038001',
  } = data;

  // Build key info items — keep values short for even row heights on mobile
  const rawCompletion = property.completionYear || property.completion || 'TBD';
  const completionShort = rawCompletion.length > 14
    ? rawCompletion.replace(/\s*\(.+?\)/g, '').trim() || 'Mixed'
    : rawCompletion;

  const keyInfoItems = [
    { icon: 'tenure', value: property.tenure || 'TBD', label: 'Tenure' },
    {
      icon: 'status',
      value: completionShort,
      label: 'Completion',
    },
    { icon: 'foreigners', value: 'Eligible', label: 'Foreigners' },
    {
      icon: 'entry',
      value: property.price.myr > 0 ? `From RM${(property.price.myr / 1000).toFixed(0)}K` : 'Enquire',
      label: 'Min. Entry',
    },
  ];

  // Status badge
  const statusLabel =
    property.status === 'coming-soon'
      ? 'New Project: 2029'
      : property.status === 'sold-out'
        ? 'Sold Out'
        : property.status === 'limited'
          ? 'Limited Units'
          : 'Available';

  const statusClass =
    property.status === 'coming-soon'
      ? 'bg-[#5289AD] text-[#5289AD] border-[#5289AD]'
      : property.status === 'sold-out'
        ? 'bg-gray-100 text-gray-600 border-gray-300'
        : property.status === 'limited'
          ? 'bg-[#D4C4A8] text-[#243C4C] border-[#D4C4A8]'
          : 'bg-[#5289AD] text-[#5289AD] border-[#5289AD]';

  return (
    <main className="min-h-screen bg-white">
      {/* Gallery — full bleed behind nav */}
      {property.images && property.images.length > 0 && (
        <div className="-mt-[80px] pt-0">
          <PropertyGallery images={property.images} />
        </div>
      )}

      {/* Breadcrumb */}
      <div className="px-[clamp(20px,5vw,60px)] py-4 text-[13px] text-muted-foreground border-b border-border">
        <Link href="/" className="hover:text-foreground transition-colors">
          Straits Advisory
        </Link>
        <span className="mx-1.5 text-border">&rsaquo;</span>
        <Link href="/properties" className="hover:text-foreground transition-colors">
          Buy
        </Link>
        <span className="mx-1.5 text-border">&rsaquo;</span>
        <span>{property.name}</span>
      </div>

      {/* Property Header — inline layout */}
      <div className="bg-white border-b border-border">
        <div className="px-[clamp(20px,5vw,60px)] py-8 max-w-[1200px] mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          {/* Left: Property Info */}
          <div>
            <h1 className="text-[clamp(24px,3.5vw,32px)] font-extrabold text-foreground leading-tight">
              {property.name}
            </h1>
            {property.nameZh && (
              <p className="text-sm text-muted-foreground mt-0.5">{property.nameZh}</p>
            )}
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-2">
              <MapPin className="w-4 h-4 text-muted-foreground/60" />
              {property.area}, {property.district || 'Johor Bahru'}, Johor
            </p>
          </div>

          {/* Right: Price + Developer + CTA */}
          <div className="flex flex-col items-start md:items-end gap-4 flex-shrink-0">
            {/* Price */}
            <div className="md:text-right">
              <div className="text-[13px] text-muted-foreground">Starting from</div>
              <div className="text-[26px] font-extrabold text-[#06457F]">
                {property.priceRange && property.priceRange !== 'Coming Soon'
                  ? property.priceRange
                  : property.price.myr > 0
                    ? `RM${property.price.myr.toLocaleString()}`
                    : 'Price On Enquiry'}
              </div>
            </div>

            {/* Enquire Now — full width */}
            <div className="mt-1 w-full md:w-[280px]">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I'm interested in ${property.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-6 py-3 rounded-[10px] text-sm font-semibold bg-[#5379AE] text-white hover:bg-[#06457F] transition-colors"
              >
                Enquire Now
              </a>
            </div>

            {/* Brochure download */}
            {brochureUrl && (
              <a
                href={brochureUrl}
                download
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold border border-[#5379AE]/20 text-[#5379AE] hover:bg-[#5379AE]/5 transition-colors w-full md:w-auto"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download E-Brochure
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Phase Selector */}
      {phases && activePhase && <PhaseSelector phases={phases} activePhase={activePhase} />}

      {/* Full-width content */}
      <div className="max-w-[1200px] mx-auto px-[clamp(20px,5vw,60px)] pt-8 pb-16">
        <div>

          {/* 1. Quick Stats Bar */}
          <div className="pb-8 border-b border-border">
            <KeyInfoRow items={keyInfoItems} />
          </div>

          {/* 2. Why We Recommend — HOOK */}
          {whyRecommend && (
            <WhyWeRecommend
              title={whyRecommend.title}
              subtitle={whyRecommend.subtitle}
              cards={whyRecommend.cards.map((card) => ({
                ...card,
                icon: recommendIconMap[card.color] || <ZapIcon />,
              }))}
            />
          )}

          {/* 3. Rental Income Performance — MONEY */}
          {rentalData && rentalData.length > 0 && (
            <RentalYieldChart data={rentalData} subtitle={rentalSubtitle} />
          )}

          {/* 4. Connectivity — LOCATION */}
          {toSingapore && withinJB && (
            <ConnectivitySection toSingapore={toSingapore} withinJB={withinJB} />
          )}

          {/* 5. Unit Types — PRODUCT */}
          {detailedUnits && detailedUnits.length > 0 && (
            <UnitTypesViewer units={detailedUnits} />
          )}

          {/* 6. Facilities & Amenities — LIFESTYLE */}
          {facilities && Object.keys(facilities).length > 0 && (
            <FacilitiesSection facilities={facilities} />
          )}

          {/* 7. Virtual Tour — EXPERIENCE */}
          {property.tourUrl && (
            <VirtualTourSection
              tourUrl={property.tourUrl}
              propertyName={property.name}
              thumbnailUrl={property.image}
            />
          )}

          {/* 8. Map — CONFIRM */}
          {property.coordinates && property.coordinates[0] !== 0 && (
            <LocationMap
              coordinates={property.coordinates}
              propertyName={property.name}
            />
          )}

          {/* 10. FAQ — OBJECTIONS */}
          <PropertyFAQ />


        </div>

      </div>

      {/* Sticky mobile contact bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[80] bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2.5 flex gap-2 items-center" style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground leading-none">From</div>
          <div className="text-[14px] font-extrabold text-[#06457F] truncate leading-tight">
            {property.priceRange && property.priceRange !== 'Coming Soon'
              ? property.priceRange.split('—')[0].trim()
              : property.price.myr > 0
                ? `RM${property.price.myr.toLocaleString()}`
                : 'On Enquiry'}
          </div>
        </div>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I'm interested in ${property.name}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 px-5 h-[44px] rounded-lg bg-[#25d366] text-white text-[14px] font-semibold"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.562 4.145 1.543 5.888L0 24l6.304-1.654A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.97 0-3.837-.53-5.445-1.455l-.39-.232-4.047 1.062 1.08-3.946-.254-.404A9.715 9.715 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
          </svg>
          WhatsApp
        </a>
        <a
          href={`tel:+${whatsappNumber}`}
          className="flex-shrink-0 inline-flex items-center justify-center w-[44px] h-[44px] rounded-lg border border-[#5379AE]/30 text-[#5379AE]"
          aria-label="Call"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
      </div>
      {/* Spacer so sticky bar doesn't cover content end */}
      <div className="md:hidden h-[68px]" aria-hidden />
    </main>
  );
}

// ── Similar Properties Section ──

function SimilarProperties({ currentSlug }: { currentSlug: string }) {
  const { properties: allProperties } = require('@/lib/properties');
  const similar = (allProperties as import('@/lib/properties').Property[])
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 4);

  if (similar.length === 0) return null;

  return (
    <div className="bg-muted/30 border-t border-border py-12 px-[clamp(20px,5vw,60px)]">
      <h2 className="text-[22px] font-extrabold text-foreground mb-5 max-w-[1200px] mx-auto">
        Similar Properties You Might Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1200px] mx-auto">
        {similar.map((prop) => (
          <Link
            key={prop.slug}
            href={`/properties/${prop.slug}`}
            className="bg-white border border-border rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            <div className="h-[140px] bg-gradient-to-br from-[#243C4C] to-[#243C4C] flex items-center justify-center">
              {prop.image ? (
                <img
                  src={prop.image}
                  alt={prop.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl opacity-30">&#127960;</span>
              )}
            </div>
            <div className="p-3.5">
              <h4 className="text-sm font-bold text-foreground mb-0.5 line-clamp-1">
                {prop.name}
              </h4>
              <p className="text-xs text-muted-foreground mb-1.5">{prop.area}</p>
              <p className="text-base font-extrabold text-foreground">
                {prop.priceRange || `RM${prop.price.myr.toLocaleString()}`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
