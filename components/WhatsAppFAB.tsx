'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Phone, MessageCircle, Search } from 'lucide-react';

export function WhatsAppFAB() {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const pathname = usePathname() || '';
  const router = useRouter();

  // Property detail pages already have a sticky mobile contact bar — hide FAB on mobile there
  const hideOnMobile = /^\/properties\/[^/]+$/.test(pathname);

  // On the buy page, the secondary FAB is a Search/Filter trigger that opens
  // the filter drawer (replaces the sticky filter bar on mobile).
  const isBuyPage = pathname === '/buy';

  const handleSearchClick = () => {
    if (isBuyPage) {
      window.dispatchEvent(new CustomEvent('open-buy-filters'));
    } else {
      router.push('/buy#filters');
    }
  };

  return (
    <div className={`fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 flex-col items-center gap-3 ${hideOnMobile ? 'hidden md:flex' : 'flex'}`}>
      {/* Top button: Search (on /buy) or Phone (everywhere else) */}
      {isBuyPage ? (
        <button
          type="button"
          onClick={handleSearchClick}
          className={`flex items-center justify-center w-14 h-14 rounded-full glass-button glass-specular bg-[#5289AD]/70 text-white transition-transform duration-200 ${
            isHovered === 'search' ? 'scale-110' : ''
          }`}
          onMouseEnter={() => setIsHovered('search')}
          onMouseLeave={() => setIsHovered(null)}
          aria-label="Search & filter properties"
        >
          <Search className="h-6 w-6" />
        </button>
      ) : (
        <a
          href="tel:+60102038001"
          className={`flex items-center justify-center w-14 h-14 rounded-full glass-button glass-specular bg-[#5289AD]/70 text-white transition-transform duration-200 ${
            isHovered === 'phone' ? 'scale-110' : ''
          }`}
          onMouseEnter={() => setIsHovered('phone')}
          onMouseLeave={() => setIsHovered(null)}
          aria-label="Call us"
        >
          <Phone className="h-6 w-6" />
        </a>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/60102038001"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center w-14 h-14 rounded-full glass-button-green glass-specular text-white transition-transform duration-200 ${
          isHovered === 'whatsapp' ? 'scale-110' : ''
        }`}
        onMouseEnter={() => setIsHovered('whatsapp')}
        onMouseLeave={() => setIsHovered(null)}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
