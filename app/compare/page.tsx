'use client';

import { useState, useCallback, useMemo } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { Scale, X, Plus, MapPin } from 'lucide-react';

// Property data for comparison (matching compare.html PROPERTIES array)
interface CompareProperty {
  slug: string;
  name: string;
  location: string;
  priceMYR: number;
  priceSGD: number;
  tenure: string;
  completion: string;
  size: string;
  beds: string;
  baths: string;
  developer: string;
  image: string;
  rtsDistance: string;
  yieldPct: string;
}

const PROPERTIES: CompareProperty[] = [
  { slug: "ascent-park-iskandar-puteri", name: "Ascent Park Iskandar Puteri", location: "Iskandar Puteri", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Linbaq Holdings", image: "https://ascentparkjb.com/wp-content/uploads/2025/10/Ascent-Park-Iskandar-Puteri-JB-1024x570.png", rtsDistance: "", yieldPct: "" },
  { slug: "avenue-mbw-city", name: "Avenue MBW City", location: "MBW City", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "MB World Group", image: "https://www.mbworld.com.my/wp-content/uploads/2025/04/avenueresidences-slider1.webp", rtsDistance: "2km", yieldPct: "" },
  { slug: "ctc-skyone-bukit-chagar", name: "CTC Skyone Bukit Chagar", location: "Bukit Chagar", priceMYR: 580000, priceSGD: 173000, tenure: "Freehold", completion: "2030 Q2", size: "463 - 1,646 sqft", beds: "Studio, 1, 2, 3", baths: "1 - 3", developer: "CTC Development", image: "https://ctcskyonebukitchagar.com/wp-content/uploads/2026/02/Gallery-2-1024x822.jpg", rtsDistance: "300m", yieldPct: "" },
  { slug: "country-garden-danga-bay", name: "Country Garden Danga Bay", location: "Danga Bay", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "Completed", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Country Garden", image: "https://www.mysgprop.com/wp-content/uploads/2014/12/12.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "exsim-causewayz-bukit-chagar", name: "Exsim Causewayz Bukit Chagar", location: "Bukit Chagar", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "2030 Q1", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Exsim Group", image: "https://exsim-causewayzsquare.com/wp-content/uploads/2025/06/Screenshot-2025-06-12-at-4.29.53-PM-min.png", rtsDistance: "", yieldPct: "7%" },
  { slug: "majestic-gensphere-bukit-chagar", name: "Majestic Gensphere Bukit Chagar", location: "Bukit Chagar", priceMYR: 530000, priceSGD: 158000, tenure: "Freehold", completion: "2030 Q1", size: "459 - 755 sqft", beds: "Studio, 1, 2, 3", baths: "1 - 2", developer: "Majestic Gen", image: "https://gensphere.com.my/images/section-one/section-one-banner.png", rtsDistance: "", yieldPct: "" },
  { slug: "paragon-signature-suites-jln-abdul-samad", name: "Paragon Signature Suites", location: "Jln Abdul Samad", priceMYR: 450000, priceSGD: 134000, tenure: "Freehold", completion: "2030 Q1", size: "646 - 649 sqft", beds: "Studio, 1, 2, 3", baths: "", developer: "Paragon Globe", image: "https://paragonsignaturesuites.com.my/wp-content/uploads/2024/09/home-bk1-scaled.webp", rtsDistance: "", yieldPct: "" },
  { slug: "puteri-cove-residences-puteri-harbour", name: "Puteri Cove Residences", location: "Puteri Harbour", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "Completed", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Pearl Discovery", image: "https://nry.com.my/wp-content/uploads/2019/10/PCR_slider1.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "randf-princess-cove-phase-3", name: "R&F Princess Cove Phase 3", location: "Tanjung Puteri", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "2028 Q4", size: "313 - 3,682 sqft", beds: "Studio, 1, 2, 3", baths: "", developer: "R&F Properties", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop", rtsDistance: "", yieldPct: "" },
  { slug: "rf-princess-cove-ph2-bukit-chagar", name: "R&F Princess Cove Phase 2", location: "Tanjung Puteri", priceMYR: 566000, priceSGD: 180000, tenure: "Freehold", completion: "Completed", size: "468 - 1,317 sqft", beds: "Studio, 1, 2, 3", baths: "1 - 2", developer: "R&F Properties", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop", rtsDistance: "650m", yieldPct: "7.2%" },
  { slug: "rf-princess-cove", name: "R&F Princess Cove Phase 1", location: "Tanjung Puteri", priceMYR: 880000, priceSGD: 280000, tenure: "Freehold", completion: "Completed", size: "469 - 1,386 sqft", beds: "1, 2, 3, 4", baths: "1 - 3", developer: "R&F Properties", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop", rtsDistance: "500m", yieldPct: "6.8%" },
  { slug: "summer-suites-bukit-chagar", name: "Summer Suites Bukit Chagar", location: "Bukit Chagar", priceMYR: 600000, priceSGD: 179000, tenure: "Freehold", completion: "2029 Q4", size: "599 - 912 sqft", beds: "Studio, 1, 2, 3", baths: "1 - 2", developer: "Connoisseur Properties", image: "https://summersuitesjbciq.com/m1/wp-content/uploads/2025/06/summersuites-facade.webp", rtsDistance: "", yieldPct: "" },
  { slug: "the-arden-one-bukit-senyum", name: "The Arden One Bukit Senyum", location: "Bukit Senyum", priceMYR: 1000000, priceSGD: 299000, tenure: "Freehold", completion: "2030 Q1", size: "797 - 1,700 sqft", beds: "Studio, 1, 2, 3", baths: "", developer: "Astaka Holdings", image: "https://arden-obs.com/assets/arden_images/bg2img.png", rtsDistance: "", yieldPct: "" },
  { slug: "the-astaka-one-bukit-senyum", name: "The Astaka One Bukit Senyum", location: "Bukit Senyum", priceMYR: 2500000, priceSGD: 746000, tenure: "Freehold", completion: "Completed", size: "2,200 - 2,600 sqft", beds: "3, 4", baths: "3 - 4", developer: "Astaka Holdings", image: "https://astaka.com.my/wp-content/uploads/2024/04/slide1.png", rtsDistance: "", yieldPct: "" },
  { slug: "the-m-macrolink-medini", name: "The M Macrolink Medini", location: "Medini Iskandar Puteri", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "Completed", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Macrolink Group", image: "https://the-m-macrolink.com/wp-content/uploads/2025/01/01.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "skypark-kepler-lido-waterfront-boulevard", name: "Skypark Kepler Lido Waterfront", location: "Lido Waterfront Boulevard", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "2029 Q4", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Tropicana Corporation", image: "https://www.mysgprop.com/wp-content/uploads/2024/10/Lido-Waterfront-Masterplan-5.jpeg", rtsDistance: "5km", yieldPct: "" },
  { slug: "sunway-majestic-ara-soho", name: "Sunway Majestic Ara SOHO", location: "Jalan Yahya Awal", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "2029 Q3", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Sunway Property", image: "https://assets.sunwayproperty.com/2025/07/05_SunwayMajectic_OverallFacade_HR.jpg", rtsDistance: "4km", yieldPct: "" },
  { slug: "mbw-bay-danga-bay", name: "MBW Bay Danga Bay", location: "Danga Bay", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "2026/29", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "MB World Group", image: "https://www.mbworld.com.my/wp-content/uploads/2025/04/mbwbay-slider1.webp", rtsDistance: "", yieldPct: "" },
  { slug: "paragon-calia-danga-bay", name: "Paragon Calia Danga Bay", location: "Danga Bay", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "2029", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Paragon Globe", image: "https://caliaresidences.com.my/wp-content/uploads/2025/09/calia-residences-condo-design.webp", rtsDistance: "", yieldPct: "" },
  { slug: "parkland-by-the-river-permas", name: "Parkland by the River", location: "Permas Jaya", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "2028 Q2", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Parkland Group", image: "https://parkland-permas.com/wp-content/uploads/2025/07/Parkland-Permas-Photo.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "the-straits-view-duo-permas-jaya", name: "The Straits View Duo", location: "Permas Jaya", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "2028", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "BRDB Developments", image: "https://straitsviewduo.com/wp-content/uploads/2025/08/Untitled-design-22.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "ponderosa-regency", name: "Ponderosa Regency", location: "Taman Ponderosa", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "2029", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Prinsip Alpha", image: "https://www.johorprojects.com/wp-content/uploads/2025/05/PonderosaRegency1-1024x1024.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "elysia-park-medini", name: "Elysia Park Medini", location: "Medini Iskandar Puteri", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "Completed", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "BCB Berhad", image: "https://propnex-omgliving.com/wp-content/uploads/2026/01/Elysia-Park-Residence.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "southern-marina-puteri-harbour", name: "Southern Marina Puteri Harbour", location: "Puteri Harbour", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "Completed", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "PPB Group", image: "https://ppbproperties.com.my/wp-content/uploads/2023/02/southernmarina-banner.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "nadi-residence-southkey", name: "Nadi Residence Southkey", location: "Southkey", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "2027", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "SouthKey City", image: "https://nadiresidences.com/wp-content/uploads/2025/07/SOUTHKEY_NADI_BROCHURE_LOW-RES-1_organized.pdf-1200-x-630-px.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "suria-hill-iskandar-puteri", name: "Suria Hill Iskandar Puteri", location: "Iskandar Puteri", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "2026 Q4", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Distinctive Group", image: "https://www.suriahills.com.my/data/editor/home/banner.png", rtsDistance: "", yieldPct: "" },
  { slug: "m-grand-minori-taman-pelangi", name: "M Grand Minori Taman Pelangi", location: "Taman Pelangi", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "2030 Q1", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Mah Sing Group", image: "https://m-grandminori.com.my/wp-content/uploads/2025/08/MGM-Share.png", rtsDistance: "", yieldPct: "" },
  { slug: "maxim-the-address-taman-pelangi", name: "Maxim The Address Taman Pelangi", location: "Taman Pelangi", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "2030 Q1", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Maxim Global", image: "https://maximpelangi.dms-team.com/wp-content/uploads/2025/07/Maxim-Pelangi-The-Address.png", rtsDistance: "3km", yieldPct: "" },
  { slug: "skyline-one-sentosa-taman-sentosa", name: "Skyline One Sentosa", location: "Taman Sentosa", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "2030 Q2", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "TSLAW Group", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", rtsDistance: "", yieldPct: "" },
  { slug: "paragon-gateway-taman-suria", name: "Paragon Gateway Taman Suria", location: "Taman Suria", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "2027 Q2", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Paragon Globe", image: "https://paragongateway.com.my/wp-content/uploads/2023/07/Paragon-Gateway-Web-Design3.png", rtsDistance: "", yieldPct: "" },
  { slug: "nigella-park-forest-city-sfz", name: "Nigella Park Forest City (SFZ)", location: "Forest City", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "Completed", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Country Garden Pacificview", image: "https://forest-city-sez-johor.com/wp-content/uploads/2025/08/bg_header-2048x821-1.jpeg", rtsDistance: "", yieldPct: "" },
  { slug: "golf-villa-forest-city-sfz", name: "Golf Villa Forest City (SFZ)", location: "Forest City", priceMYR: 0, priceSGD: 0, tenure: "Freehold", completion: "Completed", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Country Garden Pacificview", image: "https://johorforestcity.com/wp-content/uploads/2025/03/banenr99.png", rtsDistance: "", yieldPct: "" },
  { slug: "carnelian-tower-forest-city-sfz", name: "Carnelian Tower Forest City (SFZ)", location: "Forest City", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Country Garden Pacificview", image: "https://cdn1.npcdn.net/images/c76985d4e9efdc533666f5a7144b9f11_1735892434.webp", rtsDistance: "", yieldPct: "" },
  { slug: "bayou-residences-leisure-farm", name: "Bayou Residences Leisure Farm", location: "Leisure Farm", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Mulpha International", image: "https://www.leisurefarm.com.my/wp-content/uploads/2020/04/garden-home-1.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "veranda-mbw-city", name: "Veranda MBW City", location: "MBW City", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "MB World Group", image: "https://www.mbworld.com.my/wp-content/uploads/2025/05/verandaresidencesp2-slider2-scaled.webp", rtsDistance: "", yieldPct: "" },
  { slug: "trellis-mbw-city", name: "Trellis MBW City", location: "MBW City", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "MB World Group", image: "https://www.mbworld.com.my/wp-content/uploads/2023/07/trellis-slider1.webp", rtsDistance: "", yieldPct: "" },
  { slug: "central-park-country-garden", name: "Central Park Country Garden", location: "Country Garden", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Country Garden", image: "https://dangabaycondo.com/assets/images/custom/header_bg.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "marina-residence-bayu-puteri", name: "Marina Residence Bayu Puteri", location: "Bayu Puteri", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Planetium Sdn Bhd", image: "https://cdn.irumah.co/photos/618508/Marina_Residence_12.png", rtsDistance: "", yieldPct: "" },
  { slug: "senibong-kews", name: "Senibong Kews", location: "Senibong Cove", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "WM Senibong", image: "https://www.thekews.com.my/img/pages/home/features/feature-1/s.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "isola-coast-senibong-cove", name: "Isola Coast Senibong Cove", location: "Senibong Cove", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "WM Senibong", image: "https://cdn1.npcdn.net/npimg/ddd72c9e381ee92b4ee2bf7ad039d4fe_1758047760.webp", rtsDistance: "", yieldPct: "" },
  { slug: "topaz-crest-austin", name: "Topaz Crest Austin", location: "Crest Austin", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "WM Senibong", image: "https://www.crestataustin.com.my/img/pages/home/features/feature-1/s.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "d-secret-garden-2-taman-kempas-indah", name: "D Secret Garden 2", location: "Taman Kempas Indah", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "KSL Holdings", image: "https://dsecretgarden2.com/wp-content/uploads/2025/04/ksl_2022-11-23291-1024x614.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "daya-1-residences-taman-daya", name: "Daya 1 Residences", location: "Taman Daya", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Keck Seng Group", image: "https://media.edgeprop.my/s3fs-public/editorial/my/2025/August/28/Daya%20CP.png", rtsDistance: "", yieldPct: "" },
  { slug: "meridin-east", name: "Meridin East", location: "Pasir Gudang", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Mah Sing Group", image: "https://meridin-east.com.my/wp-content/uploads/2022/06/MicrosoftTeams-image-19.jpg", rtsDistance: "", yieldPct: "" },
  { slug: "lanna-eco-tropics", name: "Lanna Eco Tropics", location: "Eco Tropics Pasir Gudang", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "EcoWorld", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop", rtsDistance: "", yieldPct: "" },
  { slug: "bee-development-nusajaya", name: "Bee Development Nusajaya", location: "Nusajaya", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Bee Group", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop", rtsDistance: "", yieldPct: "" },
  { slug: "fraser-heights-gelang-patah", name: "Fraser Heights Gelang Patah", location: "Gelang Patah", priceMYR: 0, priceSGD: 0, tenure: "Leasehold", completion: "TBC", size: "TBC", beds: "Studio, 1, 2, 3", baths: "", developer: "Tropicana Corporation", image: "https://www.johorprojects.com/wp-content/uploads/2025/06/FraserHeights1-1024x576.jpeg", rtsDistance: "", yieldPct: "" },
];

function fmtPrice(val: number): string {
  if (!val || val === 0) return 'On Request';
  return val.toLocaleString('en-MY');
}

function parseDistanceMeters(dist: string): number | null {
  if (!dist) return null;
  const num = parseFloat(dist);
  if (isNaN(num)) return null;
  if (dist.includes('km')) return num * 1000;
  return num; // assume meters
}

type RowDef = {
  label: string;
  key: keyof CompareProperty;
  fmt: (v: unknown) => string;
  best?: 'low' | 'high' | 'low_dist';
};

const ROWS: RowDef[] = [
  { label: 'Price (MYR)', key: 'priceMYR', fmt: (v) => (v && (v as number) > 0) ? `RM ${fmtPrice(v as number)}` : 'On Request', best: 'low' },
  { label: 'Price (SGD)', key: 'priceSGD', fmt: (v) => (v && (v as number) > 0) ? `S$ ${fmtPrice(v as number)}` : 'On Request', best: 'low' },
  { label: 'Location', key: 'location', fmt: (v) => (v as string) || '-' },
  { label: 'Tenure', key: 'tenure', fmt: (v) => (v as string) || '-' },
  { label: 'Bedrooms', key: 'beds', fmt: (v) => (v as string) || '-' },
  { label: 'Bathrooms', key: 'baths', fmt: (v) => (v as string) || '-' },
  { label: 'Size', key: 'size', fmt: (v) => (v as string) || '-' },
  { label: 'Gross Yield', key: 'yieldPct', fmt: (v) => (v as string) || '-', best: 'high' },
  { label: 'Distance to RTS', key: 'rtsDistance', fmt: (v) => (v as string) || '-', best: 'low_dist' },
  { label: 'Completion', key: 'completion', fmt: (v) => (v as string) || '-' },
  { label: 'Developer', key: 'developer', fmt: (v) => (v as string) || '-' },
];

export default function ComparePage() {
  const [slots, setSlots] = useState<string[]>(['', '']);

  const selectedProperties = useMemo(() => {
    return slots
      .map((slug, idx) => {
        if (!slug) return null;
        const prop = PROPERTIES.find((p) => p.slug === slug);
        return prop ? { prop, idx } : null;
      })
      .filter(Boolean) as { prop: CompareProperty; idx: number }[];
  }, [slots]);

  const showTable = selectedProperties.length >= 2;

  const bestIndices = useMemo(() => {
    const result: Record<string, number> = {};
    if (selectedProperties.length < 2) return result;

    ROWS.forEach((row) => {
      if (!row.best) return;
      let bestIdx = -1;

      if (row.best === 'low') {
        let minVal = Infinity;
        selectedProperties.forEach((s, i) => {
          const v = s.prop[row.key] as number;
          if (v && v > 0 && v < minVal) { minVal = v; bestIdx = i; }
        });
      } else if (row.best === 'high') {
        let maxVal = -1;
        selectedProperties.forEach((s, i) => {
          const v = parseFloat(s.prop[row.key] as string);
          if (v && v > maxVal) { maxVal = v; bestIdx = i; }
        });
      } else if (row.best === 'low_dist') {
        let minDist = Infinity;
        selectedProperties.forEach((s, i) => {
          const meters = parseDistanceMeters(s.prop[row.key] as string);
          if (meters !== null && meters > 0 && meters < minDist) { minDist = meters; bestIdx = i; }
        });
      }

      if (bestIdx >= 0) result[row.key] = bestIdx;
    });

    return result;
  }, [selectedProperties]);

  const handleSlotChange = useCallback((slotIdx: number, value: string) => {
    setSlots((prev) => {
      const next = [...prev];
      next[slotIdx] = value;
      return next;
    });
  }, []);

  const addSlot = useCallback(() => {
    if (slots.length >= 4) return;
    setSlots((prev) => [...prev, '']);
  }, [slots.length]);

  const removeProperty = useCallback((slotIdx: number) => {
    setSlots((prev) => {
      const next = [...prev];
      next[slotIdx] = '';
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        badge="&#9878; Property Comparison"
        title="Compare Properties"
        goldText="Properties"
        subtitle="Compare key details side by side to make a smart investment decision."
      />

      {/* Property Selector */}
      <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)] pt-10 pb-5">
        <div className="glass-card flex gap-4 flex-wrap items-end p-6 rounded-2xl">
          {slots.map((selectedSlug, idx) => (
            <div key={idx} className="flex-1 min-w-[220px]">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Property {idx + 1}
              </label>
              <select
                value={selectedSlug}
                onChange={(e) => handleSlotChange(idx, e.target.value)}
                className="glass-input w-full h-11 px-3.5 pr-9 rounded-lg text-sm text-gray-900 cursor-pointer transition-all focus:outline-none focus:border-[#c9a962] focus:ring-2 focus:ring-[#c9a962]/15 appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236e6e73' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                }}
              >
                <option value="">Select a property</option>
                {PROPERTIES.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            onClick={addSlot}
            disabled={slots.length >= 4}
            className="glass-button h-11 px-6 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Property
          </button>
        </div>
      </div>

      {/* Comparison Output */}
      <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)] pb-16 overflow-x-auto glass-card rounded-2xl mt-4 p-4">
        {!showTable ? (
          <div className="text-center py-20 text-gray-400">
            <Scale className="w-16 h-16 mx-auto mb-5 text-gray-300" />
            <h3 className="text-xl font-bold text-gray-500 mb-2">Select properties to compare</h3>
            <p className="text-[15px] max-w-[400px] mx-auto">
              Choose at least two properties from the dropdowns above to see a detailed side-by-side comparison.
            </p>
          </div>
        ) : (
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="p-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 min-w-[140px] sticky left-0 bg-white z-10" />
                {selectedProperties.map((s) => (
                  <th key={s.prop.slug} className="p-0 align-top border-b border-gray-100 min-w-[160px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.prop.image}
                      alt={s.prop.name}
                      className="w-full h-[140px] object-cover rounded-t-lg bg-gray-100"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className="p-3">
                      <div className="text-[15px] font-bold text-gray-900 leading-tight">{s.prop.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {s.prop.location}
                      </div>
                      <button
                        onClick={() => removeProperty(s.idx)}
                        className="mt-2 w-7 h-7 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center transition-all hover:bg-red-50 hover:text-red-500"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.key}>
                  <td className="p-3.5 text-sm font-medium text-gray-500 border-b border-gray-100 sticky left-0 bg-white z-[1]">
                    {row.label}
                  </td>
                  {selectedProperties.map((s, i) => {
                    const isBest = bestIndices[row.key] === i && row.best;
                    return (
                      <td
                        key={s.prop.slug}
                        className={`p-3.5 text-sm font-medium border-b border-gray-100 ${
                          isBest ? 'text-emerald-600 font-bold glass-tint-green' : 'text-gray-900'
                        }`}
                      >
                        {row.fmt(s.prop[row.key])}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* CTA Section */}
      <section
        className="py-24 px-[clamp(20px,5vw,60px)] text-center"
        style={{ background: 'linear-gradient(135deg, #1a3af5 0%, #1430d4 100%)' }}
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Let&rsquo;s Start Your Malaysia<br />Property Journey
        </h2>
        <p className="text-[17px] text-white/55 mb-9 max-w-[480px] mx-auto">
          Whether buying, selling, or renting &mdash; talk to our team for a free, no-obligation consultation.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="https://wa.me/60197058001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25d366] text-white px-9 py-4 rounded-full text-[17px] font-semibold transition-all hover:bg-[#20bd5a] hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.45)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.562 4.145 1.543 5.888L0 24l6.304-1.654A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.97 0-3.837-.53-5.445-1.455l-.39-.232-4.047 1.062 1.08-3.946-.254-.404A9.715 9.715 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
