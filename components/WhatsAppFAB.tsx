'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle } from 'lucide-react';

export function WhatsAppFAB() {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const pathname = usePathname() || '';

  // Property detail pages already have a sticky mobile contact bar — hide FAB on mobile there
  const hideOnMobile = /^\/properties\/[^/]+$/.test(pathname);

  return (
    <div className={`fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 flex-col items-center gap-3 ${hideOnMobile ? 'hidden md:flex' : 'flex'}`}>
      {/* Phone Button */}
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
