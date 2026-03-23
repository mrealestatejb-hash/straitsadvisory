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
import { PropertySidebar } from '@/components/property/PropertySidebar';
import { BrochureDownload } from '@/components/property/BrochureDownload';

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
    whatsappNumber = '60197058001',
  } = data;

  // Build key info items
  const keyInfoItems = [
    { icon: 'tenure', value: property.tenure || 'TBD', label: 'Tenure' },
    {
      icon: 'status',
      value: property.completionYear || property.completion || 'TBD',
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
      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
      : property.status === 'sold-out'
        ? 'bg-gray-100 text-gray-600 border-gray-300'
        : property.status === 'limited'
          ? 'bg-amber-50 text-amber-700 border-amber-300'
          : 'bg-emerald-50 text-emerald-700 border-emerald-300';

  return (
    <main className="min-h-screen bg-white">
      {/* Gallery */}
      {property.images && property.images.length > 0 && (
        <div className="mt-16">
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

      {/* Hero section */}
      <div className="px-[clamp(20px,5vw,60px)] pt-7 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a3af5] to-[#1430d4] flex items-center justify-center text-lg text-white font-extrabold flex-shrink-0">
            {(property.developer || 'SA')
              .split(/\s+/)
              .map((w) => w[0])
              .join('')
              .slice(0, 3)}
          </div>
          <div>
            <h1 className="text-[clamp(26px,4vw,34px)] font-extrabold text-foreground leading-tight">
              {property.name}
            </h1>
            {property.nameZh && (
              <p className="text-sm text-muted-foreground mt-0.5">{property.nameZh}</p>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3.5">
          <MapPin className="w-4 h-4 text-muted-foreground/60" />
          {property.area}, {property.district || 'Johor Bahru'}, Johor
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4.5">
          <span
            className={`px-3.5 py-1 rounded-full text-xs font-semibold border ${statusClass}`}
          >
            {statusLabel}
          </span>
          {property.type && (
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border">
              Apartment
            </span>
          )}
        </div>

        {/* Price */}
        <div className="pb-5">
          <div className="text-[13px] text-muted-foreground">Starting from</div>
          <div className="text-[28px] font-extrabold text-foreground">
            {property.priceRange && property.priceRange !== 'Coming Soon'
              ? property.priceRange
              : property.price.myr > 0
                ? `RM${property.price.myr.toLocaleString()}`
                : 'Price On Enquiry'}
          </div>
        </div>
      </div>

      {/* Phase Selector */}
      {phases && activePhase && <PhaseSelector phases={phases} activePhase={activePhase} />}

      {/* Two column layout */}
      <div className="max-w-[1200px] mx-auto px-[clamp(20px,5vw,60px)] grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start pt-8 pb-16">
        {/* Main content */}
        <div className="min-w-0">
          {/* Key Info Row */}
          <div className="pb-8 border-b border-border">
            <KeyInfoRow items={keyInfoItems} />
          </div>

          {/* Why We Recommend */}
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

          {/* About */}
          {property.description && (
            <div className="py-8 border-b border-border">
              <h2 className="text-xl font-extrabold text-foreground mb-4">
                About {property.name}
              </h2>
              <div className="text-[15px] text-gray-700 leading-relaxed space-y-3">
                {property.description.split('\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          )}

          {/* Rental Yield Chart */}
          {rentalData && rentalData.length > 0 && (
            <RentalYieldChart data={rentalData} subtitle={rentalSubtitle} />
          )}

          {/* Unit Types */}
          {detailedUnits && detailedUnits.length > 0 && (
            <>
              <UnitTypesViewer units={detailedUnits} />
              {brochureUrl && (
                <BrochureDownload
                  title={`${property.name} Brochure`}
                  description="Find more details in the official developer brochure."
                  url={brochureUrl}
                />
              )}
            </>
          )}

          {/* Facilities */}
          {facilities && Object.keys(facilities).length > 0 && (
            <FacilitiesSection facilities={facilities} />
          )}

          {/* Connectivity */}
          {toSingapore && withinJB && (
            <ConnectivitySection toSingapore={toSingapore} withinJB={withinJB} />
          )}

        </div>

        {/* Sidebar */}
        <PropertySidebar
          developer={property.developer || 'Straits Advisory'}
          whatsappNumber={whatsappNumber}
          brochureUrl={brochureUrl}
          propertyName={property.name}
        />
      </div>

      {/* Similar Properties */}
      <SimilarProperties currentSlug={slug} />
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
            <div className="h-[140px] bg-gradient-to-br from-[#1a3af5] to-[#16213e] flex items-center justify-center">
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
