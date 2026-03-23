'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { MapPin, ArrowRight } from 'lucide-react';

// Dynamically import the map component (needs client-side only)
const ListingsMap = dynamic(() => import('@/components/home/ListingsMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[480px] rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-sm">
      Interactive map loading...
    </div>
  ),
});

// Video URLs from the HTML source
const VIDEO_URLS = [
  'https://videos.pexels.com/video-files/15186706/15186706-hd_1920_1080_30fps.mp4',
  'https://videos.pexels.com/video-files/14717069/14717069-hd_1920_1080_30fps.mp4',
];

// Recommended properties from index.html
const RECOMMENDED = [
  {
    name: 'R&F Princess Cove',
    location: 'Bukit Chagar, JB',
    price: 'From RM350,000',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=360&fit=crop',
    href: '/properties/rf-princess-cove',
    statusBadge: 'Completed',
    tenureBadge: 'Freehold',
  },
  {
    name: 'The M Macrolink',
    location: 'Medini Iskandar Puteri, JB',
    price: 'Price on Request',
    image: 'https://the-m-macrolink.com/wp-content/uploads/2025/01/01.jpg',
    href: '/properties/the-m-macrolink-medini',
    statusBadge: 'Completed',
    tenureBadge: 'Leasehold',
  },
  {
    name: 'Puteri Cove Residences',
    location: 'Puteri Harbour, JB',
    price: 'Price on Request',
    image: 'https://nry.com.my/wp-content/uploads/2019/10/PCR_slider1.jpg',
    href: '/properties/puteri-cove-residences-puteri-harbour',
    statusBadge: 'Completed',
    tenureBadge: 'Freehold',
  },
];

// ─── Video Hero Section ───
function VideoHero() {
  const [currentVid, setCurrentVid] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVid((prev) => (prev + 1) % VIDEO_URLS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentVid) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      }
    });
  }, [currentVid]);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#0a0a0a]">
      {VIDEO_URLS.map((url, idx) => (
        <video
          key={url}
          ref={(el) => { videoRefs.current[idx] = el; }}
          src={url}
          muted
          autoPlay={idx === 0}
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${
            idx === currentVid ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />
      {/* Content */}
      <div className="relative z-[2] h-full flex flex-col items-center justify-center text-center px-[clamp(20px,5vw,60px)]">
        <h1 className="text-[clamp(36px,7vw,72px)] font-extrabold tracking-tight leading-[1.08] mb-5 text-white">
          Bridging Markets.<br />
          <span className="text-[#c9a962]">Building Futures.</span>
        </h1>
        <p className="text-[clamp(15px,2vw,20px)] text-white/75 max-w-[540px] leading-relaxed font-normal mb-9">
          Your trusted gateway to Investing in Malaysia&apos;s Real Estate.
        </p>
        <a
          href="https://wa.me/6581234567"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#25d366] text-white px-9 py-4 rounded-full text-[17px] font-semibold transition-all hover:bg-[#20bd5a] hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.45)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.562 4.145 1.543 5.888L0 24l6.304-1.654A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.97 0-3.837-.53-5.445-1.455l-.39-.232-4.047 1.062 1.08-3.946-.254-.404A9.715 9.715 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
          </svg>
          Get Started on WhatsApp
        </a>
      </div>
    </section>
  );
}

// ─── About Section ───
function AboutSection() {
  return (
    <section className="bg-[#f5f5f5] py-20 px-[clamp(20px,5vw,60px)] text-center">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-4xl font-extrabold text-[#1a1a2e] tracking-widest uppercase mb-5 leading-tight">
          Straits Advisory
        </h2>
        <p className="text-sm font-semibold text-[#1a1a2e] tracking-[3px] uppercase mb-8">
          Technology Meets Expertise
        </p>
        <p className="text-base text-gray-600 leading-relaxed max-w-[750px] mx-auto">
          As Malaysia&apos;s most technologically advanced property consultancy, we bring together decades of
          experience enhanced by cutting-edge AI, real-time analytics and proprietary technology. We serve our
          clients with transparency and precision, no pressure tactics, just data-driven guidance tailored to
          your goals.
        </p>
      </div>
    </section>
  );
}

// ─── Recommended Properties ───
function RecommendedProperties() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-[clamp(20px,5vw,60px)]">
        <h2 className="text-[28px] font-extrabold text-[#1a1a2e] mb-2 text-center">
          Recommended Properties
        </h2>
        <p className="text-[15px] text-gray-500 text-center mb-8">
          Handpicked developments for Singapore investors
        </p>
      </div>
      <div className="flex gap-5 justify-center px-[clamp(20px,5vw,60px)] pb-5 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {RECOMMENDED.map((prop) => (
          <Link
            key={prop.name}
            href={prop.href}
            className="flex-none w-[300px] rounded-2xl overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1"
          >
            <div
              className="h-[180px] bg-center bg-cover relative"
              style={{ backgroundImage: `url('${prop.image}')` }}
            >
              <span className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[rgba(26,26,46,0.85)] text-white backdrop-blur-sm">
                {prop.statusBadge}
              </span>
              <span className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[rgba(201,169,98,0.9)] text-white">
                {prop.tenureBadge}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-[15px] font-bold mb-1">{prop.name}</h3>
              <p className="text-[13px] text-gray-500 mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                {prop.location}
              </p>
              <p className="text-[15px] font-bold text-[#1a1a2e]">{prop.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Map Section ───
function MapSection() {
  const [activeCity, setActiveCity] = useState<'all' | 'jb' | 'kl' | 'pg'>('all');

  const cities = [
    { key: 'all' as const, label: 'All Cities' },
    { key: 'jb' as const, label: 'Johor Bahru' },
    { key: 'kl' as const, label: 'Kuala Lumpur' },
    { key: 'pg' as const, label: 'Penang' },
  ];

  return (
    <section className="py-16 px-[clamp(16px,4vw,48px)] bg-white">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[28px] font-extrabold text-[#1a1a2e] mb-2 text-center">
          Explore Our Listings
        </h2>
        <p className="text-[15px] text-gray-500 text-center mb-5">
          90+ properties across Malaysia &mdash; click a pin for details
        </p>
        <div className="flex justify-center gap-2 mb-5">
          {cities.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCity(c.key)}
              className={`px-5 py-2 rounded-full border text-[13px] font-semibold transition-all duration-200 ${
                activeCity === c.key
                  ? 'bg-[#1a1a2e] text-white border-[#1a1a2e]'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-[#1a1a2e] hover:text-[#1a1a2e]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <ListingsMap activeCity={activeCity} />
      </div>
    </section>
  );
}

// ─── Browse All Properties CTA ───
function BrowseSection() {
  return (
    <section className="py-12 px-[clamp(16px,4vw,48px)] text-center bg-gray-50 border-t border-b border-gray-200">
      <div className="max-w-[700px] mx-auto">
        <h2 className="text-2xl font-extrabold text-[#1a1a2e] mb-2.5">
          Browse All 90+ Properties
        </h2>
        <p className="text-[15px] text-gray-500 mb-7 leading-relaxed">
          Explore our handpicked developments across Johor Bahru, Kuala Lumpur, and Penang with filters, search, and detailed listings.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          {[
            { label: 'Johor Bahru', href: '/buy?city=jb' },
            { label: 'Kuala Lumpur', href: '/buy?city=kl' },
            { label: 'Penang', href: '/buy?city=pg' },
          ].map((city) => (
            <Link
              key={city.label}
              href={city.href}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1a1a2e] text-white text-base font-semibold transition-all duration-200 hover:bg-[#c9a962] hover:text-[#1a1a2e]"
            >
              {city.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ───
function CTASection() {
  return (
    <section
      className="py-24 px-[clamp(20px,5vw,60px)] text-center"
      style={{ background: 'linear-gradient(135deg, #1a1a3e 0%, #2d2b55 100%)' }}
    >
      <h2 className="text-[clamp(28px,5vw,44px)] font-extrabold text-white mb-4 tracking-tight">
        Let&rsquo;s Start Your Malaysia<br />Property Journey
      </h2>
      <p className="text-[17px] text-white/55 mb-9 max-w-[520px] mx-auto">
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
  );
}

// ─── Main Homepage ───
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <VideoHero />
      <AboutSection />
      <RecommendedProperties />
      <MapSection />
      <BrowseSection />
      <CTASection />
    </div>
  );
}
