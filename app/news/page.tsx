'use client';

import { useState } from 'react';
import {
  Train,
  TrendingUp,
  Globe,
  FileText,
  BookOpen,
  Home,
  Briefcase,
  Building,
  Clock,
  Newspaper,
  Star,
} from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/60197058001';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.562 4.145 1.543 5.888L0 24l6.304-1.654A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.97 0-3.837-.53-5.445-1.455l-.39-.232-4.047 1.062 1.08-3.946-.254-.404A9.715 9.715 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
    </svg>
  );
}

type Category = 'all' | 'market' | 'guides' | 'launches' | 'policy';

interface Article {
  id: number;
  category: Exclude<Category, 'all'>;
  categoryLabel: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  icon: React.ReactNode;
}

const articles: Article[] = [
  {
    id: 1,
    category: 'market',
    categoryLabel: 'Market Update',
    title: 'JB-Singapore RTS Link Nears Completion, On Track for 2026 Launch',
    description:
      'The 4km Rapid Transit System connecting Bukit Chagar to Woodlands North has reached advanced construction stages, with the Wadi Hana Depot at 97% completion. Full operations expected by end of 2026, reducing cross-border travel to just 5 minutes.',
    date: 'November 2025',
    readTime: '4 min read',
    icon: <Train className="w-12 h-12 text-white" />,
  },
  {
    id: 2,
    category: 'market',
    categoryLabel: 'Market Update',
    title: 'Johor Bahru Property Prices Surge 20% on JS-SEZ Momentum',
    description:
      'Serviced apartment transaction prices in JB jumped 20.4% year-on-year, while double-storey terrace houses climbed 8.6%. The Johor-Singapore Special Economic Zone is driving renewed foreign and domestic investment into the region.',
    date: 'July 2025',
    readTime: '5 min read',
    icon: <TrendingUp className="w-12 h-12 text-white" />,
  },
  {
    id: 3,
    category: 'market',
    categoryLabel: 'Market Update',
    title: 'Singapore Demand for Johor Property Triples Since 2019',
    description:
      'Foreign buyers, predominantly from Singapore and China, now account for over 40% of property transactions in JB city centre. Properties within 5km of RTS stations have already appreciated 18-20% before completion.',
    date: 'March 2025',
    readTime: '6 min read',
    icon: <Globe className="w-12 h-12 text-white" />,
  },
  {
    id: 4,
    category: 'policy',
    categoryLabel: 'Policy',
    title: 'Malaysia Doubles Stamp Duty for Foreign Property Buyers to 8%',
    description:
      'Effective January 2026, Malaysia increased stamp duty on residential property transfers for foreign buyers from 4% to 8%. Some developers in Iskandar Malaysia have indicated they may absorb part of the increased duty.',
    date: 'January 2026',
    readTime: '3 min read',
    icon: <FileText className="w-12 h-12 text-white" />,
  },
  {
    id: 5,
    category: 'guides',
    categoryLabel: 'Buyer Guide',
    title: '2025-2026 Guide: Buying Property in Malaysia as a Foreigner',
    description:
      'Foreign buyers can purchase property subject to state-specific minimum thresholds \u2014 RM1 million for landed in Johor. Every purchase requires state land authority approval. MM2H is optional for ownership.',
    date: '2025',
    readTime: '8 min read',
    icon: <BookOpen className="w-12 h-12 text-white" />,
  },
  {
    id: 6,
    category: 'policy',
    categoryLabel: 'Policy',
    title: 'MM2H Program Restructured Into Three-Tier Model for 2026',
    description:
      'The Malaysia My Second Home program now features Silver, Gold, and Platinum tiers. All applicants must purchase property within one year of visa endorsement and hold it for ten years.',
    date: '2025',
    readTime: '5 min read',
    icon: <Home className="w-12 h-12 text-white" />,
  },
  {
    id: 7,
    category: 'market',
    categoryLabel: 'Market Update',
    title: 'The JS-SEZ: What It Means for Cross-Border Real Estate',
    description:
      'The JS-SEZ spans 3,288 sq km across nine flagship zones, reshaping Johor\'s property landscape. Property values in JB city centre have appreciated 40-50% since 2020, with analysts projecting 5-10% annual growth.',
    date: '2025',
    readTime: '7 min read',
    icon: <Briefcase className="w-12 h-12 text-white" />,
  },
  {
    id: 8,
    category: 'launches',
    categoryLabel: 'New Launch',
    title: 'Top New Housing Developments Launching in Johor 2025-2026',
    description:
      'Major new launches include resort-style developments near the RTS with dual-key concepts, plus the RM4 billion Yahya Awal mixed-use project with over 1,000 SOHO units launching Q3 2025.',
    date: '2025',
    readTime: '6 min read',
    icon: <Building className="w-12 h-12 text-white" />,
  },
];

const filters: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'market', label: 'Market Updates' },
  { key: 'guides', label: 'Buyer Guides' },
  { key: 'launches', label: 'New Launches' },
  { key: 'policy', label: 'Policy & Regulations' },
];

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  const filteredArticles =
    activeFilter === 'all'
      ? articles
      : articles.filter((a) => a.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-16 md:pt-16">
        <div className="bg-gradient-to-br from-[#243C4C] to-[#5289AD] text-center text-white py-20 md:py-24 px-6 relative overflow-hidden">
          <div className="absolute -top-1/2 -right-[30%] w-[80%] h-[200%] bg-[radial-gradient(ellipse,rgba(212,196,168,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4C4A8] text-[#D4C4A8] text-[13px] font-semibold tracking-wider uppercase mb-8 bg-[#D4C4A814]">
              <Star className="w-4 h-4" /> Property News
            </div>
            <h1 className="text-4xl md:text-[64px] font-extrabold tracking-tight leading-[1.1] mb-5">
              Market <span className="text-[#D4C4A8]">Insights</span>
            </h1>
            <p className="text-base md:text-xl text-white/65 max-w-[640px] mx-auto leading-relaxed">
              Latest property news, market analysis, and investment insights across Malaysia.
            </p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-9 justify-center">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeFilter === f.key
                  ? 'glass-dark text-white'
                  : 'glass-button text-gray-500 hover:text-gray-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="w-full aspect-video bg-gradient-to-br from-[#243C4C] to-[#5289AD] relative flex items-center justify-center">
                  {article.icon}
                  <span className="glass-pill-dark absolute top-3 left-3 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                    {article.categoryLabel}
                  </span>
                </div>
                {/* Body */}
                <div className="p-5">
                  <h3 className="text-[17px] font-bold leading-snug mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {article.readTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="glass-card text-center py-20 text-gray-500 rounded-2xl">
            <Newspaper className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Coming Soon</h3>
            <p className="text-sm max-w-md mx-auto">
              We&rsquo;re preparing insightful articles on Malaysia&rsquo;s property market. Stay
              tuned for market updates, buyer guides, and investment analysis.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-gradient-to-br from-[#243C4C] to-[#5289AD]">
        <h2 className="text-3xl md:text-[44px] font-extrabold text-white mb-4 tracking-tight">
          Let&rsquo;s Start Your Malaysia
          <br />
          Property Journey
        </h2>
        <p className="text-[17px] text-white/55 mb-9 max-w-[520px] mx-auto">
          Whether buying, selling, or renting &mdash; talk to our team for a free, no-obligation
          consultation.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25d366] text-white px-9 py-4 rounded-full text-[17px] font-semibold hover:bg-[#20bd5a] hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(37,211,102,0.35)]"
          >
            <WhatsAppIcon className="w-[22px] h-[22px]" />
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#243C4C] py-8 px-6 border-t border-white/[0.06] text-center">
        <p className="text-[13px] text-white/35">
          &copy; 2025 Straits Advisory. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
