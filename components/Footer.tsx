import { Phone, Mail, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="glass-dark-heavy text-white py-16 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="36" height="24" viewBox="-1 2 67 44" fill="none" className="flex-shrink-0">
                <path d="M2 14c7-10 14-10 21 0s14 10 21 0 14-10 21 0" stroke="#5289AD" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M2 24c7-10 14-10 21 0s14 10 21 0 14-10 21 0" stroke="#ACBCBF" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M2 34c7-10 14-10 21 0s14 10 21 0 14-10 21 0" stroke="#ACBCBF" strokeWidth="4" strokeLinecap="round" fill="none" />
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
                  href="tel:+60102038001"
                  className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                >
                  <Phone className="h-4 w-4 text-[#D4C4A8]" />
                  Call Us +60 10-203 8001
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@straitsadvisory.group"
                  className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                >
                  <Mail className="h-4 w-4 text-[#D4C4A8]" />
                  hello@straitsadvisory.group
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/60102038001"
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

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; 2025 Straits Advisory. All rights reserved.</p>
          <a href="/privacy" className="hover:text-white transition-colors duration-200">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
