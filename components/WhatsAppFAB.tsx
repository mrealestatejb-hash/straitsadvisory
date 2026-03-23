'use client';

import { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export function WhatsAppFAB() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Phone Button */}
      <a
        href="tel:+60197058001"
        className={`flex items-center justify-center w-14 h-14 rounded-full glass-button glass-specular bg-blue-500/70 text-white transition-transform duration-200 ${
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
        href="https://wa.me/60197058001"
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
