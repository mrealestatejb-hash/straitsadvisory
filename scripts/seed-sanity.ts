/**
 * Seed Sanity with existing property data.
 *
 * Run with:
 *   npx tsx scripts/seed-sanity.ts
 *
 * Prerequisites:
 *   1. Create a Sanity project at sanity.io/manage
 *   2. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 *   3. Create an API token with write access and set SANITY_API_WRITE_TOKEN in .env.local
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === 'your-project-id') {
  console.error('❌ Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local first');
  process.exit(1);
}
if (!token) {
  console.error('❌ Set SANITY_API_WRITE_TOKEN in .env.local first');
  console.error('   Create a token at: https://sanity.io/manage/project/' + projectId + '/api');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// ── Property data from lib/properties.ts ────────────────────

const developer = {
  _type: 'developer',
  _id: 'developer-rf-properties',
  name: 'R&F Properties',
  slug: { _type: 'slug', current: 'rf-properties' },
  website: 'https://www.rfchina.com',
};

const properties = [
  {
    _type: 'property',
    _id: 'property-rf-phase-1',
    name: 'R&F Princess Cove Phase 1',
    nameZh: '富力公主湾一期',
    slug: { _type: 'slug', current: 'rf-princess-cove-phase-1' },
    developer: { _type: 'reference', _ref: 'developer-rf-properties' },
    area: 'Tanjung Puteri',
    district: 'Johor Bahru Waterfront',
    category: 'luxury',
    status: 'sold-out',
    featured: true,
    priceSGD: 280000,
    priceMYR: 880000,
    priceRange: 'From S$280,000',
    beds: '1-4',
    baths: '1-3',
    sizeRange: '469-1,386',
    rentalYield: 6.8,
    rtsDistance: '500m',
    tenure: 'Freehold',
    completionYear: 'Completed 2019',
    descriptionPlain:
      'The iconic twin-tower development and tallest residential building in Southeast Asia. Phase 1 features 33 luxurious layouts across 7 towers (A1-A7) with panoramic views of the Johor Strait and Singapore skyline. HOPSCA integrated development with hotel, offices, parks, shopping, and clubhouse.',
    highlights: [
      'Tallest residential in Southeast Asia',
      '33 luxurious layouts to choose from',
      'HOPSCA integrated development',
      '5 minutes to JB-SG RTS Link',
      '650m sheltered link bridge to CIQ',
      'Connected to R&F Mall',
    ],
    unitTypes: [
      { _key: 'ut1', _type: 'unitType', type: '1 Bedroom', size: '469-543 sqft', layouts: ['Type D', 'Type V2'] },
      { _key: 'ut2', _type: 'unitType', type: '2 Bedroom', size: '800-873 sqft', layouts: ['Type U6', 'Type I Sub2', 'Type G', 'Type I'] },
      { _key: 'ut3', _type: 'unitType', type: '2+1 Bedroom', size: '1,074 sqft', layouts: ['Type N'] },
      { _key: 'ut4', _type: 'unitType', type: '3 Bedroom', size: '1,052-1,139 sqft', layouts: ['Type A1', 'Type J1', 'Type K', 'Type M1', 'Type F'] },
      { _key: 'ut5', _type: 'unitType', type: '4 Bedroom', size: '1,386 sqft', layouts: ['Type H'] },
      { _key: 'ut6', _type: 'unitType', type: 'Dual Key', size: '1,286-1,318 sqft', layouts: ['Type E', 'Type E2', 'Type V3'] },
    ],
    towers: ['A1', 'A2', 'A3', 'A3A', 'A5', 'A6', 'A7'],
    address: 'Jalan Tanjung Puteri, 80300 Johor Bahru',
    coordinates: { _type: 'geopoint', lat: 1.4631, lng: 103.7644 },
    tourUrl: 'https://infishow.ideamake.cn/icp/xinshanguojicheng_10418/weishapanfuzhi_10.html',
    tourProvider: 'generic',
  },
  {
    _type: 'property',
    _id: 'property-rf-phase-2',
    name: 'R&F Princess Cove Phase 2 - Seine Region',
    nameZh: '富力公主湾二期 塞纳天地',
    slug: { _type: 'slug', current: 'rf-princess-cove-phase-2' },
    developer: { _type: 'reference', _ref: 'developer-rf-properties' },
    area: 'Tanjung Puteri',
    district: 'Johor Bahru Waterfront',
    category: 'luxury',
    status: 'limited',
    featured: true,
    priceSGD: 180000,
    priceMYR: 566000,
    priceRange: 'From S$180,000',
    beds: 'Studio-3',
    baths: '1-2',
    sizeRange: '468-1,317',
    rentalYield: 7.2,
    rtsDistance: '650m',
    tenure: 'Freehold',
    completionYear: 'Completed 2022',
    descriptionPlain:
      "Seine Region offers exclusive sea view units overlooking the JB-Singapore Causeway with panoramic views of Singapore's cityscape. Features infinity swimming pool, gym, yoga room, jogging track at the sky lounge. Adjacent to R&F Marina Place with IMAX theatre, yacht club, and fashion boutiques.",
    highlights: [
      'Exclusive panoramic sea views',
      '6 minutes to JB-SG RTS Link',
      'Sky lounge with infinity pool',
      'Adjacent to Opera House & Cineplex',
      'Private Yacht Club access',
      'Most viewed rental project in Malaysia',
    ],
    unitTypes: [
      { _key: 'ut1', _type: 'unitType', type: 'Studio', size: '468-471 sqft', layouts: ['Type D', 'Type D Sub2'] },
      { _key: 'ut2', _type: 'unitType', type: '1 Bedroom', size: '544 sqft', layouts: ['Type V6'] },
      { _key: 'ut3', _type: 'unitType', type: '2 Bedroom', size: '767-933 sqft', layouts: ['Type V7M', 'Type V7', 'Type B', 'Type B Sub2', 'Type V5', 'Type V5M', 'Type U1', 'Type U1 Sub2', 'Type G'] },
      { _key: 'ut4', _type: 'unitType', type: '3 Bedroom', size: '1,105-1,181 sqft', layouts: ['Type M1 Sub2', 'Type M1', 'Type A', 'Type A1'] },
      { _key: 'ut5', _type: 'unitType', type: 'Dual Key', size: '1,317 sqft', layouts: ['Type E'] },
    ],
    towers: ['B1', 'B2', 'B3', 'B3A'],
    address: 'Jalan Tanjung Puteri, 80300 Johor Bahru',
    coordinates: { _type: 'geopoint', lat: 1.4631, lng: 103.7644 },
    tourUrl: 'https://infishow.ideamake.cn/icp/xinshanguojicheng_10418/weishapanfuzhi_10.html',
    tourProvider: 'generic',
  },
  {
    _type: 'property',
    _id: 'property-rf-phase-3',
    name: 'R&F Princess Cove Phase 3',
    nameZh: '富力公主湾三期',
    slug: { _type: 'slug', current: 'rf-princess-cove-phase-3' },
    developer: { _type: 'reference', _ref: 'developer-rf-properties' },
    area: 'Tanjung Puteri',
    district: 'Johor Bahru Waterfront',
    category: 'luxury',
    status: 'coming-soon',
    featured: true,
    priceSGD: 0,
    priceMYR: 0,
    priceRange: 'Coming Soon',
    beds: 'TBD',
    baths: 'TBD',
    sizeRange: 'TBD',
    rentalYield: 0,
    rtsDistance: 'TBD',
    tenure: 'Freehold',
    completionYear: 'TBD',
    descriptionPlain: 'Phase 3 details coming soon. Register your interest to be notified when more information becomes available.',
    highlights: [],
    unitTypes: [],
    towers: [],
    address: 'Jalan Tanjung Puteri, 80300 Johor Bahru',
    coordinates: { _type: 'geopoint', lat: 1.4631, lng: 103.7644 },
  },
];

const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  siteName: 'Straits Advisory',
  tagline: "Singapore's Gateway to Johor Bahru Property Investment",
  whatsappNumber: '60197058001',
  rtsOpeningDate: 'January 2027',
  heroStats: [
    { _key: 'stat1', value: '6-8', suffix: '%', label: 'Rental Yield' },
    { _key: 'stat2', value: '5', suffix: 'min', label: 'RTS Commute' },
    { _key: 'stat3', value: '300', suffix: 'K+', label: 'From S$' },
  ],
};

const faqs = [
  {
    _type: 'faq',
    _id: 'faq-1',
    question: 'Can foreigners buy property in Johor Bahru?',
    answer: 'Yes! Foreigners can purchase freehold property in Johor Bahru with minimal restrictions. The minimum purchase price for foreign buyers is RM1 million. Malaysia offers one of the most foreigner-friendly property ownership policies in Southeast Asia.',
    category: 'buying',
    order: 1,
  },
  {
    _type: 'faq',
    _id: 'faq-2',
    question: "What's the buying process like?",
    answer: 'The process typically takes 3-4 months: 1) Property selection and viewing, 2) Booking with deposit (RM10,000-50,000), 3) Sign Sale & Purchase Agreement within 14 days, 4) Loan application if needed, 5) Progressive payments, 6) Key collection. We guide you through every step.',
    category: 'buying',
    order: 2,
  },
  {
    _type: 'faq',
    _id: 'faq-3',
    question: "What's the minimum budget needed?",
    answer: 'Properties at R&F Princess Cove start from S$180,000 (approximately RM600,000) for studio units. For a comfortable 2-bedroom unit, budget around S$280,000-350,000. We can help you find options that match your investment goals.',
    category: 'buying',
    order: 3,
  },
  {
    _type: 'faq',
    _id: 'faq-4',
    question: 'How far is the RTS Link station?',
    answer: 'R&F Princess Cove is just 500-650 meters from the upcoming RTS Link station (Bukit Chagar), opening in January 2027. This means a 5-6 minute walk to cross into Singapore via the new rail link, revolutionizing cross-border commuting.',
    category: 'rts',
    order: 4,
  },
  {
    _type: 'faq',
    _id: 'faq-5',
    question: 'What rental yields can I expect?',
    answer: "Current rental yields at R&F Princess Cove range from 6-8% annually, significantly higher than Singapore's 2-3%. With the RTS Link opening in 2027, yields are expected to increase as demand from Singapore commuters grows.",
    category: 'financing',
    order: 5,
  },
  {
    _type: 'faq',
    _id: 'faq-6',
    question: 'Do you assist with financing?',
    answer: "Absolutely. We work with Malaysian banks that offer up to 70% financing for foreign buyers. Interest rates are typically 4-5% p.a. We'll connect you with our banking partners and help prepare all required documentation.",
    category: 'financing',
    order: 6,
  },
];

// ── Seed execution ──────────────────────────────────────────

async function seed() {
  console.log('🌱 Seeding Sanity...\n');

  const transaction = client.transaction();

  // Create developer
  console.log('  📦 Developer: R&F Properties');
  transaction.createOrReplace(developer);

  // Create properties
  for (const property of properties) {
    console.log(`  🏠 Property: ${property.name}`);
    transaction.createOrReplace(property);
  }

  // Create site settings
  console.log('  ⚙️  Site Settings');
  transaction.createOrReplace(siteSettings);

  // Create FAQs
  for (const faq of faqs) {
    console.log(`  ❓ FAQ: ${faq.question.substring(0, 50)}...`);
    transaction.createOrReplace(faq);
  }

  try {
    const result = await transaction.commit();
    console.log(`\n✅ Seeded ${result.results.length} documents successfully!`);
    console.log('\n🎉 Open your Sanity Studio to see the content:');
    console.log(`   https://sanity.io/manage/project/${projectId}`);
  } catch (error) {
    console.error('\n❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
