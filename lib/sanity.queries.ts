import { groq } from 'next-sanity';

// ── Property Queries ────────────────────────────────────────

// Shared fields projection for property documents
const propertyFields = groq`
  _id,
  name,
  nameZh,
  "slug": slug.current,
  area,
  district,
  category,
  status,
  featured,
  priceSGD,
  priceMYR,
  priceRange,
  beds,
  baths,
  sizeRange,
  rentalYield,
  rtsDistance,
  tenure,
  leaseYears,
  completionYear,
  heroImage,
  gallery,
  description,
  descriptionPlain,
  highlights,
  features,
  unitTypes,
  towers,
  address,
  coordinates,
  tourUrl,
  tourProvider,
  seo,
  "developer": developer->{
    name,
    "slug": slug.current,
    logo,
    description,
    website
  }
`;

// All properties (for listings page)
export const allPropertiesQuery = groq`
  *[_type == "property"] | order(name asc) {
    ${propertyFields}
  }
`;

// Featured properties (for homepage)
export const featuredPropertiesQuery = groq`
  *[_type == "property" && featured == true] | order(name asc) {
    ${propertyFields}
  }
`;

// Single property by slug
export const propertyBySlugQuery = groq`
  *[_type == "property" && slug.current == $slug][0] {
    ${propertyFields}
  }
`;

// All property slugs (for static generation)
export const propertySlugQuery = groq`
  *[_type == "property" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// ── Testimonial Queries ─────────────────────────────────────

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    name,
    role,
    photo,
    featured,
    "property": property->{
      name,
      "slug": slug.current
    }
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    quote,
    name,
    role,
    photo,
    "property": property->{
      name,
      "slug": slug.current
    }
  }
`;

// ── FAQ Queries ─────────────────────────────────────────────

export const allFaqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`;

// ── Site Settings Query ─────────────────────────────────────

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    logo,
    whatsappNumber,
    phoneNumber,
    email,
    address,
    socialLinks,
    heroStats,
    rtsOpeningDate,
    defaultSeo
  }
`;
