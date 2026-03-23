'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, ChevronDown, Search, User } from 'lucide-react';

const navLinks = [
  { href: '/buy', label: 'Buy' },
  { href: '/rent', label: 'Rent' },
  { href: '/sell', label: 'Sell' },
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
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
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
    <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-3">
      <nav
        className={`flex items-center justify-between h-[56px] px-5 mx-auto max-w-[1400px] rounded-full transition-all duration-400 backdrop-blur-2xl border ${
          isScrolled
            ? 'bg-[#262B40]/90 border-white/12 shadow-2xl shadow-[#262B40]/30'
            : 'bg-[#262B40]/75 border-white/8 shadow-xl shadow-[#262B40]/20'
        }`}
        style={{ WebkitBackdropFilter: 'blur(24px) saturate(160%)' }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-[17px] font-extrabold tracking-tight flex items-center gap-2.5 text-white"
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#0474C4" />
            <path d="M6 13c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="1" />
            <path d="M6 17c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.55" />
            <path d="M6 21c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.3" />
          </svg>
          Straits Advisory
        </Link>

        {/* Desktop Nav — Center */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-white/75 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/8 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right — Actions */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Language Selector */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 text-[13px] text-white/70 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/8 transition-all duration-200"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{currentLangLabel}</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 top-full mt-2 bg-[#262B40]/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl py-1 min-w-[110px] z-50">
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
            className="px-5 py-[7px] rounded-full text-[13px] font-semibold bg-[#0474C4] border border-[#0474C4]/50 text-white hover:bg-[#0474C4]/90 transition-all duration-200"
          >
            WhatsApp Us
          </a>

          {/* Menu Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-1.5 text-[13px] text-white/70 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/8 transition-all duration-200"
          >
            <span>Menu</span>
            <Menu className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-white"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Dropdown Menu (both desktop "Menu" and mobile hamburger) */}
      {isMenuOpen && (
        <div className="mt-2 mx-auto max-w-[1400px] bg-[#262B40]/92 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-[#262B40]/30 border border-white/8 overflow-hidden" style={{ WebkitBackdropFilter: 'blur(24px) saturate(160%)' }}>
          <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Nav Links */}
            <div className="lg:col-span-2">
              <p className="text-[10px] text-white/30 uppercase tracking-[2px] font-semibold mb-3">Navigation</p>
              <div className="grid grid-cols-2 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[15px] font-medium text-white/80 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Language & Contact */}
            <div>
              <p className="text-[10px] text-white/30 uppercase tracking-[2px] font-semibold mb-3">Language</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150 ${
                      selectedLang === lang.code
                        ? 'bg-[#c9a962] text-white'
                        : 'bg-white/8 text-white/60 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              <a
                href="https://wa.me/60197058001"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center py-2.5 rounded-full text-[13px] font-semibold bg-[#25d366] text-white hover:bg-[#20bd5a] transition-all duration-200"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
