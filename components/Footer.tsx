import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1d1d1f] text-white py-16">
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="6" fill="#c9a962" />
                <path d="M8 14h12M14 8v12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <h3 className="text-lg font-bold">Straits Advisory</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted gateway to Johor Bahru property investment. Bridging Singapore and Malaysia markets.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Properties</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/en-SG/properties" className="hover:text-white transition-colors">All Properties</Link></li>
              <li><Link href="/en-SG/map" className="hover:text-white transition-colors">Interactive Map</Link></li>
              <li><Link href="/en-SG/calculator" className="hover:text-white transition-colors">Budget Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/en-SG/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/en-SG/about" className="hover:text-white transition-colors">Why Work With Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="https://wa.me/60169928899" target="_blank" rel="noopener noreferrer" className="hover:text-[#25d366] transition-colors">
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a href="tel:+60169928899" className="hover:text-white transition-colors">
                  +60 16-992 8899
                </a>
              </li>
              <li>info@straitsadvisory.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Straits Advisory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
