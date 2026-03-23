'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/buy', label: 'Buy' },
  { href: '/sell', label: 'Sell' },
  { href: '/rent', label: 'Rent' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/news', label: 'News' },
  { href: '/compare', label: 'Compare' },
];

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'zh-CN', label: '简体' },
  { code: 'zh-TW', label: '繁體' },
  { code: 'ms', label: 'BM' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'th', label: 'ไทย' },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangLabel = languages.find((l) => l.code === selectedLang)?.label || 'EN';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1a1a2e]/95 backdrop-blur-xl shadow-lg'
          : 'bg-[#1a1a2e]/80 backdrop-blur-md'
      }`}
    >
      <nav className="flex items-center justify-between h-16 px-[clamp(16px,4vw,48px)] max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold flex items-center gap-2.5 text-white"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="#c9a962" />
            <path d="M8 14h12M14 8v12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Straits Advisory
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}

          {/* Language Selector */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors duration-200"
            >
              <Globe className="h-4 w-4" />
              <span>{currentLangLabel}</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 top-full mt-2 bg-[#1a1a2e] border border-white/10 rounded-lg shadow-xl py-1 min-w-[100px] z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                      selectedLang === lang.code
                        ? 'text-[#c9a962] bg-white/5'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/60197058001"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full text-sm font-semibold bg-[#25d366] text-white hover:bg-[#20bd5a] transition-colors duration-200"
          >
            WhatsApp Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-white"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#1a1a2e] border-t border-white/10 overflow-hidden">
          <div className="px-5 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium text-white/80 hover:text-white py-3 border-b border-white/5 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Language Selector */}
            <div className="py-3 border-b border-white/5">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Language</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors duration-150 ${
                      selectedLang === lang.code
                        ? 'bg-[#c9a962] text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile WhatsApp CTA */}
            <a
              href="https://wa.me/60197058001"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25d366] text-white text-center py-3 rounded-full font-semibold mt-3"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
