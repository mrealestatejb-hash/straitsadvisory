export interface UnitType {
  type: string;
  size: string;
  layouts: string[];
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  nameZh?: string;
  area: string;
  district?: string;
  category?: 'luxury' | 'waterfront' | 'city' | 'resort';
  type?: string | string[];
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
  tenure: string;
  leaseYears?: number;
  completion?: string;
  completionYear?: string;
  status?: 'available' | 'limited' | 'sold-out' | 'coming-soon';
  image: string;
  images: string[];
  tourUrl?: string;
  tourProvider?: 'matterport' | 'kuula' | 'generic';
  description: string;
  highlights?: string[];
  unitTypes?: UnitType[];
  features?: string[];
  developer?: string;
  towers?: string[];
  address?: string;
  coordinates: [number, number];
  featured?: boolean;
}

export const properties: Property[] = [
  {
    id: "rf-princess-cove-overview",
    slug: "rf-princess-cove-overview",
    name: "R&F Princess Cove",
    nameZh: "富力公主湾",
    area: "Tanjung Puteri",
    district: "Johor Bahru Waterfront",
    category: "luxury",
    price: { sgd: 113000, myr: 380000 },
    priceRange: "RM380,000 — RM5,000,000",
    specs: { beds: "Studio - 4 Bed", baths: "1-4", size: "313 - 2,200" },
    yield: 7.6,
    rtsDistance: "1km",
    tenure: "Freehold",
    completionYear: "Mixed (Completed + New Launch)",
    status: "available",
    description: "R&F Princess Cove is a 116-acre integrated waterfront development by R&F Properties, located in Bukit Chagar, Johor Bahru. Strategically positioned just 1km from the CIQ checkpoint and the upcoming RTS Link station, it is one of the largest mixed-use developments in the Johor Bahru city centre. The masterplan encompasses residential towers across multiple phases, a retail mall, serviced apartments, and commercial spaces — creating a self-contained waterfront city.",
    highlights: [
      "116-acre integrated waterfront mega project",
      "1km to CIQ / RTS Link Station",
      "Freehold tenure across all phases",
      "Multiple phases — completed & new launches",
      "Connected to R&F Mall via sheltered bridge",
      "5.5 - 8% rental yields",
    ],
    unitTypes: [],
    image: "/images/properties/rf-princess-cove-overview/743701219.jpg",
    images: ["/images/properties/rf-princess-cove-overview/743701219.jpg"],
    tourUrl: "https://www.actsugi.com/rfprincesscovejb/",
    tourProvider: "generic",
    featured: true,
    type: ["luxury", "waterfront"],
    coordinates: [103.7694, 1.4588],
    developer: "R&F Properties",
    towers: [],
    address: "Jalan Tanjung Puteri, 80300 Johor Bahru",
  },
  {
    id: "rf-princess-cove-phase-1",
    slug: "rf-princess-cove-phase-1",
    name: "R&F Princess Cove Phase 1",
    nameZh: "富力公主湾一期",
    area: "Tanjung Puteri",
    district: "Johor Bahru Waterfront",
    category: "luxury",
    price: { sgd: 149000, myr: 500000 },
    priceRange: "RM500,000 — RM2,500,000",
    specs: { beds: "1-4", baths: "1-3", size: "469-1,386" },
    yield: 6.8,
    rtsDistance: "500m",
    tenure: "Freehold",
    completionYear: "Completed 2019",
    status: "sold-out",
    description: "The iconic twin-tower development and tallest residential building in Southeast Asia. Phase 1 features 33 luxurious layouts across 7 towers (A1-A7) with panoramic views of the Johor Strait and Singapore skyline. HOPSCA integrated development with hotel, offices, parks, shopping, and clubhouse.",
    highlights: [
      "Tallest residential in Southeast Asia",
      "33 luxurious layouts to choose from",
      "HOPSCA integrated development",
      "5 minutes to JB-SG RTS Link",
      "650m sheltered link bridge to CIQ",
      "Connected to R&F Mall"
    ],
    unitTypes: [
      { type: "1 Bedroom", size: "469-543 sqft", layouts: ["Type D", "Type V2"] },
      { type: "2 Bedroom", size: "800-873 sqft", layouts: ["Type U6", "Type I Sub2", "Type G", "Type I"] },
      { type: "2+1 Bedroom", size: "1,074 sqft", layouts: ["Type N"] },
      { type: "3 Bedroom", size: "1,052-1,139 sqft", layouts: ["Type A1", "Type J1", "Type K", "Type M1", "Type F"] },
      { type: "4 Bedroom", size: "1,386 sqft", layouts: ["Type H"] },
      { type: "Dual Key", size: "1,286-1,318 sqft", layouts: ["Type E", "Type E2", "Type V3"] }
    ],
    image: "/images/properties/rf-princess-cove-phase-1/hero.jpg",
    images: ["/images/properties/rf-princess-cove-phase-1/hero.jpg"],
    tourUrl: "https://infishow.ideamake.cn/icp/xinshanguojicheng_10418/weishapanfuzhi_10.html",
    tourProvider: "generic",
    featured: true,
    type: ["luxury", "waterfront"],
    coordinates: [103.7694, 1.4588],
    developer: "R&F Properties",
    towers: ["A1", "A2", "A3", "A3A", "A5", "A6", "A7"],
    address: "Jalan Tanjung Puteri, 80300 Johor Bahru",
  },
  {
    id: "rf-princess-cove-phase-2",
    slug: "rf-princess-cove-phase-2",
    name: "R&F Princess Cove Phase 2 - Seine Region",
    nameZh: "富力公主湾二期 塞纳天地",
    area: "Tanjung Puteri",
    district: "Johor Bahru Waterfront",
    category: "luxury",
    price: { sgd: 179000, myr: 600000 },
    priceRange: "RM600,000 — RM3,000,000",
    specs: { beds: "Studio-3", baths: "1-2", size: "468-1,317" },
    yield: 7.2,
    rtsDistance: "650m",
    tenure: "Freehold",
    completionYear: "Completed 2022",
    status: "limited",
    description: "Seine Region offers exclusive sea view units overlooking the JB-Singapore Causeway with panoramic views of Singapore's cityscape. Features infinity swimming pool, gym, yoga room, jogging track at the sky lounge. Adjacent to R&F Marina Place with IMAX theatre, yacht club, and fashion boutiques.",
    highlights: [
      "Exclusive panoramic sea views",
      "6 minutes to JB-SG RTS Link",
      "Sky lounge with infinity pool",
      "Adjacent to Opera House & Cineplex",
      "Private Yacht Club access",
      "Most viewed rental project in Malaysia"
    ],
    unitTypes: [
      { type: "Studio", size: "468-471 sqft", layouts: ["Type D", "Type D Sub2"] },
      { type: "1 Bedroom", size: "544 sqft", layouts: ["Type V6"] },
      { type: "2 Bedroom", size: "767-933 sqft", layouts: ["Type V7M", "Type V7", "Type B", "Type B Sub2", "Type V5", "Type V5M", "Type U1", "Type U1 Sub2", "Type G"] },
      { type: "3 Bedroom", size: "1,105-1,181 sqft", layouts: ["Type M1 Sub2", "Type M1", "Type A", "Type A1"] },
      { type: "Dual Key", size: "1,317 sqft", layouts: ["Type E"] }
    ],
    image: "/images/properties/rf-princess-cove-phase-2/hero.jpg",
    images: ["/images/properties/rf-princess-cove-phase-2/hero.jpg"],
    tourUrl: "https://infishow.ideamake.cn/icp/xinshanguojicheng_10418/weishapanfuzhi_10.html",
    tourProvider: "generic",
    featured: true,
    type: ["luxury", "waterfront", "city"],
    coordinates: [103.7694, 1.4588],
    developer: "R&F Properties",
    towers: ["B1", "B2", "B3", "B3A"],
    address: "Jalan Tanjung Puteri, 80300 Johor Bahru",
  },
  {
    id: "rf-princess-cove-phase-3",
    slug: "rf-princess-cove-phase-3",
    name: "R&F Princess Cove Phase 3",
    nameZh: "富力公主湾三期",
    area: "Tanjung Puteri",
    district: "Johor Bahru Waterfront",
    category: "luxury",
    price: { sgd: 113000, myr: 380000 },
    priceRange: "RM380,000 — RM5,200,000",
    specs: { beds: "TBD", baths: "TBD", size: "TBD" },
    yield: 0,
    rtsDistance: "TBD",
    tenure: "Freehold",
    completionYear: "TBD",
    status: "coming-soon",
    description: "Phase 3 details coming soon. Register your interest to be notified when more information becomes available.",
    highlights: [],
    unitTypes: [],
    image: "/images/properties/rf-princess-cove-overview/743701219.jpg",
    images: ["/images/properties/rf-princess-cove-overview/743701219.jpg"],
    tourUrl: "",
    tourProvider: "generic",
    featured: true,
    type: ["luxury"],
    coordinates: [103.7694, 1.4588],
    developer: "R&F Properties",
    towers: [],
    address: "Jalan Tanjung Puteri, 80300 Johor Bahru",
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getPropertiesByCategory(category: string): Property[] {
  if (category === 'all') return properties;
  return properties.filter((p) => p.category === category);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getAvailableProperties(): Property[] {
  return properties.filter((p) => p.status !== 'sold-out' && p.status !== 'coming-soon');
}
