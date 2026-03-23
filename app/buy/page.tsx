'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Sparkles } from 'lucide-react'
import { propertyListings, areas, type PropertyListing } from '@/lib/properties-data'

const cityParamMap: Record<string, string> = {
  jb: 'johor-bahru',
  kl: 'kuala-lumpur',
  pg: 'penang',
  'johor-bahru': 'johor-bahru',
  'kuala-lumpur': 'kuala-lumpur',
  penang: 'penang',
}

const cityNameMap: Record<string, string> = {
  'johor-bahru': 'Johor Bahru',
  'kuala-lumpur': 'Kuala Lumpur',
  penang: 'Penang',
}

function BuyPageContent() {
  const searchParams = useSearchParams()
  const cityParam = searchParams.get('city')
  const initialCity = cityParam ? cityParamMap[cityParam] || '' : ''

  const [city, setCity] = useState(initialCity)
  const [area, setArea] = useState('')
  const [status, setStatus] = useState('')
  const [tenure, setTenure] = useState('')
  const [search, setSearch] = useState('')

  // Sync city from URL param on mount / param change
  useEffect(() => {
    if (cityParam) {
      const mapped = cityParamMap[cityParam] || ''
      if (mapped) {
        setCity(mapped)
        setArea('')
      }
    }
  }, [cityParam])

  // Area options cascade based on city
  const areaOptions = useMemo(() => {
    if (city) return areas[city] || []
    // When no city selected, show all areas combined
    return Object.values(areas).flat()
  }, [city])

  // Reset area when city changes
  const handleCityChange = (newCity: string) => {
    setCity(newCity)
    setArea('')
  }

  // All non-hidden properties
  const allProperties = useMemo(
    () => propertyListings.filter((p) => !p.hidden),
    []
  )

  // Filtered properties
  const filtered = useMemo(() => {
    return allProperties.filter((p) => {
      if (city && p.city !== city) return false
      if (area && p.area !== area) return false
      if (status && p.status !== status) return false
      if (tenure && p.tenure !== tenure) return false
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
        return false
      return true
    })
  }, [allProperties, city, area, status, tenure, search])

  const clearFilters = () => {
    setCity('')
    setArea('')
    setStatus('')
    setTenure('')
    setSearch('')
  }

  // Hero text based on city
  const heroTitle = city ? cityNameMap[city] : null
  const heroSubtitle = city
    ? `Browse all ${cityNameMap[city]} developments`
    : 'Handpicked developments across Malaysia'

  return (
    <>
      {/* Hero Section */}
      <section
        className="pt-16"
        style={{
          background:
            'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }}
      >
        <div className="px-5 md:px-[clamp(20px,5vw,60px)] py-[50px] text-center text-white">
          <h1 className="text-[clamp(28px,5vw,48px)] font-extrabold mb-4 leading-[1.15]">
            {heroTitle ? (
              <>
                <span className="text-[#c9a962]">{heroTitle}</span> Properties
              </>
            ) : (
              <>
                Find Your{' '}
                <span className="text-[#c9a962]">Malaysia Property</span>
              </>
            )}
          </h1>
          <p className="text-[clamp(14px,2vw,18px)] text-white/75 max-w-[600px] mx-auto mb-[30px]">
            {heroSubtitle}
          </p>
          <div className="flex justify-center gap-8 flex-wrap text-sm font-semibold text-white/85">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a962]" />
              Featured Properties
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a962]" />3
              Cities
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a962]" />
              Freehold &amp; Leasehold
            </span>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 z-[90] bg-white border-b border-gray-200 px-5 md:px-[clamp(20px,5vw,60px)] py-3.5 flex flex-wrap gap-2.5 items-center">
        <select
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          className="h-[38px] px-3 border border-[#c9a962] rounded-lg font-inherit text-[13px] text-gray-700 bg-white cursor-pointer font-semibold focus:outline-none focus:border-[#c9a962]"
        >
          <option value="">All Cities</option>
          <option value="johor-bahru">Johor Bahru</option>
          <option value="kuala-lumpur">Kuala Lumpur</option>
          <option value="penang">Penang</option>
        </select>

        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="h-[38px] px-3 border border-gray-300 rounded-lg font-inherit text-[13px] text-gray-700 bg-white cursor-pointer focus:outline-none focus:border-[#c9a962]"
        >
          <option value="">All Areas</option>
          {areaOptions.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-[38px] px-3 border border-gray-300 rounded-lg font-inherit text-[13px] text-gray-700 bg-white cursor-pointer focus:outline-none focus:border-[#c9a962]"
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="new-launch">New Launch</option>
          <option value="under-construction">Under Construction</option>
        </select>

        <select
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          className="h-[38px] px-3 border border-gray-300 rounded-lg font-inherit text-[13px] text-gray-700 bg-white cursor-pointer focus:outline-none focus:border-[#c9a962]"
        >
          <option value="">All Tenure</option>
          <option value="freehold">Freehold</option>
          <option value="leasehold">Leasehold</option>
        </select>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search property name..."
          className="h-[38px] px-3 min-w-[160px] border border-gray-300 rounded-lg font-inherit text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#c9a962]"
        />

        <button
          onClick={clearFilters}
          className="h-[38px] px-4 border-none rounded-lg bg-gray-100 text-gray-500 font-inherit text-[13px] font-medium cursor-pointer transition-all duration-200 hover:bg-gray-200 hover:text-gray-700"
        >
          Clear Filters
        </button>
      </div>

      {/* Results Bar */}
      <div className="px-5 md:px-[clamp(20px,5vw,60px)] py-4 flex justify-between items-center">
        <span className="text-sm text-gray-500 font-medium">
          Showing {filtered.length} of {allProperties.length} properties
        </span>
      </div>

      {/* No Results */}
      {filtered.length === 0 && (
        <div className="text-center py-20 px-5 text-gray-400 text-base">
          No properties match your filters. Try adjusting your criteria.
        </div>
      )}

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-[clamp(20px,5vw,60px)] pb-[60px]">
        {filtered.map((property) => (
          <PropertyCard key={property.slug} property={property} />
        ))}
      </div>
    </>
  )
}

function getBadgeClass(badge: string): string {
  const lower = badge.toLowerCase()
  if (lower === 'completed' || lower === 'new launch')
    return 'bg-emerald-600 text-white'
  if (lower === 'freehold' || lower === 'leasehold')
    return 'bg-white/15 text-white border border-white/30 backdrop-blur-sm'
  // Default for other badges like "4 Phases"
  return 'bg-white/15 text-white border border-white/30 backdrop-blur-sm'
}

function PropertyCard({ property }: { property: PropertyListing }) {
  const statusBadge = property.badges[0]
  const tenureBadge = property.badges.find(
    (b) => b.toLowerCase() === 'freehold' || b.toLowerCase() === 'leasehold'
  )
  const otherBadges = property.badges.filter(
    (b) => b !== statusBadge && b !== tenureBadge
  )

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-[0.25s] ease-[cubic-bezier(.4,0,.2,1)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] no-underline text-inherit"
    >
      {/* Card Image */}
      <div className="relative aspect-[16/10]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {statusBadge && (
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.5px] ${getBadgeClass(statusBadge)}`}
            >
              {statusBadge}
            </span>
          )}
          {otherBadges.map((badge) => (
            <span
              key={badge}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.5px] ${getBadgeClass(badge)}`}
            >
              {badge}
            </span>
          ))}
        </div>
        {tenureBadge && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.5px] bg-white/15 text-white border border-white/30 backdrop-blur-sm">
            {tenureBadge}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="px-[18px] pt-4 pb-[18px]">
        <h3 className="text-base font-bold text-[#1a1a2e] mb-1 leading-[1.3]">
          {property.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2.5 font-medium">
          {property.location}
        </p>
        <p className="text-lg font-extrabold text-[#1a1a2e] mb-3">
          {property.price}
        </p>
        <div className="flex flex-col gap-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {property.distance}
          </span>
          <span className="flex items-center gap-1 text-[#c9a962] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            {property.feature}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function BuyPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-16 min-h-screen flex items-center justify-center text-gray-400">
          Loading...
        </div>
      }
    >
      <BuyPageContent />
    </Suspense>
  )
}
