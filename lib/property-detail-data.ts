import { properties, type Property } from './properties';
import { getListingBySlug, propertyListings } from './properties-data';

// Extended property data for detail pages
export interface DetailedUnitType {
  name: string;
  beds: number;
  baths: number;
  size: string;
  img?: string;
  furnishing?: string;
}

export interface FacilityItem {
  icon: string;
  name: string;
  desc?: string;
}

export interface RentalDataPoint {
  year: number;
  rent: number;
}

export interface ConnectivityRoute {
  route: string;
  time: string;
}

export interface ConnectivityPlace {
  place: string;
  time: string;
}

export interface WhyRecommendCard {
  title: string;
  desc: string;
  color: string;
}

export interface PhaseInfo {
  key: string;
  label: string;
  href?: string;
}

export interface PropertyDetailData {
  property: Property;
  detailedUnits?: DetailedUnitType[];
  facilities?: Record<string, FacilityItem[]>;
  rentalData?: RentalDataPoint[];
  rentalSubtitle?: string;
  toSingapore?: ConnectivityRoute[];
  withinJB?: ConnectivityPlace[];
  whyRecommend?: {
    title: string;
    subtitle: string;
    cards: WhyRecommendCard[];
  };
  phases?: PhaseInfo[];
  activePhase?: string;
  brochureUrl?: string;
  whatsappNumber?: string;
}

// ── Phase 3 detailed data (from HTML reference) ──

const phase3Units: DetailedUnitType[] = [
  { name: 'Type A/A(M)', beds: 1, baths: 1, size: '313 sqft', img: '/brochure/floorplans/1br_type_a.png', furnishing: 'Unfurnished' },
  { name: 'Type B1b/B1b(M)', beds: 1, baths: 1, size: '555 sqft', img: '/brochure/floorplans/1br_type_b1b.png', furnishing: 'Unfurnished' },
  { name: 'Type B2/B2(M)', beds: 1, baths: 1, size: '558 sqft', img: '/brochure/floorplans/1br_type_b2.png', furnishing: 'Unfurnished' },
  { name: 'Type B1/B1(M)', beds: 1, baths: 1, size: '577 sqft', img: '/brochure/floorplans/1br_type_b1.png', furnishing: 'Unfurnished' },
  { name: 'Type B3c', beds: 1, baths: 1, size: '593 sqft', img: '/brochure/floorplans/1br_type_b3c.png', furnishing: 'Unfurnished' },
  { name: 'Type B3b/B3b(M)', beds: 1, baths: 1, size: '593 sqft', img: '/brochure/floorplans/1br_type_b3b.png', furnishing: 'Unfurnished' },
  { name: 'Type B3/B3(M)', beds: 1, baths: 1, size: '593 sqft', img: '/brochure/floorplans/1br_type_b3.png', furnishing: 'Unfurnished' },
  { name: 'Type B3a/B3a(M)', beds: 1, baths: 1, size: '595 sqft', img: '/brochure/floorplans/1br_type_b3a.png', furnishing: 'Unfurnished' },
  { name: 'Type C/C(M)', beds: 2, baths: 2, size: '781 sqft', img: '/brochure/floorplans/2br_type_c.png', furnishing: 'Unfurnished' },
  { name: 'Type C1/C1(M)', beds: 2, baths: 2, size: '828 sqft', img: '/brochure/floorplans/2br_type_c1.png', furnishing: 'Unfurnished' },
  { name: 'Type C4c', beds: 2, baths: 2, size: '832 sqft', img: '/brochure/floorplans/2br_type_c4c.png', furnishing: 'Unfurnished' },
  { name: 'Type C4d', beds: 2, baths: 2, size: '839 sqft', img: '/brochure/floorplans/2br_type_c4d.png', furnishing: 'Unfurnished' },
  { name: 'Type C4a', beds: 2, baths: 2, size: '846 sqft', img: '/brochure/floorplans/2br_type_c4a.png', furnishing: 'Unfurnished' },
  { name: 'Type C4', beds: 2, baths: 2, size: '852 sqft', img: '/brochure/floorplans/2br_type_c4.png', furnishing: 'Unfurnished' },
  { name: 'Type C5', beds: 2, baths: 2, size: '874 sqft', img: '/brochure/floorplans/2br_type_c5.png', furnishing: 'Unfurnished' },
  { name: 'Type C2/C2(M)', beds: 2, baths: 2, size: '877 sqft', img: '/brochure/floorplans/2br_type_c2.png', furnishing: 'Unfurnished' },
  { name: 'Type C3/C3(M)', beds: 2, baths: 2, size: '894 sqft', img: '/brochure/floorplans/2br_type_c3.png', furnishing: 'Unfurnished' },
  { name: 'Type D1/D1(M)', beds: 3, baths: 2, size: '1,134 sqft', img: '/brochure/floorplans/3br_type_d1.png', furnishing: 'Unfurnished' },
  { name: 'Type D3/D3(M)', beds: 3, baths: 3, size: '1,141 sqft', img: '/brochure/floorplans/3br_type_d3.png', furnishing: 'Unfurnished' },
  { name: 'Type D2/D2(M)', beds: 3, baths: 3, size: '1,275 sqft', img: '/brochure/floorplans/3br_type_d2.png', furnishing: 'Unfurnished' },
  { name: 'Type E/E(M)', beds: 4, baths: 3, size: '1,555 sqft', img: '/brochure/floorplans/4br_type_e.png', furnishing: 'Unfurnished' },
  // Penthouse units
  { name: 'Type P1', beds: 5, baths: 5, size: '2,796 sqft', img: '/brochure/floorplans/penthouse_type_p1.png', furnishing: 'Unfurnished' },
  { name: 'Type P1a', beds: 5, baths: 5, size: '2,796 sqft', img: '/brochure/floorplans/penthouse_type_p1a.png', furnishing: 'Unfurnished' },
  { name: 'Type P2', beds: 5, baths: 5, size: '2,796 sqft', img: '/brochure/floorplans/penthouse_type_p2.png', furnishing: 'Unfurnished' },
  { name: 'Type P2a', beds: 5, baths: 5, size: '2,796 sqft', img: '/brochure/floorplans/penthouse_type_p2a.png', furnishing: 'Unfurnished' },
  { name: 'Type P3', beds: 5, baths: 5, size: '3,006 sqft', img: '/brochure/floorplans/penthouse_type_p3.png', furnishing: 'Unfurnished' },
  { name: 'Type P3a', beds: 5, baths: 5, size: '3,006 sqft', img: '/brochure/floorplans/penthouse_type_p3a.png', furnishing: 'Unfurnished' },
  { name: 'Type P4', beds: 5, baths: 5, size: '2,719 sqft', img: '/brochure/floorplans/penthouse_type_p4.png', furnishing: 'Unfurnished' },
  { name: 'Type P4a', beds: 5, baths: 5, size: '2,719 sqft', img: '/brochure/floorplans/penthouse_type_p4a.png', furnishing: 'Unfurnished' },
];

const phase3Facilities: Record<string, FacilityItem[]> = {
  leisure: [
    { icon: '\u{1F3CA}', name: 'Olympic Pool', desc: '50m lap pool with straits view' },
    { icon: '\u{1F476}', name: 'Kids Pool', desc: 'Shallow pool & playground' },
    { icon: '\u{1F3BE}', name: 'Tennis Court', desc: 'Professional grade court' },
    { icon: '\u{1F356}', name: 'BBQ Pavilion', desc: 'Multiple BBQ stations' },
    { icon: '\u{1F3C3}', name: 'Jogging Track', desc: 'Waterfront promenade' },
  ],
  fitness: [
    { icon: '\u{1F3CB}\u{FE0F}', name: 'Gymnasium', desc: 'Fully equipped fitness centre' },
    { icon: '\u{1F3F8}', name: 'Badminton Hall', desc: 'Indoor badminton court' },
    { icon: '\u{1F3C0}', name: 'Basketball Court', desc: 'Full-size outdoor court' },
    { icon: '\u{1F9D8}', name: 'Yoga Room', desc: 'Dedicated yoga & meditation' },
    { icon: '\u{1F3B1}', name: 'Snooker Room', desc: 'Recreation lounge' },
  ],
  services: [
    { icon: '\u{1F3EA}', name: 'R&F Mall', desc: 'Connected retail & dining' },
    { icon: '\u{1F393}', name: 'International School', desc: 'Shattuck-St. Marys' },
    { icon: '\u{1F3E5}', name: 'Medical Centre', desc: 'On-site healthcare' },
    { icon: '\u{1F333}', name: 'Sky Garden', desc: 'Rooftop green spaces' },
    { icon: '\u{1F17F}\u{FE0F}', name: 'Parking', desc: 'Multi-level covered parking' },
  ],
};

const phase3RentalData: RentalDataPoint[] = [
  { year: 2020, rent: 1400 },
  { year: 2021, rent: 1600 },
  { year: 2022, rent: 2300 },
  { year: 2023, rent: 3000 },
  { year: 2024, rent: 3200 },
  { year: 2025, rent: 3300 },
];

const princessCovePhases: PhaseInfo[] = [
  { key: 'overview', label: 'Overview', href: '/properties/rf-princess-cove-overview' },
  { key: 'phase-1', label: 'Phase 1', href: '/properties/rf-princess-cove-phase-1' },
  { key: 'phase-2', label: 'Phase 2', href: '/properties/rf-princess-cove-phase-2' },
  { key: 'phase-3', label: 'Phase 3' },
];

// ── Map of slug -> detail data ──

const detailDataMap: Record<string, Omit<PropertyDetailData, 'property'>> = {
  'rf-princess-cove-overview': {
    phases: princessCovePhases.map((p) =>
      p.key === 'overview'
        ? { ...p, href: undefined }
        : p.key === 'phase-3'
          ? { ...p, href: '/properties/randf-princess-cove-phase-3' }
          : p
    ),
    activePhase: 'overview',
    whatsappNumber: '60102038001',
    rentalData: phase3RentalData,
    rentalSubtitle: 'R&F Princess Cove average monthly rental (2-bedroom)',
    toSingapore: [
      { route: 'RTS Link to Woodlands', time: '5 min' },
      { route: 'CIQ Immigration', time: '1km walk / sheltered link' },
      { route: 'Bus to SG (170/170X)', time: '45-60 min' },
    ],
    withinJB: [
      { place: 'R&F Mall', time: 'Connected via bridge' },
      { place: 'JB Sentral', time: '2 min drive' },
      { place: 'City Square Mall', time: '5 min walk' },
      { place: 'Komtar JBCC', time: '8 min walk' },
    ],
    whyRecommend: {
      title: 'R&F Princess Cove',
      subtitle: '116-acre integrated waterfront development with unmatched proximity to Singapore',
      cards: [
        {
          title: '1km to RTS Link',
          desc: 'Walk to CIQ Station — 5-minute connection to Singapore',
          color: '#059669',
        },
        {
          title: 'Freehold Tenure',
          desc: 'Investment protected for generations across all phases',
          color: '#d97706',
        },
        {
          title: 'Multiple Phases',
          desc: 'Choose completed units or exciting new launches',
          color: '#7c3aed',
        },
        {
          title: '5.5 – 8% Yields',
          desc: 'Strong rental demand from Singapore spillover',
          color: '#db2777',
        },
      ],
    },
  },
  'rf-princess-cove-phase-3': {
    detailedUnits: phase3Units,
    facilities: phase3Facilities,
    rentalData: phase3RentalData,
    rentalSubtitle: 'R&F Princess Cove average monthly rental (2-bedroom)',
    toSingapore: [
      { route: 'RTS Link to Woodlands', time: '5 min' },
      { route: 'CIQ Immigration', time: '650m sheltered link' },
      { route: 'Bus to SG (170/170X)', time: '45-60 min' },
    ],
    withinJB: [
      { place: 'R&F Mall', time: 'Phase 3 bridge' },
      { place: 'JB Sentral', time: '2 min drive' },
      { place: 'City Square Mall', time: '5 min walk' },
    ],
    whyRecommend: {
      title: 'R&F Princess Cove Phase 3',
      subtitle: 'New Casa Suites \u2014 650m sheltered link to CIQ with direct RTS connection to Singapore',
      cards: [
        {
          title: '650m to CIQ & RTS',
          desc: 'Sheltered link bridge to CIQ \u2014 5-minute RTS ride to Singapore',
          color: '#059669',
        },
        {
          title: 'Freehold Tenure',
          desc: 'Investment protected for generations \u2014 full ownership rights',
          color: '#d97706',
        },
        {
          title: 'Urban Skypark',
          desc: 'Olympic pool, gym, tennis, basketball & rooftop leisure deck',
          color: '#7c3aed',
        },
        {
          title: '60%+ Rental Growth',
          desc: 'Top condo in JB for rental demand \u2014 strong Singapore spillover',
          color: '#db2777',
        },
      ],
    },
    phases: princessCovePhases,
    activePhase: 'phase-3',
    brochureUrl: '/brochure/RF-New-Casa-Suites-Brochure.pdf',
    whatsappNumber: '60102038001',
  },
  'rf-princess-cove-phase-1': {
    phases: princessCovePhases.map((p) =>
      p.key === 'phase-1'
        ? { ...p, href: undefined }
        : p.key === 'phase-3'
          ? { ...p, href: '/properties/randf-princess-cove-phase-3' }
          : p
    ),
    activePhase: 'phase-1',
    whatsappNumber: '60102038001',
    toSingapore: [
      { route: 'RTS Link to Woodlands', time: '5 min' },
      { route: 'CIQ Immigration', time: '650m sheltered link' },
      { route: 'Bus to SG (170/170X)', time: '45-60 min' },
    ],
    withinJB: [
      { place: 'R&F Mall', time: 'Connected via bridge' },
      { place: 'JB Sentral', time: '2 min drive' },
      { place: 'City Square Mall', time: '5 min walk' },
    ],
  },
  'rf-princess-cove-phase-2': {
    phases: princessCovePhases.map((p) =>
      p.key === 'phase-2'
        ? { ...p, href: undefined }
        : p.key === 'phase-3'
          ? { ...p, href: '/properties/randf-princess-cove-phase-3' }
          : p
    ),
    activePhase: 'phase-2',
    whatsappNumber: '60102038001',
    toSingapore: [
      { route: 'RTS Link to Woodlands', time: '6 min' },
      { route: 'CIQ Immigration', time: '800m walk' },
      { route: 'Bus to SG (170/170X)', time: '45-60 min' },
    ],
    withinJB: [
      { place: 'R&F Mall', time: 'Adjacent' },
      { place: 'JB Sentral', time: '3 min drive' },
      { place: 'City Square Mall', time: '7 min walk' },
    ],
  },

  'ctc-skyone-bukit-chagar': {
    whatsappNumber: '60102038001',
    brochureUrl: '/brochures/ctc-skyone-bukit-chagar.pdf',
    toSingapore: [
      { route: 'RTS Link to Woodlands', time: '5 min' },
      { route: 'CIQ Immigration', time: '300m walk' },
      { route: 'Bus to SG (170/170X)', time: '45-60 min' },
    ],
    withinJB: [
      { place: 'SKS City Mall', time: 'Adjacent' },
      { place: 'Sheraton Hotel', time: 'Next door' },
      { place: 'City Square Mall', time: '5 min drive' },
      { place: 'JB Sentral', time: '5 min drive' },
    ],
    whyRecommend: {
      title: 'CTC Skyone',
      subtitle: 'Closest freehold residence to the RTS Link station — just 300m away',
      cards: [
        { title: '300m to RTS', desc: 'One of the nearest developments to the RTS Link station for seamless cross-border commuting', color: 'blue' },
        { title: 'Freehold Tenure', desc: 'Full freehold ownership in Johor Bahru city centre — a rare find this close to CIQ', color: 'emerald' },
        { title: 'Dual-Key Layouts', desc: 'All units convertible to dual-key configurations for maximum rental flexibility', color: 'violet' },
        { title: 'City Living', desc: 'Beside Sheraton Hotel & SKS City Mall with shopping, dining, and lifestyle at your doorstep', color: 'amber' },
      ],
    },
  },
};

// Slug aliases for backward compatibility
const slugAliases: Record<string, string> = {
  'randf-princess-cove-phase-3': 'rf-princess-cove-phase-3',
  'rf-princess-cove': 'rf-princess-cove-overview',
};

export function getPropertyDetailData(slug: string): PropertyDetailData | null {
  const resolvedSlug = slugAliases[slug] || slug;

  // Try detailed properties first
  const property = properties.find((p) => p.slug === resolvedSlug);
  if (property) {
    const detailData = detailDataMap[resolvedSlug] || {};
    return {
      property,
      whatsappNumber: '60102038001',
      ...detailData,
    };
  }

  // Fallback: create a basic Property from listings data
  const listing = getListingBySlug(resolvedSlug) || getListingBySlug(slug);
  if (listing) {
    const basicProperty: Property = {
      id: listing.slug,
      slug: listing.slug,
      name: listing.name,
      area: listing.location,
      price: { sgd: 0, myr: 0 },
      priceRange: listing.price,
      specs: { beds: '-', baths: '-', size: '-' },
      yield: 0,
      rtsDistance: listing.distance || '-',
      tenure: listing.tenure === 'freehold' ? 'Freehold' : 'Leasehold',
      completion: listing.status === 'completed' ? 'Completed' : listing.status === 'new-launch' ? 'New Launch' : 'Under Construction',
      image: listing.image,
      images: [listing.image],
      description: `${listing.name} located in ${listing.location}. ${listing.feature}.`,
      coordinates: [0, 0],
    };
    return {
      property: basicProperty,
      whatsappNumber: '60102038001',
    };
  }

  return null;
}

export function getAllPropertySlugs(): string[] {
  const baseSlugs = properties.map((p) => p.slug);
  const aliasSlugs = Object.keys(slugAliases);
  const listingSlugs = propertyListings.map((p) => p.slug);
  return [...new Set([...baseSlugs, ...aliasSlugs, ...listingSlugs])];
}
