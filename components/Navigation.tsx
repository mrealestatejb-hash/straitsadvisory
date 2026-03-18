'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}/properties`, label: 'Properties' },
    { href: `/${locale}/about`, label: 'Why Us' },
    { href: `/${locale}/about`, label: 'About' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-gray-200'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="flex items-center justify-between h-16 px-[clamp(20px,4vw,48px)]">
        <Link
          href={`/${locale}`}
          className={`text-lg font-bold flex items-center gap-2.5 transition-colors duration-300 ${
            isScrolled ? 'text-gray-900' : 'text-white'
          }`}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="#c9a962" />
            <path d="M8 14h12M14 8v12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Straits Advisory
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled
                  ? 'text-gray-500 hover:text-gray-900'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/60169928899"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              isScrolled
                ? 'bg-[#007aff] text-white border border-[#007aff] hover:bg-[#0066d6]'
                : 'bg-white/15 backdrop-blur-sm text-white border border-white/25 hover:bg-white/25'
            }`}
          >
            WhatsApp Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden p-2 transition-colors ${
            isScrolled ? 'text-gray-900' : 'text-white'
          }`}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b overflow-hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-gray-900 py-2"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/60169928899"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#007aff] text-white text-center py-3 rounded-full font-semibold mt-2"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
