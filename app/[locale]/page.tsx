'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, Phone } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { PropertyCard } from '@/components/PropertyCard';
import { getFeaturedProperties } from '@/lib/properties';

const featuredProperties = getFeaturedProperties();

const heroSlides = [
  { video: '/videos/kl-aerial.mp4', label: 'Kuala Lumpur' },
  { video: '/videos/jb-harbour.mp4', label: 'Puteri Harbour' },
];

export default function HomePage() {
  const locale = useLocale();
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Auto-rotate hero videos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const filters = ['All', 'Freehold', 'Seafront', 'Under Construction', 'Completed'];

  return (
    <main className="min-h-screen bg-white">
      {/* Video Hero */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black">
        {heroSlides.map((slide, i) => (
          <video
            key={i}
            ref={(el) => { videoRefs.current[i] = el; }}
            src={slide.video}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${
              i === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55 z-[1]" />

        {/* Content */}
        <div className="relative z-[2] h-full flex flex-col items-center justify-center text-center px-[clamp(20px,5vw,60px)]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(36px,7vw,72px)] font-[800] tracking-[-0.03em] leading-[1.08] mb-5 text-white"
          >
            Bridging Markets.
            <br />
            <span className="text-[#D4C4A8]">Building Futures.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[clamp(15px,2vw,20px)] text-white/75 max-w-[540px] leading-relaxed mb-9"
          >
            Your trusted gateway to Johor Bahru property investment.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            href="https://wa.me/60169928899"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25d366] text-white px-9 py-4 rounded-full text-[17px] font-semibold shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:bg-[#20bd5a] hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(37,211,102,0.45)] transition-all duration-300"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Get Started on WhatsApp
          </motion.a>
        </div>

        {/* Slide Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex items-center gap-3">
          {heroSlides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className="flex items-center gap-2"
            >
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeSlide ? 'bg-white scale-110' : 'bg-white/40'
                }`}
              />
              {i === activeSlide && (
                <span className="text-white/70 text-xs font-medium">{slide.label}</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-gray-200 py-4 px-[clamp(16px,4vw,48px)]">
        <div className="max-w-[1400px] mx-auto flex gap-3 items-center flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, area, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 border border-gray-300 rounded-xl text-[15px] bg-white outline-none focus:border-[#007aff] focus:ring-[3px] focus:ring-[#007aff]/15 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-[18px] py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${
                  activeFilter === filter
                    ? 'bg-[#007aff] text-white border-[#007aff]'
                    : 'bg-white text-gray-500 border-gray-300 hover:border-[#007aff] hover:text-[#007aff]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-2 max-w-[1400px] mx-auto">
          {featuredProperties.length} properties available
        </p>
      </section>

      {/* Property Grid */}
      <section className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)] py-6 pb-20">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6">
          {featuredProperties.map((property, index) => (
            <ScrollReveal key={property.id} delay={index * 0.1}>
              <PropertyCard property={property} />
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}/properties`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:border-[#007aff] hover:text-[#007aff] transition-all"
          >
            View All Properties
          </Link>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="tel:+60169928899"
          className="w-14 h-14 rounded-full bg-[#007aff] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <Phone className="w-6 h-6" />
        </a>
        <a
          href="https://wa.me/60169928899"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </main>
  );
}
