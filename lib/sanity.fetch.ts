/**
 * Data fetching layer with Sanity CMS + local fallback.
 *
 * When Sanity is configured (project ID set), fetches from CMS.
 * Otherwise, falls back to local data in lib/properties.ts.
 * This ensures the site works both before and after CMS setup.
 */

import { client } from './sanity.client';
import {
  allPropertiesQuery,
  featuredPropertiesQuery,
  propertyBySlugQuery,
  propertySlugQuery,
  allTestimonialsQuery,
  featuredTestimonialsQuery,
  allFaqsQuery,
  siteSettingsQuery,
} from './sanity.queries';
import { properties as localProperties, type Property } from './properties';

const isSanityConfigured =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your-project-id';

// ── Sanity response types ───────────────────────────────────

export interface SanityProperty {
  _id: string;
  name: string;
  nameZh?: string;
  slug: string;
  area: string;
  district?: string;
  category?: string;
  status?: string;
  featured?: boolean;
  priceSGD: number;
  priceMYR: number;
  priceRange?: string;
  beds?: string;
  baths?: string;
  sizeRange?: string;
  rentalYield?: number;
  rtsDistance?: string;
  tenure?: string;
  leaseYears?: number;
  completionYear?: string;
  heroImage?: unknown;
  gallery?: unknown[];
  description?: unknown[];
  descriptionPlain?: string;
  highlights?: string[];
  features?: string[];
  unitTypes?: { type: string; size: string; layouts: string[] }[];
  towers?: string[];
  address?: string;
  coordinates?: { lat: number; lng: number };
  tourUrl?: string;
  tourProvider?: string;
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: unknown };
  developer?: {
    name: string;
    slug: string;
    logo?: unknown;
    description?: unknown;
    website?: string;
  };
}

export interface SanityTestimonial {
  _id: string;
  quote: string;
  name: string;
  role?: string;
  photo?: unknown;
  featured?: boolean;
  property?: { name: string; slug: string };
}

export interface SanityFaq {
  _id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface SanitySiteSettings {
  siteName?: string;
  tagline?: string;
  logo?: unknown;
  whatsappNumber?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  socialLinks?: { platform: string; url: string }[];
  heroStats?: { value: string; suffix: string; label: string }[];
  rtsOpeningDate?: string;
  defaultSeo?: { metaTitle?: string; metaDescription?: string; ogImage?: unknown };
}

// ── Helper: convert Sanity property to local Property type ──

function sanityToLocal(sp: SanityProperty): Property {
  return {
    id: sp._id,
    slug: sp.slug,
    name: sp.name,
    nameZh: sp.nameZh,
    area: sp.area,
    district: sp.district,
    category: sp.category as Property['category'],
    price: { sgd: sp.priceSGD, myr: sp.priceMYR },
    priceRange: sp.priceRange,
    specs: {
      beds: sp.beds || '',
      baths: sp.baths || '',
      size: sp.sizeRange || '',
    },
    yield: sp.rentalYield || 0,
    rtsDistance: sp.rtsDistance || '',
    tenure: sp.tenure || '',
    leaseYears: sp.leaseYears,
    completionYear: sp.completionYear,
    status: sp.status as Property['status'],
    image: '', // Will use Sanity image URL
    images: [],
    tourUrl: sp.tourUrl,
    tourProvider: sp.tourProvider as Property['tourProvider'],
    description: sp.descriptionPlain || '',
    highlights: sp.highlights,
    unitTypes: sp.unitTypes,
    features: sp.features,
    developer: sp.developer?.name,
    towers: sp.towers,
    address: sp.address,
    coordinates: sp.coordinates
      ? [sp.coordinates.lng, sp.coordinates.lat]
      : [0, 0],
    featured: sp.featured,
    // Attach raw Sanity data for image handling
    _sanity: sp,
  } as Property & { _sanity: SanityProperty };
}

// ── Data fetching functions ─────────────────────────────────

export async function getAllProperties(): Promise<Property[]> {
  if (isSanityConfigured) {
    try {
      const results: SanityProperty[] = await client.fetch(allPropertiesQuery);
      return results.map(sanityToLocal);
    } catch (error) {
      console.error('Sanity fetch failed, falling back to local data:', error);
    }
  }
  return localProperties;
}

export async function getFeaturedProperties(): Promise<Property[]> {
  if (isSanityConfigured) {
    try {
      const results: SanityProperty[] = await client.fetch(featuredPropertiesQuery);
      if (results.length > 0) return results.map(sanityToLocal);
    } catch (error) {
      console.error('Sanity fetch failed, falling back to local data:', error);
    }
  }
  return localProperties.filter((p) => p.featured);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (isSanityConfigured) {
    try {
      const result: SanityProperty | null = await client.fetch(propertyBySlugQuery, { slug });
      if (result) return sanityToLocal(result);
    } catch (error) {
      console.error('Sanity fetch failed, falling back to local data:', error);
    }
  }
  return localProperties.find((p) => p.slug === slug) || null;
}

export async function getPropertySlugs(): Promise<string[]> {
  if (isSanityConfigured) {
    try {
      const results: { slug: string }[] = await client.fetch(propertySlugQuery);
      return results.map((r) => r.slug);
    } catch (error) {
      console.error('Sanity fetch failed, falling back to local data:', error);
    }
  }
  return localProperties.map((p) => p.slug);
}

export async function getAllTestimonials(): Promise<SanityTestimonial[]> {
  if (isSanityConfigured) {
    try {
      return await client.fetch(allTestimonialsQuery);
    } catch {
      // Fall through to default
    }
  }
  // Return empty — components will use their hardcoded defaults
  return [];
}

export async function getFeaturedTestimonials(): Promise<SanityTestimonial[]> {
  if (isSanityConfigured) {
    try {
      return await client.fetch(featuredTestimonialsQuery);
    } catch {
      return [];
    }
  }
  return [];
}

export async function getAllFaqs(): Promise<SanityFaq[]> {
  if (isSanityConfigured) {
    try {
      return await client.fetch(allFaqsQuery);
    } catch {
      return [];
    }
  }
  return [];
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  if (isSanityConfigured) {
    try {
      return await client.fetch(siteSettingsQuery);
    } catch {
      return null;
    }
  }
  return null;
}
