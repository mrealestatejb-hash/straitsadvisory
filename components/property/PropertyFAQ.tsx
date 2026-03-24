'use client';

import { useState } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';

const faqCategories = [
  {
    id: 'buying',
    label: 'Buying Process',
    questions: [
      {
        q: 'Can Singaporeans buy property in JB?',
        a: 'Yes, Singaporeans can freely purchase property in Johor Bahru. Foreign buyers (including Singaporeans) must purchase properties above the state minimum threshold, which is currently RM1,000,000 in Johor. However, some developments have received special approval for lower foreign purchase thresholds. Our team can advise on eligible properties within your budget.',
      },
      {
        q: 'What is the buying process for foreign buyers?',
        a: 'The process typically takes 3-4 months: (1) Select your property and pay a booking fee (usually 2-3% of purchase price), (2) Sign the Sale & Purchase Agreement (SPA) within 14 days, (3) Apply for state authority consent (takes 1-3 months), (4) Complete progressive payments per the SPA schedule. We handle all paperwork and coordinate with lawyers on your behalf.',
      },
      {
        q: 'Do I need to be physically present in Malaysia?',
        a: 'No. The entire process can be completed remotely. We offer virtual viewings via live video calls, digital document signing, and can coordinate with your appointed lawyer for power of attorney arrangements. Many of our Singapore clients complete their purchase without visiting JB until key collection.',
      },
    ],
  },
  {
    id: 'financing',
    label: 'Financing',
    questions: [
      {
        q: 'Can foreigners get a mortgage in Malaysia?',
        a: 'Yes, foreign buyers can obtain home loans from Malaysian banks. Typical terms: up to 70% loan-to-value (LTV), tenure up to 30 years (or until age 70), and interest rates between 4.0-4.8% per annum. We partner with major Malaysian banks and can help you secure pre-approval before you commit to a purchase.',
      },
      {
        q: 'What are the payment terms?',
        a: 'For new launches, developers typically offer progressive payment schemes — you pay in stages as construction progresses. A typical schedule: 10% upon signing SPA, then progressive payments of 10% at each construction milestone. For completed properties, full payment (minus loan amount) is due upon completion of the transaction.',
      },
    ],
  },
  {
    id: 'legal',
    label: 'Legal & Taxes',
    questions: [
      {
        q: 'What taxes do foreign buyers pay?',
        a: 'Foreign buyers pay: (1) Stamp Duty — 1% on first RM100K, 2% on next RM400K, 3% on next RM500K, 4% above RM1M, (2) Legal fees — approximately 1% of property value, (3) Real Property Gains Tax (RPGT) if selling within 5 years — 30% on gains. After 5 years, RPGT is 10% for foreigners. There is no annual property tax for residential units, only a nominal quit rent and assessment.',
      },
      {
        q: 'Is the property freehold or leasehold?',
        a: 'R&F Princess Cove is freehold across all phases. This means you own the property and the land in perpetuity — there is no lease expiry. Freehold properties in JB are increasingly rare and tend to appreciate better over time compared to leasehold alternatives.',
      },
    ],
  },
  {
    id: 'rental',
    label: 'Rental & Returns',
    questions: [
      {
        q: 'What rental yields can I expect?',
        a: 'R&F Princess Cove currently achieves gross rental yields of 5.5-8.0%, depending on unit type, floor, and furnishing level. A typical 2-bedroom unit rents for RM2,200-3,300 per month. Yields have grown consistently since 2019, driven by RTS Link anticipation and growing demand from Singapore commuters.',
      },
      {
        q: 'Can you help manage my rental property?',
        a: 'Yes, we offer full property management services including: tenant sourcing and screening, lease agreement preparation, rent collection, maintenance coordination, regular property inspections, and monthly reporting. Our management fee is competitive at 8-10% of monthly rental income, with no hidden charges.',
      },
    ],
  },
];

export function PropertyFAQ() {
  const [activeCategory, setActiveCategory] = useState('buying');
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqCategories[0].questions[0].q);

  const currentCategory = faqCategories.find((c) => c.id === activeCategory);

  function handleCategoryClick(id: string) {
    setActiveCategory(id);
    const cat = faqCategories.find((c) => c.id === id);
    if (cat && cat.questions.length > 0) {
      setOpenQuestion(cat.questions[0].q);
    }
  }

  function toggleQuestion(q: string) {
    setOpenQuestion(openQuestion === q ? null : q);
  }

  return (
    <div className="py-8 border-b border-border" id="faq">
      <h2 className="text-xl font-extrabold text-foreground mb-6">Frequently Asked Questions</h2>

      <div
        className="rounded-2xl overflow-hidden bg-white"
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.04)',
        }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-[260px] flex-shrink-0 bg-[#FAF9F7] p-4">
            {/* Mobile: horizontal scroll tabs */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible -mx-1 px-1 pb-1 md:pb-0">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`whitespace-nowrap text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-white text-[#06457F] shadow-sm'
                      : 'text-[#5379AE] hover:bg-white/60'
                  }`}
                  style={
                    activeCategory === cat.id
                      ? { boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)' }
                      : undefined
                  }
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>

          {/* FAQ Content */}
          <div className="flex-1 p-4 md:p-6">
            {currentCategory?.questions.map((item) => {
              const isOpen = openQuestion === item.q;
              return (
                <div
                  key={item.q}
                  className={`mb-2 rounded-xl transition-all duration-200 ${
                    isOpen
                      ? 'bg-[#FAF9F7]'
                      : 'hover:bg-[#FAF9F7]'
                  }`}
                >
                  <button
                    onClick={() => toggleQuestion(item.q)}
                    className="w-full flex items-center justify-between gap-3 p-4 text-left"
                  >
                    <span className={`text-sm font-semibold ${isOpen ? 'text-[#06457F]' : 'text-foreground'}`}>
                      {item.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#06457F] text-white rotate-0'
                          : 'bg-[#A8C4EC]/20 text-[#5379AE] rotate-0'
                      }`}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
