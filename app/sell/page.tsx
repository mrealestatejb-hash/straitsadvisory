'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Camera,
  Handshake,
  ChevronRight,
  ChevronLeft,
  Upload,
  CheckCircle,
  MessageCircle,
  X,
} from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/60197058001';

type PropertyType = 'Condo/Apartment' | 'Landed House' | 'Commercial' | 'Land';
type State = 'Johor' | 'Kuala Lumpur' | 'Penang' | 'Other';
type Reason = 'Upgrading' | 'Relocating' | 'Investment exit' | 'Other';
type Timeline = 'ASAP' | 'Within 3 months' | 'Within 6 months' | 'No rush';
type Tenancy = 'Yes' | 'No';
type ContactMethod = 'WhatsApp' | 'Call' | 'Email';

interface FormData {
  propType: PropertyType;
  propName: string;
  unitNum: string;
  builtUp: string;
  bedrooms: string;
  bathrooms: string;
  furnished: string;
  state: State;
  area: string;
  address: string;
  askPrice: string;
  reason: Reason;
  timeline: Timeline;
  tenancy: Tenancy;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactMethod: ContactMethod;
  bestTime: string;
}

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
              ? 'border-[#c9a962] bg-[#c9a96214] text-[#06457F]'
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

export default function SellPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormData>({
    propType: 'Condo/Apartment',
    propName: '',
    unitNum: '',
    builtUp: '',
    bedrooms: '2',
    bathrooms: '2',
    furnished: 'Unfurnished',
    state: 'Johor',
    area: '',
    address: '',
    askPrice: '',
    reason: 'Upgrading',
    timeline: 'ASAP',
    tenancy: 'No',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    contactMethod: 'WhatsApp',
    bestTime: 'Afternoon (12pm - 5pm)',
  });

  const updateForm = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const goStep = (n: number) => {
    setCurrentStep(n);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const max = 10 - uploadedFiles.length;
    const newFiles: string[] = [];
    for (let i = 0; i < Math.min(files.length, max); i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedFiles((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const steps = [
    { num: 1, label: 'Property' },
    { num: 2, label: 'Location' },
    { num: 3, label: 'Expectations' },
    { num: 4, label: 'Contact' },
    { num: 5, label: 'Photos' },
  ];

  const summaryRows = [
    ['Property Type', form.propType],
    ['Property Name', form.propName || '-'],
    ['Unit Number', form.unitNum || '-'],
    ['Built-up Size', form.builtUp ? `${form.builtUp} sqft` : '-'],
    ['Bedrooms', form.bedrooms],
    ['Bathrooms', form.bathrooms],
    ['Furnished', form.furnished],
    ['State', form.state],
    ['Area', form.area || '-'],
    ['Asking Price', `RM ${form.askPrice || '-'}`],
    ['Reason', form.reason],
    ['Timeline', form.timeline],
    ['Existing Tenancy', form.tenancy],
    ['Name', form.contactName || '-'],
    ['Phone', form.contactPhone || '-'],
    ['Email', form.contactEmail || '-'],
    ['Contact Method', form.contactMethod],
    ['Photos', `${uploadedFiles.length} uploaded`],
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-16 md:pt-16">
        <div className="bg-gradient-to-br from-[#06457F] via-[#16213e] to-[#0f3460] text-center text-white py-16 px-6 md:py-20">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Sell Your <span className="text-[#c9a962]">Malaysia Property</span>
          </h1>
          <p className="text-base md:text-lg text-white/75 max-w-[550px] mx-auto">
            Get a free market valuation. No obligations, no pressure.
          </p>
        </div>
      </section>

      {/* Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-16 py-16 max-w-[1000px] mx-auto">
        {[
          {
            icon: <BarChart3 className="w-9 h-9 text-[#c9a962]" />,
            title: 'AI-Powered Valuation',
            desc: 'Accurate pricing based on recent transactions and market data analysis.',
          },
          {
            icon: <Camera className="w-9 h-9 text-[#c9a962]" />,
            title: 'Professional Marketing',
            desc: 'Photos, virtual tours, and listings on all major property portals.',
          },
          {
            icon: <Handshake className="w-9 h-9 text-[#c9a962]" />,
            title: 'Dedicated Agent',
            desc: 'Personal service from listing to completion. One point of contact.',
          },
        ].map((card) => (
          <div
            key={card.title}
            className="glass-card text-center p-8 rounded-xl"
          >
            <div className="flex justify-center mb-4">{card.icon}</div>
            <h3 className="text-base font-bold text-[#06457F] mb-2">{card.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div ref={formSectionRef} className="max-w-[680px] mx-auto mb-16 px-6 md:px-16 scroll-mt-20">
        {!submitted ? (
          <>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-[28px] font-extrabold text-[#06457F] mb-2">
                Request Free Valuation
              </h2>
              <p className="text-[15px] text-gray-500">
                Fill in your property details and we&rsquo;ll get back to you within 24 hours.
              </p>
            </div>

            {/* Stepper */}
            <div className="flex justify-center gap-2 mb-10 flex-wrap">
              {steps.map((s) => (
                <button
                  key={s.num}
                  onClick={() => {
                    if (s.num < currentStep) goStep(s.num);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    s.num === currentStep
                      ? 'bg-[#06457F] text-white'
                      : s.num < currentStep
                      ? 'bg-emerald-600 text-white cursor-pointer'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">
                    {s.num}
                  </span>
                  {s.label}
                </button>
              ))}
            </div>

            {/* Step 1: Property Details */}
            {currentStep === 1 && (
              <div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                    Property Type
                  </label>
                  <RadioGroup
                    name="propType"
                    options={['Condo/Apartment', 'Landed House', 'Commercial', 'Land']}
                    value={form.propType}
                    onChange={(v) => updateForm('propType', v)}
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                    Property Name / Development Name
                  </label>
                  <input
                    type="text"
                    value={form.propName}
                    onChange={(e) => updateForm('propName', e.target.value)}
                    placeholder="e.g. R&F Princess Cove"
                    className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                    Unit Number <span className="text-xs text-gray-400 font-normal ml-1">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.unitNum}
                    onChange={(e) => updateForm('unitNum', e.target.value)}
                    placeholder="e.g. A-12-05"
                    className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                      Built-up Size (sqft)
                    </label>
                    <input
                      type="number"
                      value={form.builtUp}
                      onChange={(e) => updateForm('builtUp', e.target.value)}
                      placeholder="e.g. 850"
                      className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                      Bedrooms
                    </label>
                    <select
                      value={form.bedrooms}
                      onChange={(e) => updateForm('bedrooms', e.target.value)}
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                      Bathrooms
                    </label>
                    <select
                      value={form.bathrooms}
                      onChange={(e) => updateForm('bathrooms', e.target.value)}
                      className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                      Furnished Status
                    </label>
                    <select
                      value={form.furnished}
                      onChange={(e) => updateForm('furnished', e.target.value)}
                      className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                    >
                      <option>Unfurnished</option>
                      <option>Partially Furnished</option>
                      <option>Fully Furnished</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <div className="flex-1" />
                  <button
                    onClick={() => goStep(2)}
                    className="flex-1 py-3 px-6 rounded-lg bg-[#06457F] text-white text-sm font-semibold hover:bg-[#c9a962] transition-colors text-center"
                  >
                    Next <ChevronRight className="inline w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">State</label>
                  <RadioGroup
                    name="state"
                    options={['Johor', 'Kuala Lumpur', 'Penang', 'Other']}
                    value={form.state}
                    onChange={(v) => updateForm('state', v)}
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                    Area / Township
                  </label>
                  <input
                    type="text"
                    value={form.area}
                    onChange={(e) => updateForm('area', e.target.value)}
                    placeholder="e.g. Bukit Chagar, Iskandar Puteri"
                    className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                    Full Address
                  </label>
                  <textarea
                    value={form.address}
                    onChange={(e) => updateForm('address', e.target.value)}
                    placeholder="Full property address"
                    className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors resize-y min-h-[80px]"
                  />
                </div>
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => goStep(1)}
                    className="flex-1 py-3 px-6 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="inline w-4 h-4 mr-1" /> Back
                  </button>
                  <button
                    onClick={() => goStep(3)}
                    className="flex-1 py-3 px-6 rounded-lg bg-[#06457F] text-white text-sm font-semibold hover:bg-[#c9a962] transition-colors"
                  >
                    Next <ChevronRight className="inline w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Expectations */}
            {currentStep === 3 && (
              <div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                    Asking Price (RM)
                  </label>
                  <input
                    type="text"
                    value={form.askPrice}
                    onChange={(e) => updateForm('askPrice', e.target.value)}
                    placeholder="e.g. 500,000"
                    className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                    Reason for Selling
                  </label>
                  <RadioGroup
                    name="reason"
                    options={['Upgrading', 'Relocating', 'Investment exit', 'Other']}
                    value={form.reason}
                    onChange={(v) => updateForm('reason', v)}
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">Timeline</label>
                  <RadioGroup
                    name="timeline"
                    options={['ASAP', 'Within 3 months', 'Within 6 months', 'No rush']}
                    value={form.timeline}
                    onChange={(v) => updateForm('timeline', v)}
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                    Any Existing Tenancy?
                  </label>
                  <RadioGroup
                    name="tenancy"
                    options={['Yes', 'No']}
                    value={form.tenancy}
                    onChange={(v) => updateForm('tenancy', v)}
                  />
                </div>
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => goStep(2)}
                    className="flex-1 py-3 px-6 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="inline w-4 h-4 mr-1" /> Back
                  </button>
                  <button
                    onClick={() => goStep(4)}
                    className="flex-1 py-3 px-6 rounded-lg bg-[#06457F] text-white text-sm font-semibold hover:bg-[#c9a962] transition-colors"
                  >
                    Next <ChevronRight className="inline w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {currentStep === 4 && (
              <div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">Your Name</label>
                  <input
                    type="text"
                    value={form.contactName}
                    onChange={(e) => updateForm('contactName', e.target.value)}
                    placeholder="Full name"
                    className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                      Phone (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      value={form.contactPhone}
                      onChange={(e) => updateForm('contactPhone', e.target.value)}
                      placeholder="+65 or +60"
                      className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">Email</label>
                    <input
                      type="email"
                      value={form.contactEmail}
                      onChange={(e) => updateForm('contactEmail', e.target.value)}
                      placeholder="your@email.com"
                      className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                    Preferred Contact Method
                  </label>
                  <RadioGroup
                    name="contactMethod"
                    options={['WhatsApp', 'Call', 'Email']}
                    value={form.contactMethod}
                    onChange={(v) => updateForm('contactMethod', v)}
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                    Best Time to Contact
                  </label>
                  <select
                    value={form.bestTime}
                    onChange={(e) => updateForm('bestTime', e.target.value)}
                    className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c9a962] transition-colors"
                  >
                    <option>Morning (9am - 12pm)</option>
                    <option>Afternoon (12pm - 5pm)</option>
                    <option>Evening (5pm - 9pm)</option>
                    <option>Anytime</option>
                  </select>
                </div>
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => goStep(3)}
                    className="flex-1 py-3 px-6 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="inline w-4 h-4 mr-1" /> Back
                  </button>
                  <button
                    onClick={() => goStep(5)}
                    className="flex-1 py-3 px-6 rounded-lg bg-[#06457F] text-white text-sm font-semibold hover:bg-[#c9a962] transition-colors"
                  >
                    Next <ChevronRight className="inline w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Photos */}
            {currentStep === 5 && (
              <div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-[#06457F] mb-1.5">
                    Property Photos{' '}
                    <span className="text-xs text-gray-400 font-normal ml-1">
                      (optional, up to 10 images)
                    </span>
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      handleFiles(e.dataTransfer.files);
                    }}
                    className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                      dragOver
                        ? 'border-[#c9a962] bg-[#c9a96208]'
                        : 'border-gray-300 hover:border-[#c9a962]'
                    }`}
                  >
                    <Upload className="w-9 h-9 text-gray-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">
                      Drag & drop photos here, or click to browse
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      JPG, PNG up to 5MB each. Max 10 photos.
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {uploadedFiles.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Upload ${i + 1}`}
                          className="w-[72px] h-[72px] rounded-lg object-cover border border-gray-200"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => goStep(4)}
                    className="flex-1 py-3 px-6 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="inline w-4 h-4 mr-1" /> Back
                  </button>
                  <button
                    onClick={() => goStep(6)}
                    className="flex-1 py-3 px-6 rounded-lg bg-[#06457F] text-white text-sm font-semibold hover:bg-[#c9a962] transition-colors"
                  >
                    Review <ChevronRight className="inline w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Review */}
            {currentStep === 6 && (
              <div>
                <h3 className="text-lg font-bold text-[#06457F] mb-4">Review Your Details</h3>
                <div className="glass-card rounded-xl p-6">
                  {summaryRows.map(([label, value], i) => (
                    <div
                      key={label}
                      className={`flex justify-between py-2 text-[13px] ${
                        i < summaryRows.length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <span className="text-gray-500">{label}</span>
                      <span className="font-semibold text-[#06457F] text-right max-w-[60%]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => goStep(5)}
                    className="flex-1 py-3 px-6 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="inline w-4 h-4 mr-1" /> Back
                  </button>
                  <button
                    onClick={() => setSubmitted(true)}
                    className="glass-button-green flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Submit Valuation Request
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Thank You */
          <div className="text-center py-16">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl md:text-[28px] font-extrabold text-[#06457F] mb-3">
              Thank You!
            </h2>
            <p className="text-base text-gray-500 max-w-[500px] mx-auto mb-6">
              Your valuation request has been submitted. Our team will contact you within 24 hours
              with a market analysis.
            </p>
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                'Hi, I just submitted a property valuation request.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#25d366] text-white text-sm font-semibold hover:bg-[#1ebe5d] hover:scale-[1.03] transition-all"
            >
              <WhatsAppIcon className="w-[18px] h-[18px]" />
              Chat on WhatsApp
            </a>
          </div>
        )}
      </div>

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
