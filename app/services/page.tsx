import { HeroSection } from '@/components/sections/HeroSection';
import {
  Search,
  Tag,
  KeyRound,
  Building2,
  Wrench,
  Scale,
  Banknote,
  ShieldCheck,
  Package,
  ArrowRight,
} from 'lucide-react';

const services = [
  {
    icon: Search,
    title: 'Property Search & Acquisition',
    color: 'glass-tint-blue glass-specular text-[#5289AD]',
    items: [
      'New launch priority access',
      'Resale property sourcing',
      'Investment analysis & comparison',
      'Virtual viewings for overseas buyers',
      'Price negotiation',
      'Booking & SPA coordination',
    ],
  },
  {
    icon: Tag,
    title: 'Selling Your Property',
    color: 'glass-tint-amber glass-specular text-[#D4C4A8]',
    items: [
      'Market valuation (AI + comparable analysis)',
      'Professional photography & marketing',
      'Listing on major portals',
      'Buyer sourcing & screening',
      'Offer negotiation',
      'Transaction management',
    ],
  },
  {
    icon: KeyRound,
    title: 'Rental & Leasing',
    color: 'glass-tint-green glass-specular text-[#5289AD]',
    items: [
      'Tenant sourcing & screening',
      'Lease agreement preparation',
      'Rent collection',
      'Tenancy renewal management',
      'Deposit handling',
    ],
  },
  {
    icon: Building2,
    title: 'Property Management',
    color: 'glass-tint-purple glass-specular text-[#5289AD]',
    items: [
      'Long-term rental management',
      'Airbnb & short-term rental management',
      'Maintenance coordination',
      'Bill payment & utilities',
      'Regular property inspections',
      'Emergency response',
    ],
  },
  {
    icon: Wrench,
    title: 'Renovation & Furnishing',
    color: 'glass-tint-amber glass-specular text-[#D4C4A8]',
    items: [
      'Interior design consultation',
      'Renovation project management',
      'Furniture & appliance packages',
      'Defect rectification (new properties)',
      'Pre-sale makeovers',
    ],
  },
  {
    icon: Scale,
    title: 'Legal & Compliance',
    color: 'glass-tint-blue glass-specular text-[#5289AD]',
    items: [
      'Lawyer coordination',
      'SPA review & explanation',
      'State authority consent (foreigners)',
      'Title transfer & stamping',
      'CKHT/RPGT tax filing',
    ],
  },
  {
    icon: Banknote,
    title: 'Financing & Banking',
    color: 'glass-tint-green glass-specular text-[#5289AD]',
    items: [
      'Mortgage pre-approval assistance',
      'Bank loan comparison',
      'Malaysian bank account setup',
      'Currency exchange guidance',
      'Payment scheduling',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Visa & Relocation',
    color: 'glass-tint-red glass-specular text-[#5289AD]',
    items: [
      'MM2H application support',
      'DE Rantau (digital nomad visa)',
      'Premium Visa consultation',
      'Company incorporation',
      'School & healthcare recommendations',
    ],
  },
  {
    icon: Package,
    title: 'Post-Purchase Support',
    color: 'glass-tint-green glass-specular text-[#5289AD]',
    items: [
      'Vacant possession & handover',
      'Defect inspection & reporting',
      'Utility account setup (TNB, Water, Internet)',
      'Property insurance',
      'Ongoing investment review',
    ],
  },
];

const steps = [
  { num: 1, title: 'Discovery Call' },
  { num: 2, title: 'Property Matching' },
  { num: 3, title: 'Viewing & Selection' },
  { num: 4, title: 'Transaction & Legal' },
  { num: 5, title: 'Handover & Beyond' },
];

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <HeroSection
        badge="&#10022; Your Complete Property Partner"
        title="A to Z Property Services"
        goldText="Property Services"
        subtitle="From your first search to rental income flowing — we handle everything so you don't have to."
      />

      {/* Services Grid */}
      <section className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)] py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3 tracking-tight text-[#243C4C]">
          Everything You Need
        </h2>
        <p className="text-center text-[#698696] text-[17px] mb-12 max-w-[600px] mx-auto">
          Comprehensive property services across the full investment lifecycle.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            const [bgClass, textClass] = service.color.split(' ');
            return (
              <div
                key={service.title}
                className="glass-card rounded-2xl p-7"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${bgClass} ${textClass} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-[#243C4C] mb-3">
                  {service.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-[#698696] leading-relaxed pl-[18px] relative before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#D4C4A8]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section
        className="py-20 px-[clamp(20px,4vw,48px)]"
        style={{ background: '#243C4C' }}
      >
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-3 tracking-tight">
            How It Works
          </h2>
          <p className="text-center text-white/55 text-[17px] mb-12">
            A simple 5-step journey from enquiry to keys in hand.
          </p>

          <div className="flex items-center justify-center flex-wrap gap-0 md:flex-row flex-col">
            {steps.map((step, i) => (
              <div key={step.num} className="contents">
                <div className="glass-card flex flex-col items-center text-center px-2 min-w-[140px] max-w-[200px]">
                  <div className="w-12 h-12 rounded-full bg-[#D4C4A8] text-[#243C4C] text-lg font-extrabold flex items-center justify-center mb-3">
                    {step.num}
                  </div>
                  <div className="text-sm font-semibold text-white leading-snug">
                    {step.title}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="text-white/30 mx-1 flex-shrink-0 md:rotate-0 rotate-90 my-4 md:my-0">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
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
        <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white mb-4 tracking-tight">
          Let&rsquo;s Start Your Malaysia
          <br />
          Property Journey
        </h2>
        <p className="text-[17px] text-white/55 mb-9 max-w-[520px] mx-auto">
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
