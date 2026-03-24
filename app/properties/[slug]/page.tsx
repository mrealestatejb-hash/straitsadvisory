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

      {/* Hero section */}
      <div className="px-[clamp(20px,5vw,60px)] pt-7 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#243C4C] to-[#5289AD] flex items-center justify-center text-lg text-white font-extrabold flex-shrink-0">
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
          <div className="py-8 border-b border-border">
            <h2 className="text-xl font-extrabold text-foreground mb-4">360° Virtual Tour</h2>
            {property.tourUrl ? (
              <div className="relative aspect-video bg-[#243C4C] rounded-xl overflow-hidden">
                <iframe
                  src={property.tourUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; gyroscope; xr-spatial-tracking"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="aspect-video bg-[#243C4C]/5 rounded-xl flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <span className="text-4xl block mb-2">🏠</span>
                  <p className="font-semibold">Virtual Tour Coming Soon</p>
                  <p className="text-sm mt-1">Contact us for a live video walkthrough</p>
                </div>
              </div>
            )}
          </div>

          {/* 8. Map — CONFIRM */}
          <div className="py-8 border-b border-border">
            <h2 className="text-xl font-extrabold text-foreground mb-4">Location</h2>
            <div className="aspect-[16/9] bg-[#243C4C]/5 rounded-xl overflow-hidden">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.name + ' ' + (property.area || 'Johor Bahru'))}&zoom=15&maptype=satellite`}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* 9. About Developer — TRUST */}
          <div className="py-8 border-b border-border">
            <h2 className="text-xl font-extrabold text-foreground mb-4">About the Developer</h2>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#243C4C] to-[#5289AD] flex items-center justify-center text-xl text-white font-extrabold flex-shrink-0">
                {(property.developer || 'SA').split(/\s+/).map((w) => w[0]).join('').slice(0, 3)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{property.developer || 'R&F Properties'}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  R&F Properties is one of China&apos;s largest integrated real estate developers, listed on the Hong Kong Stock Exchange. With over 30 years of experience and projects across 40+ cities globally, R&F has established a reputation for delivering premium mixed-use developments. Their flagship Johor Bahru project, R&F Princess Cove, is a 116-acre waterfront city that has become a landmark of the Iskandar Malaysia corridor.
                </p>
              </div>
            </div>
          </div>

          {/* 10. FAQ — OBJECTIONS */}
          <div className="py-8 border-b border-border">
            <h2 className="text-xl font-extrabold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground">Can foreigners buy property in Malaysia?</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Yes, foreigners can purchase property in Malaysia above the state minimum threshold. In Johor, the minimum is RM1 million for most property types. R&F Princess Cove units are eligible for foreign ownership.</p>
              </div>
              <div className="border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground">What is the RTS Link and when does it open?</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">The RTS (Rapid Transit System) Link is a cross-border rail connecting Johor Bahru to Singapore&apos;s Woodlands in just 5 minutes. It is expected to be operational by 2026-2027, significantly boosting property values in the surrounding area.</p>
              </div>
              <div className="border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground">What are the estimated rental yields?</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">R&F Princess Cove 2-bedroom units currently achieve average monthly rentals of RM3,300, translating to gross yields of approximately 6-8%. Yields have grown 136% since 2020 driven by RTS anticipation and Singapore demand.</p>
              </div>
            </div>
          </div>

          {/* 11. Visual Roadmap CTA — ACTION */}
          <div className="py-8">
            <div className="bg-gradient-to-br from-[#243C4C] to-[#5289AD] rounded-2xl p-8 text-center text-white">
              <h2 className="text-2xl font-extrabold mb-3">Your Property Journey Starts Here</h2>
              <p className="text-white/70 mb-6 max-w-md mx-auto">From discovery to keys in hand — we guide you every step of the way.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I'm interested in ${property.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25d366] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#20bd5a] transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.562 4.145 1.543 5.888L0 24l6.304-1.654A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.97 0-3.837-.53-5.445-1.455l-.39-.232-4.047 1.062 1.08-3.946-.254-.404A9.715 9.715 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
                  Get Started on WhatsApp
                </a>
                <a
                  href={`tel:+${whatsappNumber}`}
                  className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/25 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/25 transition-colors"
                >
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <PropertySidebar
          developer={property.developer || 'Straits Advisory'}
          whatsappNumber={whatsappNumber}
          propertyName={property.name}
        />
      </div>
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
