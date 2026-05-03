'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Sparkles, SlidersHorizontal, X } from 'lucide-react'
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
  const [filtersOpen, setFiltersOpen] = useState(false)

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

  const activeFilterCount = [city, area, status, tenure].filter(Boolean).length

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (filtersOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [filtersOpen])

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
            'linear-gradient(135deg, #243C4C 0%, #243C4C 50%, #243C4C 100%)',
        }}
      >
        <div className="px-5 md:px-[clamp(20px,5vw,60px)] py-[50px] text-center text-white">
          <h1 className="text-[clamp(28px,5vw,48px)] font-extrabold mb-4 leading-[1.15]">
            {heroTitle ? (
              <>
                <span className="text-[#D4C4A8]">{heroTitle}</span> Properties
              </>
            ) : (
              <>
                Find Your{' '}
                <span className="text-[#D4C4A8]">Malaysia Property</span>
              </>
            )}
          </h1>
          <p className="text-[clamp(14px,2vw,18px)] text-white/75 max-w-[600px] mx-auto mb-[30px]">
            {heroSubtitle}
          </p>
          <div className="flex justify-center gap-8 flex-wrap text-sm font-semibold text-white/85">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4C4A8]" />
              Featured Properties
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4C4A8]" />3
              Cities
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4C4A8]" />
              Freehold &amp; Leasehold
            </span>
          </div>
        </div>
      </section>

      {/* Mobile Filter Bar (compact) */}
      <div className="md:hidden sticky top-16 z-[90] glass-heavy border-b border-gray-200 px-4 py-3 flex gap-2 items-center">
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="flex-shrink-0 inline-flex items-center gap-1.5 h-[40px] px-3 rounded-lg bg-[#243C4C] text-white text-[13px] font-semibold"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#D4C4A8] text-[11px] font-bold text-[#243C4C]">
              {activeFilterCount}
            </span>
          )}
        </button>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="glass-input flex-1 min-w-0 h-[40px] px-3 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#D4C4A8]"
        />
      </div>

      {/* Desktop Filter Bar */}
      <div className="hidden md:flex sticky top-16 z-[90] glass-heavy border-b border-gray-200 px-[clamp(20px,5vw,60px)] py-3.5 flex-wrap gap-2.5 items-center">
        <select
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          className="glass-input h-[38px] px-3 rounded-lg font-inherit text-[13px] text-gray-700 cursor-pointer font-semibold focus:outline-none focus:border-[#D4C4A8]"
        >
          <option value="">All Cities</option>
          <option value="johor-bahru">Johor Bahru</option>
          <option value="kuala-lumpur">Kuala Lumpur</option>
          <option value="penang">Penang</option>
        </select>

        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="glass-input h-[38px] px-3 rounded-lg font-inherit text-[13px] text-gray-700 cursor-pointer focus:outline-none focus:border-[#D4C4A8]"
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
          className="glass-input h-[38px] px-3 rounded-lg font-inherit text-[13px] text-gray-700 cursor-pointer focus:outline-none focus:border-[#D4C4A8]"
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="new-launch">New Launch</option>
          <option value="under-construction">Under Construction</option>
        </select>

        <select
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          className="glass-input h-[38px] px-3 rounded-lg font-inherit text-[13px] text-gray-700 cursor-pointer focus:outline-none focus:border-[#D4C4A8]"
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
          className="glass-input h-[38px] px-3 min-w-[160px] rounded-lg font-inherit text-[13px] text-gray-700 focus:outline-none focus:border-[#D4C4A8]"
        />

        <button
          onClick={clearFilters}
          className="glass-button h-[38px] px-4 rounded-lg text-gray-500 font-inherit text-[13px] font-medium cursor-pointer transition-all duration-200 hover:text-gray-700"
        >
          Clear Filters
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {filtersOpen && (
        <div className="md:hidden fixed inset-0 z-[200]">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setFiltersOpen(false)}
            aria-hidden
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-[16px] font-bold text-[#243C4C]">Filters</h3>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">City</label>
                <select
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="w-full h-[44px] px-3 rounded-lg border border-gray-200 bg-white text-[14px] text-gray-700 focus:outline-none focus:border-[#D4C4A8]"
                >
                  <option value="">All Cities</option>
                  <option value="johor-bahru">Johor Bahru</option>
                  <option value="kuala-lumpur">Kuala Lumpur</option>
                  <option value="penang">Penang</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Area</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full h-[44px] px-3 rounded-lg border border-gray-200 bg-white text-[14px] text-gray-700 focus:outline-none focus:border-[#D4C4A8]"
                >
                  <option value="">All Areas</option>
                  {areaOptions.map((a) => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-[44px] px-3 rounded-lg border border-gray-200 bg-white text-[14px] text-gray-700 focus:outline-none focus:border-[#D4C4A8]"
                >
                  <option value="">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="new-launch">New Launch</option>
                  <option value="under-construction">Under Construction</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Tenure</label>
                <select
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full h-[44px] px-3 rounded-lg border border-gray-200 bg-white text-[14px] text-gray-700 focus:outline-none focus:border-[#D4C4A8]"
                >
                  <option value="">All Tenure</option>
                  <option value="freehold">Freehold</option>
                  <option value="leasehold">Leasehold</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2.5 px-5 py-3.5 border-t border-gray-100 bg-white">
              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 h-[44px] rounded-lg border border-gray-200 text-gray-600 text-[14px] font-semibold"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="flex-[2] h-[44px] rounded-lg bg-[#243C4C] text-white text-[14px] font-semibold"
              >
                Show {filtered.length} {filtered.length === 1 ? 'property' : 'properties'}
              </button>
            </div>
          </div>
        </div>
      )}

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
    return 'bg-[#5289AD] text-white'
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
      className="glass-card group block rounded-xl overflow-hidden no-underline text-inherit"
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
        <h3 className="text-base font-bold text-[#243C4C] mb-1 leading-[1.3]">
          {property.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2.5 font-medium">
          {property.location}
        </p>
        <p className="text-lg font-extrabold text-[#243C4C] mb-3">
          {property.price}
        </p>
        <div className="flex flex-col gap-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {property.distance}
          </span>
          <span className="flex items-center gap-1 text-[#D4C4A8] font-semibold">
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
