import { Phone, Mail, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="glass-dark-heavy text-white py-16 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#0474C4" />
                <path d="M6 13c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="1" />
                <path d="M6 17c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.55" />
                <path d="M6 21c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.3" />
              </svg>
              <h3 className="text-lg font-bold">Straits Advisory</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Singapore&apos;s trusted gateway to Johor Bahru property investment. Expert guidance from search to settlement.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="tel:+60197058001"
                  className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                >
                  <Phone className="h-4 w-4 text-[#c9a962]" />
                  Call Us +60 19-705 8001
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@straitsadvisory.group"
                  className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                >
                  <Mail className="h-4 w-4 text-[#c9a962]" />
                  hello@straitsadvisory.group
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/60197058001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#25d366] transition-colors duration-200"
                >
                  <MessageCircle className="h-4 w-4 text-[#25d366]" />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; 2025 Straits Advisory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
