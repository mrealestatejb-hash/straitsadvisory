'use client';

import { useState, useRef } from 'react';
import {
  Home,
  Search,
  Users,
  KeyRound,
  ShieldCheck,
  FileText,
  Settings,
  Building,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Check,
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

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex items-center gap-1.5 px-3.5 py-2 border rounded-lg cursor-pointer text-[13px] font-medium transition-all ${
            value === opt
              ? 'border-[#c9a962] bg-[#c9a96214] text-[#1a1a2e]'
              : 'border-gray-300 text-gray-700 hover:border-gray-400'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="hidden"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

export default function RentPage() {
  const [selectedPath, setSelectedPath] = useState<'owner' | 'tenant' | null>(null);
  const [landlordSub, setLandlordSub] = useState<'A' | 'B' | null>(null);
  const [tenantStep, setTenantStep] = useState(1);
  const [landlordSubmitted, setLandlordSubmitted] = useState(false);
  const [tenantSubmitted, setTenantSubmitted] = useState(false);
  const flowRef = useRef<HTMLDivElement>(null);

  // Landlord form state
  const [llForm, setLlForm] = useState({
    propType: 'Condo/Apartment',
    propName: '',
    unitNum: '',
    builtUp: '',
    beds: '2',
    baths: '2',
    furnished: 'Partially Furnished',
    state: 'Johor',
    area: '',
    address: '',
    rent: '',
    availDate: '',
    minLease: '1 year',
    tenantPref: 'Anyone',
    pets: 'No',
    rentalType: 'Long-term only',
    needMgmt: 'Yes',
    name: '',
    phone: '',
    email: '',
  });

  // Tenant form state
  const [tForm, setTForm] = useState({
    propType: 'Condo',
    location: 'Johor Bahru',
    area: '',
    budget: 'RM1,500-2,500',
    beds: '2',
    furnished: 'Any',
    moveIn: 'Immediately',
    lease: '1 year',
    staying: 'Individual',
    pets: 'No',
    name: '',
    phone: '',
    email: '',
    nationality: '',
    special: '',
  });

  const updateLl = (field: string, value: string) =>
    setLlForm((prev) => ({ ...prev, [field]: value }));
  const updateT = (field: string, value: string) =>
    setTForm((prev) => ({ ...prev, [field]: value }));

  const selectPath = (path: 'owner' | 'tenant') => {
    setSelectedPath(path);
    setTimeout(() => {
      flowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const goBack = () => {
    setSelectedPath(null);
    setLandlordSub(null);
  };

  const selectLandlordSub = (sub: 'A' | 'B') => {
    setLandlordSub(sub);
  };

  const goTenantStep = (n: number) => {
    setTenantStep(n);
    flowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tenantSteps = [
    { num: 1, label: 'Preferences' },
    { num: 2, label: 'Move-in' },
    { num: 3, label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-16 md:pt-16">
        <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-center text-white py-[70px] px-6">
          <h1 className="text-[32px] md:text-[56px] font-extrabold mb-4 leading-[1.1]">
            Rent <span className="text-[#c9a962]">Made Simple</span>
          </h1>
          <p className="text-[15px] md:text-[19px] text-white/70 max-w-[520px] mx-auto">
            Whether you&rsquo;re a landlord or tenant, we&rsquo;ve got you covered.
          </p>
        </div>
      </section>

      {/* Path Selection */}
      {!selectedPath && (
        <div className="max-w-[860px] mx-auto px-6 md:px-16 py-16">
          <div className="text-center mb-9">
            <h2 className="text-[22px] md:text-[30px] font-extrabold text-[#1a1a2e] mb-2">
              I am a...
            </h2>
            <p className="text-[15px] text-gray-500">Choose the option that fits your situation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Owner Card */}
            <div
              onClick={() => selectPath('owner')}
              className="glass-card rounded-xl p-8 cursor-pointer flex flex-col"
            >
              <Home className="w-9 h-9 text-[#c9a962] mb-3.5" />
              <div className="text-xl font-extrabold text-[#1a1a2e] mb-1">Property Owner</div>
              <div className="text-sm text-gray-500 mb-4 leading-relaxed">
                I have a property to rent out
              </div>
              <ul className="mb-6 flex-1 space-y-1.5">
                {[
                  'Find quality tenants',
                  'Tenant screening & verification',
                  'Lease agreement preparation',
                  'Optional: Full property management',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-gray-700">
                    <span className="w-[18px] h-[18px] rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  selectPath('owner');
                }}
                className="w-full py-3 rounded-lg bg-[#1a1a2e] text-white text-sm font-semibold hover:bg-[#c9a962] transition-colors flex items-center justify-center gap-1.5"
              >
                List My Property <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tenant Card */}
            <div
              onClick={() => selectPath('tenant')}
              className="glass-card rounded-xl p-8 cursor-pointer flex flex-col"
            >
              <Search className="w-9 h-9 text-[#c9a962] mb-3.5" />
              <div className="text-xl font-extrabold text-[#1a1a2e] mb-1">Tenant</div>
              <div className="text-sm text-gray-500 mb-4 leading-relaxed">
                I&rsquo;m looking for a place to rent
              </div>
              <ul className="mb-6 flex-1 space-y-1.5">
                {[
                  'Access to exclusive listings',
                  'Verified properties only',
                  'No agent fees for tenants',
                  'Flexible lease options',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-gray-700">
                    <span className="w-[18px] h-[18px] rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  selectPath('tenant');
                }}
                className="w-full py-3 rounded-lg bg-gray-100 text-[#1a1a2e] border border-gray-300 text-sm font-semibold hover:bg-[#1a1a2e] hover:text-white hover:border-[#1a1a2e] transition-colors flex items-center justify-center gap-1.5"
              >
                Find a Rental <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== LANDLORD FLOW ==================== */}
      {selectedPath === 'owner' && (
        <div ref={flowRef} className="max-w-[720px] mx-auto px-6 md:px-16 py-10 scroll-mt-20">
          {!landlordSubmitted ? (
            <>
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 hover:text-[#1a1a2e] transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" /> Back to selection
              </button>

              <div className="text-center mb-9">
                <h2 className="text-[22px] md:text-[30px] font-extrabold text-[#1a1a2e] mb-2">
                  What do you need?
                </h2>
                <p className="text-[15px] text-gray-500">
                  Choose the service level that suits you.
                </p>
              </div>

              {/* Sub-selection cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-9">
                <div
                  onClick={() => selectLandlordSub('A')}
                  className={`glass-card rounded-xl p-6 cursor-pointer transition-all ${
                    landlordSub === 'A'
                      ? 'border-2 border-[#c9a962]'
                      : ''
                  }`}
                >
                  <h4 className="text-base font-bold text-[#1a1a2e] mb-2 flex items-center gap-2">
                    <Search className="w-5 h-5 text-[#c9a962]" /> Find Tenants
                  </h4>
                  <ul className="space-y-0.5">
                    {['Tenant sourcing & screening', 'Lease agreement preparation', 'One-time service'].map(
                      (item) => (
                        <li
                          key={item}
                          className="flex items-center gap-1.5 text-[13px] text-gray-500"
                        >
                          <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div
                  onClick={() => selectLandlordSub('B')}
                  className={`glass-card rounded-xl p-6 cursor-pointer transition-all ${
                    landlordSub === 'B'
                      ? 'border-2 border-[#c9a962]'
                      : ''
                  }`}
                >
                  <h4 className="text-base font-bold text-[#1a1a2e] mb-2 flex items-center gap-2">
                    <Home className="w-5 h-5 text-[#c9a962]" /> Full Management
                  </h4>
                  <ul className="space-y-0.5">
                    {['Tenant sourcing & screening', 'Lease agreement preparation'].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-1.5 text-[13px] text-gray-500"
                      >
                        <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="text-[11px] font-bold text-[#c9a962] uppercase tracking-wider mb-1">
                      Plus
                    </div>
                    <ul className="space-y-0.5">
                      {['Rent collection', 'Maintenance coordination', 'Airbnb management available'].map(
                        (item) => (
                          <li
                            key={item}
                            className="flex items-center gap-1.5 text-[13px] text-gray-500"
                          >
                            <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Landlord Form */}
              {landlordSub && (
                <div>
                  {/* Property Details */}
                  <div className="text-[13px] font-bold text-[#1a1a2e] uppercase tracking-wider mb-4 pb-2 border-b-2 border-[#c9a962] inline-block">
                    Property Details
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Property Type
                    </label>
                    <RadioGroup
                      name="ll_propType"
                      options={['Condo/Apartment', 'Landed House', 'Room', 'Commercial']}
                      value={llForm.propType}
                      onChange={(v) => updateLl('propType', v)}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Property Name
                    </label>
                    <input
                      type="text"
                      value={llForm.propName}
                      onChange={(e) => updateLl('propName', e.target.value)}
                      placeholder="e.g. R&F Princess Cove"
                      className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                        Unit Number
                      </label>
                      <input
                        type="text"
                        value={llForm.unitNum}
                        onChange={(e) => updateLl('unitNum', e.target.value)}
                        placeholder="e.g. A-12-05"
                        className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                        Built-up Size (sqft)
                      </label>
                      <input
                        type="number"
                        value={llForm.builtUp}
                        onChange={(e) => updateLl('builtUp', e.target.value)}
                        placeholder="e.g. 850"
                        className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                        Bedrooms
                      </label>
                      <select
                        value={llForm.beds}
                        onChange={(e) => updateLl('beds', e.target.value)}
                        className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                      >
                        <option>Studio</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                        Bathrooms
                      </label>
                      <select
                        value={llForm.baths}
                        onChange={(e) => updateLl('baths', e.target.value)}
                        className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4+</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Furnished Status
                    </label>
                    <RadioGroup
                      name="ll_furnished"
                      options={['Unfurnished', 'Partially Furnished', 'Fully Furnished']}
                      value={llForm.furnished}
                      onChange={(v) => updateLl('furnished', v)}
                    />
                  </div>

                  {/* Location */}
                  <div className="text-[13px] font-bold text-[#1a1a2e] uppercase tracking-wider mt-8 mb-4 pb-2 border-b-2 border-[#c9a962] inline-block">
                    Location
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      State
                    </label>
                    <RadioGroup
                      name="ll_state"
                      options={['Johor', 'Kuala Lumpur', 'Penang', 'Other']}
                      value={llForm.state}
                      onChange={(v) => updateLl('state', v)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                        Area / Township
                      </label>
                      <input
                        type="text"
                        value={llForm.area}
                        onChange={(e) => updateLl('area', e.target.value)}
                        placeholder="e.g. Bukit Chagar"
                        className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                        Full Address
                      </label>
                      <input
                        type="text"
                        value={llForm.address}
                        onChange={(e) => updateLl('address', e.target.value)}
                        placeholder="Full property address"
                        className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Rental Preferences */}
                  <div className="text-[13px] font-bold text-[#1a1a2e] uppercase tracking-wider mt-8 mb-4 pb-2 border-b-2 border-[#c9a962] inline-block">
                    Rental Preferences
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                        Target Rent (RM/month)
                      </label>
                      <input
                        type="text"
                        value={llForm.rent}
                        onChange={(e) => updateLl('rent', e.target.value)}
                        placeholder="e.g. 2,500"
                        className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                        Available From
                      </label>
                      <input
                        type="date"
                        value={llForm.availDate}
                        onChange={(e) => updateLl('availDate', e.target.value)}
                        className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Minimum Lease
                    </label>
                    <RadioGroup
                      name="ll_minLease"
                      options={['6 months', '1 year', '2 years', 'Flexible']}
                      value={llForm.minLease}
                      onChange={(v) => updateLl('minLease', v)}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Tenant Preference
                    </label>
                    <RadioGroup
                      name="ll_tenantPref"
                      options={['Anyone', 'Working professionals', 'Families', 'Students', 'Corporate']}
                      value={llForm.tenantPref}
                      onChange={(v) => updateLl('tenantPref', v)}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Pets Allowed?
                    </label>
                    <RadioGroup
                      name="ll_pets"
                      options={['Yes', 'No']}
                      value={llForm.pets}
                      onChange={(v) => updateLl('pets', v)}
                    />
                  </div>

                  {/* Management Options (Sub B only) */}
                  {landlordSub === 'B' && (
                    <>
                      <div className="text-[13px] font-bold text-[#1a1a2e] uppercase tracking-wider mt-8 mb-4 pb-2 border-b-2 border-[#c9a962] inline-block">
                        Management Options
                      </div>
                      <div className="mb-5">
                        <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                          Rental Type
                        </label>
                        <RadioGroup
                          name="ll_rentalType"
                          options={['Long-term only', 'Open to Airbnb/short-term']}
                          value={llForm.rentalType}
                          onChange={(v) => updateLl('rentalType', v)}
                        />
                      </div>
                      <div className="mb-5">
                        <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                          Need Property Management Services?
                        </label>
                        <RadioGroup
                          name="ll_needMgmt"
                          options={['Yes', 'No']}
                          value={llForm.needMgmt}
                          onChange={(v) => updateLl('needMgmt', v)}
                        />
                      </div>
                    </>
                  )}

                  {/* Contact */}
                  <div className="text-[13px] font-bold text-[#1a1a2e] uppercase tracking-wider mt-8 mb-4 pb-2 border-b-2 border-[#c9a962] inline-block">
                    Contact
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={llForm.name}
                      onChange={(e) => updateLl('name', e.target.value)}
                      placeholder="Full name"
                      className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                        Phone (WhatsApp)
                      </label>
                      <input
                        type="tel"
                        value={llForm.phone}
                        onChange={(e) => updateLl('phone', e.target.value)}
                        placeholder="+65 or +60"
                        className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        value={llForm.email}
                        onChange={(e) => updateLl('email', e.target.value)}
                        placeholder="your@email.com"
                        className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setLandlordSubmitted(true)}
                      className="glass-button-green py-3 px-6 rounded-lg text-sm font-semibold transition-colors max-w-[320px] w-full"
                    >
                      Submit Rental Request
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Landlord Thank You */
            <div className="text-center py-16">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl md:text-[28px] font-extrabold text-[#1a1a2e] mb-3">
                Request Submitted!
              </h2>
              <p className="text-base text-gray-500 max-w-[500px] mx-auto mb-6 leading-relaxed">
                Our rental team will review your property details and contact you within 24 hours.
              </p>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                  'Hi, I just submitted a rental listing request.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#25d366] text-white text-[15px] font-semibold hover:bg-[#1ebe5d] hover:scale-[1.03] transition-all"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          )}
        </div>
      )}

      {/* ==================== TENANT FLOW ==================== */}
      {selectedPath === 'tenant' && (
        <div ref={flowRef} className="max-w-[720px] mx-auto px-6 md:px-16 py-10 scroll-mt-20">
          {!tenantSubmitted ? (
            <>
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 hover:text-[#1a1a2e] transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" /> Back to selection
              </button>

              <div className="text-center mb-9">
                <h2 className="text-[22px] md:text-[30px] font-extrabold text-[#1a1a2e] mb-2">
                  Tell us what you&rsquo;re looking for
                </h2>
                <p className="text-[15px] text-gray-500">
                  We&rsquo;ll match you with suitable properties within 24 hours.
                </p>
              </div>

              {/* Stepper */}
              <div className="flex justify-center gap-2 mb-8 flex-wrap">
                {tenantSteps.map((s) => (
                  <div
                    key={s.num}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      s.num === tenantStep
                        ? 'bg-[#1a1a2e] text-white'
                        : s.num < tenantStep
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">
                      {s.num}
                    </span>
                    {s.label}
                  </div>
                ))}
              </div>

              {/* Step 1: Preferences */}
              {tenantStep === 1 && (
                <div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Property Type
                    </label>
                    <RadioGroup
                      name="t_propType"
                      options={['Condo', 'Landed', 'Room', 'Any']}
                      value={tForm.propType}
                      onChange={(v) => updateT('propType', v)}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Location
                    </label>
                    <RadioGroup
                      name="t_location"
                      options={['Johor Bahru', 'Kuala Lumpur', 'Penang', 'Other']}
                      value={tForm.location}
                      onChange={(v) => updateT('location', v)}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Preferred Area{' '}
                      <span className="text-xs text-gray-400 font-normal ml-1">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={tForm.area}
                      onChange={(e) => updateT('area', e.target.value)}
                      placeholder="e.g. Bukit Chagar, Danga Bay"
                      className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Budget Range (RM/month)
                    </label>
                    <RadioGroup
                      name="t_budget"
                      options={['Below RM1,500', 'RM1,500-2,500', 'RM2,500-4,000', 'RM4,000+']}
                      value={tForm.budget}
                      onChange={(v) => updateT('budget', v)}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Bedrooms Needed
                    </label>
                    <RadioGroup
                      name="t_beds"
                      options={['Studio', '1', '2', '3', '4+']}
                      value={tForm.beds}
                      onChange={(v) => updateT('beds', v)}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Furnished Preference
                    </label>
                    <RadioGroup
                      name="t_furnished"
                      options={['Unfurnished', 'Partially', 'Fully Furnished', 'Any']}
                      value={tForm.furnished}
                      onChange={(v) => updateT('furnished', v)}
                    />
                  </div>
                  <div className="flex gap-3 mt-8">
                    <div className="flex-1" />
                    <button
                      onClick={() => goTenantStep(2)}
                      className="flex-1 py-3 px-6 rounded-lg bg-[#1a1a2e] text-white text-sm font-semibold hover:bg-[#c9a962] transition-colors"
                    >
                      Next <ChevronRight className="inline w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Move-in */}
              {tenantStep === 2 && (
                <div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Move-in Date
                    </label>
                    <RadioGroup
                      name="t_moveIn"
                      options={['Immediately', 'Within 1 month', 'Within 3 months', 'Flexible']}
                      value={tForm.moveIn}
                      onChange={(v) => updateT('moveIn', v)}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Lease Length
                    </label>
                    <RadioGroup
                      name="t_lease"
                      options={['6 months', '1 year', '2 years', 'Flexible']}
                      value={tForm.lease}
                      onChange={(v) => updateT('lease', v)}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Who will be staying?
                    </label>
                    <RadioGroup
                      name="t_staying"
                      options={['Individual', 'Couple', 'Family', 'Sharing with others']}
                      value={tForm.staying}
                      onChange={(v) => updateT('staying', v)}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Pets?
                    </label>
                    <RadioGroup
                      name="t_pets"
                      options={['Yes', 'No']}
                      value={tForm.pets}
                      onChange={(v) => updateT('pets', v)}
                    />
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => goTenantStep(1)}
                      className="flex-1 py-3 px-6 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="inline w-4 h-4 mr-1" /> Back
                    </button>
                    <button
                      onClick={() => goTenantStep(3)}
                      className="flex-1 py-3 px-6 rounded-lg bg-[#1a1a2e] text-white text-sm font-semibold hover:bg-[#c9a962] transition-colors"
                    >
                      Next <ChevronRight className="inline w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact */}
              {tenantStep === 3 && (
                <div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={tForm.name}
                      onChange={(e) => updateT('name', e.target.value)}
                      placeholder="Full name"
                      className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                        Phone (WhatsApp)
                      </label>
                      <input
                        type="tel"
                        value={tForm.phone}
                        onChange={(e) => updateT('phone', e.target.value)}
                        placeholder="+65 or +60"
                        className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        value={tForm.email}
                        onChange={(e) => updateT('email', e.target.value)}
                        placeholder="your@email.com"
                        className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Nationality{' '}
                      <span className="text-xs text-gray-400 font-normal ml-1">
                        (for MM2H / visa context)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={tForm.nationality}
                      onChange={(e) => updateT('nationality', e.target.value)}
                      placeholder="e.g. Singaporean, Malaysian, British"
                      className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#1a1a2e] mb-1.5">
                      Any Special Requirements?{' '}
                      <span className="text-xs text-gray-400 font-normal ml-1">(optional)</span>
                    </label>
                    <textarea
                      value={tForm.special}
                      onChange={(e) => updateT('special', e.target.value)}
                      placeholder="e.g. ground floor preferred, near MRT, pet-friendly building..."
                      className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors resize-y min-h-[80px]"
                    />
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => goTenantStep(2)}
                      className="flex-1 py-3 px-6 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="inline w-4 h-4 mr-1" /> Back
                    </button>
                    <button
                      onClick={() => setTenantSubmitted(true)}
                      className="glass-button-green flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Tenant Thank You */
            <div className="text-center py-16">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl md:text-[28px] font-extrabold text-[#1a1a2e] mb-3">
                Thanks!
              </h2>
              <p className="text-base text-gray-500 max-w-[500px] mx-auto mb-6 leading-relaxed">
                We&rsquo;ll match you with suitable properties within 24 hours. Our team will reach
                out via your preferred contact method.
              </p>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                  'Hi, I just submitted a rental search request.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#25d366] text-white text-[15px] font-semibold hover:bg-[#1ebe5d] hover:scale-[1.03] transition-all"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          )}
        </div>
      )}

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-gradient-to-br from-[#1a1a3e] to-[#2d2b55]">
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
    </div>
  );
}
