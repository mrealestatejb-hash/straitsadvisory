'use client';

import React, { useState, useCallback } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import {
  Monitor,
  Bot,
  BarChart3,
  Bell,
  TrendingUp,
  Video,
  Zap,
  Lock,
  Gem,
  Globe,
  Mic,
  Camera,
  MessageCircle,
  Phone,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */
const stats = [
  { icon: <Zap className="w-7 h-7" />, value: 'AI+ Powered', label: 'Analytics' },
  { icon: <Lock className="w-7 h-7" />, value: '24/7', label: 'Client Portal Access' },
  { icon: <Gem className="w-7 h-7" />, value: '100%', label: 'Price Transparency' },
  { icon: <Globe className="w-7 h-7" />, value: '3+', label: 'Regions Covered' },
];

/* ------------------------------------------------------------------ */
/*  Features                                                           */
/* ------------------------------------------------------------------ */
const features = [
  {
    icon: Monitor,
    title: 'Client Portal',
    status: 'Live' as const,
    color: 'bg-[#5289AD]/10 text-[#5289AD]',
    description:
      '24/7 access to documents, transaction progress, payment milestones — everything in one place.',
  },
  {
    icon: Bot,
    title: 'AI Property Advisor',
    status: 'Coming Soon' as const,
    color: 'bg-[#5289AD]/10 text-[#5289AD]',
    description:
      'Instant answers to your property questions, multilingual support, available 24/7.',
  },
  {
    icon: BarChart3,
    title: 'Investment Calculator',
    status: 'Live' as const,
    color: 'bg-[#5289AD]/10 text-[#5289AD]',
    description:
      'Total costs upfront — stamp duty, legal fees, levy. Compare ROI across properties instantly.',
  },
  {
    icon: Bell,
    title: 'Market Alerts',
    status: 'Live' as const,
    color: 'bg-[#5289AD]/10 text-[#5289AD]',
    description:
      'Be the first to know about matching properties, price changes, and new launches.',
  },
  {
    icon: TrendingUp,
    title: 'Portfolio Dashboard',
    status: 'Coming Soon' as const,
    color: 'bg-[#5289AD]/10 text-[#5289AD]',
    description:
      'Track all your Malaysian properties in one view — values, yields, and performance over time.',
  },
  {
    icon: Video,
    title: 'Virtual Viewing',
    status: 'Live' as const,
    color: 'bg-[#5289AD]/10 text-[#5289AD]',
    description:
      'Live Zoom walkthroughs for overseas buyers. See every unit without leaving Singapore.',
  },
];

/* ------------------------------------------------------------------ */
/*  Demo Tabs                                                          */
/* ------------------------------------------------------------------ */
const tabs = [
  { id: 'calculator', label: 'Investment Calculator' },
  { id: 'portal', label: 'Client Portal' },
  { id: 'viewing', label: 'Virtual Viewing' },
  { id: 'concierge', label: 'Personal Concierge' },
  { id: 'alerts', label: 'Market Updates' },
  { id: 'portfolio', label: 'Portfolio Dashboard' },
];

/* ------------------------------------------------------------------ */
/*  Calculator Panel                                                   */
/* ------------------------------------------------------------------ */
function CalculatorPanel() {
  const [price, setPrice] = useState(500000);
  const [type, setType] = useState('residential');
  const [rent, setRent] = useState(2000);
  const [nationality, setNationality] = useState('foreigner');
  const [results, setResults] = useState(() => calc(500000, 2000));

  function calc(p: number, r: number) {
    let sd = 0;
    if (p <= 100000) sd = p * 0.01;
    else if (p <= 500000) sd = 1000 + (p - 100000) * 0.02;
    else if (p <= 1000000) sd = 1000 + 8000 + (p - 500000) * 0.03;
    else sd = 1000 + 8000 + 15000 + (p - 1000000) * 0.04;

    let lf = 0;
    if (p <= 500000) lf = p * 0.01 + 350;
    else if (p <= 1000000) lf = 5000 + (p - 500000) * 0.008 + 350;
    else lf = 5000 + 4000 + (p - 1000000) * 0.005 + 350;

    const levy = 0;
    const total = p + sd + lf + levy;
    const gy = p > 0 ? ((r * 12) / p) * 100 : 0;

    return {
      price: p,
      stamp: Math.round(sd),
      legal: Math.round(lf),
      levy,
      total: Math.round(total),
      yield: gy.toFixed(2),
    };
  }

  const handleCalc = useCallback(() => {
    setResults(calc(price, rent));
  }, [price, rent]);

  const fmt = (v: number) =>
    'RM ' + v.toLocaleString('en-MY', { maximumFractionDigits: 0 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className="block text-[13px] text-white/60 mb-1.5 font-medium">
            Property Price (MYR)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="glass-input w-full px-4 py-3 rounded-lg text-white text-[15px] outline-none focus:border-[#D4C4A8] transition-all"
          />
        </div>
        <div>
          <label className="block text-[13px] text-white/60 mb-1.5 font-medium">
            Property Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="glass-input w-full px-4 py-3 rounded-lg text-white text-[15px] outline-none focus:border-[#D4C4A8] transition-all [&>option]:bg-[#243C4C] [&>option]:text-white"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label className="block text-[13px] text-white/60 mb-1.5 font-medium">
            Expected Monthly Rent (MYR)
          </label>
          <input
            type="number"
            value={rent}
            onChange={(e) => setRent(Number(e.target.value))}
            className="glass-input w-full px-4 py-3 rounded-lg text-white text-[15px] outline-none focus:border-[#D4C4A8] transition-all"
          />
        </div>
        <div>
          <label className="block text-[13px] text-white/60 mb-1.5 font-medium">
            Buyer Nationality
          </label>
          <select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="glass-input w-full px-4 py-3 rounded-lg text-white text-[15px] outline-none focus:border-[#D4C4A8] transition-all [&>option]:bg-[#243C4C] [&>option]:text-white"
          >
            <option value="foreigner">Foreigner</option>
            <option value="local">Malaysian</option>
          </select>
        </div>
        <button
          onClick={handleCalc}
          className="glass-button-green w-full py-3.5 rounded-lg text-[15px] font-bold transition-all mt-2 cursor-pointer"
        >
          Calculate Total Costs
        </button>
      </div>

      <div className="bg-white/[0.04] rounded-xl p-6">
        <h3 className="text-base font-bold mb-5 text-[#D4C4A8]">
          Cost Breakdown
        </h3>
        <div className="space-y-0">
          {[
            { label: 'Property Price', value: fmt(results.price) },
            { label: 'Stamp Duty', value: fmt(results.stamp) },
            { label: 'Legal Fees (est.)', value: fmt(results.legal) },
            { label: 'Foreign Levy', value: fmt(results.levy) },
          ].map((row) => (
            <div
              key={row.label}
              className="flex justify-between py-2.5 border-b border-white/[0.08] text-sm"
            >
              <span className="text-white/60">{row.label}</span>
              <span className="font-semibold text-white">{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3.5 mt-1 border-t-2 border-[#D4C4A8]/30 text-base">
            <span className="text-white/60">Total Investment</span>
            <span className="font-extrabold text-[#D4C4A8]">
              {fmt(results.total)}
            </span>
          </div>
          <div className="flex justify-between py-2.5 text-sm">
            <span className="text-white/60">Est. Gross Yield</span>
            <span className="font-semibold text-[#5289AD]">
              {results.yield}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Portal Panel                                                       */
/* ------------------------------------------------------------------ */
function PortalPanel() {
  const trackSteps = [
    { label: 'Booking Fee Paid', status: 'done' },
    { label: 'SPA Signed', status: 'done' },
    { label: 'Loan Approved', status: 'done' },
    { label: 'Construction — 65% Complete', status: 'current' },
    { label: 'VP & Key Collection', status: 'pending' },
    { label: 'Defect Inspection', status: 'pending' },
  ];

  const docs = [
    'Sale & Purchase Agreement',
    'Loan Offer Letter',
    'Title Search Report',
    'Payment Schedule',
    'Floor Plan (Unit B-12-03)',
    'Developer License',
  ];

  const dotColor: Record<string, string> = {
    done: 'bg-[#5289AD]',
    current: 'bg-[#D4C4A8] shadow-[0_0_8px_rgba(212,196,168,0.5)] animate-pulse',
    pending: 'bg-white/20',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/[0.06] rounded-xl p-5">
        <h4 className="text-sm font-semibold mb-4 text-[#D4C4A8]">
          Transaction Progress
        </h4>
        <div className="space-y-0">
          {trackSteps.map((s) => (
            <div key={s.label} className="flex items-center gap-3 py-2 text-[13px] text-white">
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotColor[s.status]}`} />
              {s.label}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/[0.06] rounded-xl p-5">
        <h4 className="text-sm font-semibold mb-4 text-[#D4C4A8]">
          Your Documents
        </h4>
        <ul className="space-y-0">
          {docs.map((d) => (
            <li
              key={d}
              className="flex items-center gap-2.5 py-2 text-[13px] text-white/70 border-b border-white/[0.06] last:border-b-0"
            >
              <span className="text-base">&#128196;</span> {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Virtual Viewing Panel                                              */
/* ------------------------------------------------------------------ */
function ViewingPanel() {
  const checklist = [
    { label: 'Kitchen & fixtures', done: true },
    { label: 'Bathroom fittings', done: true },
    { label: 'Window & balcony view', done: true },
    { label: 'Flooring condition', done: false },
    { label: 'AC & electrical', done: false },
    { label: 'Building facilities', done: false },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
      <div className="bg-black/30 rounded-xl aspect-video flex items-center justify-center relative overflow-hidden">
        <div className="text-white/30 text-sm text-center">
          <Camera className="w-10 h-10 mx-auto mb-2 opacity-50" />
          Live Video Call
          <br />
          <span className="text-xs opacity-50">Camera feed would appear here</span>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
          <button className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white">
            <Mic className="w-5 h-5" />
          </button>
          <button className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white">
            <Camera className="w-5 h-5" />
          </button>
          <button className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white">
            <MessageCircle className="w-5 h-5" />
          </button>
          <button className="w-11 h-11 rounded-full bg-[#243C4C] flex items-center justify-center text-white">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-white/[0.06] rounded-xl p-4">
          <h4 className="text-sm font-semibold mb-1 text-white">
            R&F Princess Cove
          </h4>
          <p className="text-xs text-white/50">Unit B-12-03 &middot; 2 Bed &middot; 850 sqft</p>
          <p className="text-[#D4C4A8] font-semibold text-sm mt-2">RM 520,000</p>
        </div>
        <div className="bg-white/[0.06] rounded-xl p-4">
          <h4 className="text-sm font-semibold mb-3 text-white">
            Viewing Checklist
          </h4>
          {checklist.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-2 text-[13px] py-1 text-white/70"
            >
              {c.done ? (
                <span className="text-[#5289AD]">&#9989;</span>
              ) : (
                <span className="text-white/30">&#11036;</span>
              )}
              {c.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Concierge Panel                                                    */
/* ------------------------------------------------------------------ */
function ConciergePanel() {
  return (
    <div className="max-w-[480px] mx-auto bg-white/[0.06] rounded-xl overflow-hidden">
      <div className="px-5 py-4 bg-white/[0.04] border-b border-white/[0.08] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#D4C4A8] flex items-center justify-center text-base">
          &#129302;
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Straits Concierge</div>
          <div className="text-[11px] text-[#5289AD]">&#9679; Online</div>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3 min-h-[280px]">
        <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-[4px] bg-white/10 text-sm text-white leading-relaxed self-start">
          Hi! How can I help you today? &#127968;
        </div>
        <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-[4px] bg-[#D4C4A8] text-sm text-[#243C4C] font-medium leading-relaxed self-end">
          What are the stamp duty costs for a RM500K condo as a Singaporean?
        </div>
        <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-[4px] bg-white/10 text-sm text-white leading-relaxed self-start">
          For RM 500,000, stamp duty is RM 9,000 (1% on first RM100K + 2% on next RM400K). No additional levy above state minimum. Want the full breakdown?
        </div>
        <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-[4px] bg-[#D4C4A8] text-sm text-[#243C4C] font-medium leading-relaxed self-end">
          Yes please, and compare yields with SG
        </div>
        <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-[4px] bg-white/10 text-sm text-white leading-relaxed self-start">
          JB condo at RM500K (~S$150K) yields ~4.8% gross vs S$1.2M SG unit at ~2.3%. More than double — plus freehold title. Shall I show matching properties?
        </div>
      </div>
      <div className="flex gap-2 px-4 py-3 border-t border-white/[0.08] bg-white/[0.03]">
        <input
          type="text"
          placeholder="Ask anything about JB property..."
          className="flex-1 px-3.5 py-2.5 bg-white/[0.08] border border-white/[0.12] rounded-full text-white text-sm outline-none"
          readOnly
        />
        <button className="px-4 py-2.5 bg-[#D4C4A8] text-[#243C4C] rounded-full font-semibold text-sm">
          Send
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Alerts Panel                                                       */
/* ------------------------------------------------------------------ */
function AlertsPanel() {
  const alerts = [
    {
      type: '&#128293; New Launch',
      title: 'The Mezzo @ Medini',
      desc: 'Studio from RM 288K. Freehold, furnished, next to LEGOLAND. Early-bird 8% discount.',
      time: '2 hours ago',
    },
    {
      type: '&#128201; Price Drop',
      title: 'R&F Princess Cove 2BR',
      desc: 'Reduced from RM 580K to RM 520K. Motivated seller, immediate handover.',
      time: '5 hours ago',
    },
    {
      type: '&#128202; Market Update',
      title: 'JB Property Index Q4 2025',
      desc: 'Iskandar Malaysia prices up 3.2% YoY. RTS corridor outperforming at +5.8%.',
      time: '1 day ago',
    },
    {
      type: '&#127959;&#65039; Construction Update',
      title: 'Suasana Iskandar — 78% Done',
      desc: 'On track for Q2 2026 completion. Show units now open.',
      time: '2 days ago',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {alerts.map((a) => (
        <div
          key={a.title}
          className="bg-white/[0.06] rounded-xl p-5 border-l-[3px] border-[#D4C4A8]"
        >
          <div
            className="text-[11px] font-semibold uppercase tracking-wide text-[#D4C4A8] mb-2"
            dangerouslySetInnerHTML={{ __html: a.type }}
          />
          <h4 className="text-[15px] font-semibold text-white mb-1">{a.title}</h4>
          <p className="text-[13px] text-white/50 leading-relaxed">{a.desc}</p>
          <div className="text-[11px] text-white/30 mt-2">{a.time}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Portfolio Panel                                                    */
/* ------------------------------------------------------------------ */
function PortfolioPanel() {
  const properties = [
    {
      name: 'R&F Princess Cove',
      location: 'Tanjung Puteri, JB',
      beds: '2 Bed',
      stats: [
        { value: 'RM 520K', label: 'Current Value' },
        { value: '+4.0%', label: 'Capital Growth', up: true },
        { value: 'RM 2,100', label: 'Monthly Rent' },
        { value: '4.85%', label: 'Gross Yield', up: true },
      ],
    },
    {
      name: 'Forest City Marina',
      location: 'Forest City, Gelang Patah',
      beds: '3 Bed',
      stats: [
        { value: 'RM 780K', label: 'Current Value' },
        { value: '+6.2%', label: 'Capital Growth', up: true },
        { value: 'RM 3,500', label: 'Monthly Rent' },
        { value: '5.38%', label: 'Gross Yield', up: true },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {properties.map((p) => (
        <div key={p.name} className="bg-white/[0.06] rounded-xl p-5">
          <h4 className="text-[15px] font-semibold text-white mb-0.5">{p.name}</h4>
          <div className="text-xs text-white/40 mb-3">
            {p.location} &middot; {p.beds}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {p.stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/[0.04] rounded-lg p-2.5 text-center"
              >
                <div
                  className={`text-base font-bold ${
                    s.up ? 'text-[#5289AD]' : 'text-white'
                  }`}
                >
                  {s.value}
                </div>
                <div className="text-[11px] text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Panel map                                                          */
/* ------------------------------------------------------------------ */
const panels: Record<string, () => React.ReactElement> = {
  calculator: CalculatorPanel,
  portal: PortalPanel,
  viewing: ViewingPanel,
  concierge: ConciergePanel,
  alerts: AlertsPanel,
  portfolio: PortfolioPanel,
};

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('calculator');
  const ActivePanel = panels[activeTab];

  return (
    <main>
      {/* Hero */}
      <HeroSection
        badge="&#10022; Why Work with Us"
        title="Technology Meets Expertise"
        goldText="Expertise"
        subtitle="Malaysia's most advanced property consultancy — powered by AI, driven by data, delivered with transparency."
      />

      {/* Stats Bar */}
      <section className="glass-heavy py-10 px-[clamp(20px,4vw,48px)] border-b border-[#ACBCBF]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <div className="text-[#D4C4A8] mb-2">{s.icon}</div>
              <div className="text-lg font-bold text-[#243C4C]">{s.value}</div>
              <div className="text-[13px] text-[#698696]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,48px)] py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3 tracking-tight text-[#243C4C]">
          What Sets Us Apart
        </h2>
        <p className="text-center text-[#698696] text-[17px] mb-12 max-w-[560px] mx-auto">
          Every tool and service designed to give you an unfair advantage in
          Malaysian property investment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            const [bgClass, textClass] = f.color.split(' ');
            const isLive = f.status === 'Live';
            return (
              <div
                key={f.title}
                className="glass-card rounded-2xl p-7"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${bgClass} ${textClass} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#243C4C] mb-2 flex items-center gap-2.5 flex-wrap">
                  {f.title}
                  <span
                    className={`glass-pill inline-flex px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                      isLive
                        ? 'text-[#5289AD]'
                        : 'text-[#D4C4A8]'
                    }`}
                  >
                    {f.status}
                  </span>
                </h3>
                <p className="text-sm text-[#698696] leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-[clamp(20px,4vw,48px)]" style={{ background: '#243C4C' }}>
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-3 tracking-tight">
            See It in Action
          </h2>
          <p className="text-center text-white/55 text-[17px] mb-10">
            Explore our tools — the same ones our clients use every day.
          </p>

          {/* Tabs */}
          <div className="flex gap-2 justify-center flex-wrap mb-8">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === t.id
                    ? 'glass-dark font-semibold text-white'
                    : 'glass-button text-white/55 hover:text-white/85'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="glass-card rounded-2xl p-8 min-h-[420px] animate-[fadeIn_0.3s_ease]">
            <ActivePanel />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-[clamp(20px,5vw,60px)] text-center"
        style={{
          background: 'linear-gradient(135deg, #243C4C 0%, #5289AD 100%)',
        }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Let&rsquo;s Start Your Malaysia
          <br />
          Property Journey
        </h2>
        <p className="text-[17px] text-white/55 mb-9 max-w-[480px] mx-auto">
          Whether buying, selling, or renting — talk to our team for a free,
          no-obligation consultation.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="https://wa.me/60197058001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25d366] text-white px-9 py-4 rounded-full text-[17px] font-semibold shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:bg-[#20bd5a] hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(37,211,102,0.45)] transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[22px] h-[22px]"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.562 4.145 1.543 5.888L0 24l6.304-1.654A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.97 0-3.837-.53-5.445-1.455l-.39-.232-4.047 1.062 1.08-3.946-.254-.404A9.715 9.715 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
