'use client';

import { useState } from 'react';

interface FacilityItem {
  icon: string;
  name: string;
  desc?: string;
}

interface FacilitiesSectionProps {
  facilities: Record<string, FacilityItem[]>;
}

const categoryLabels: Record<string, string> = {
  leisure: 'Leisure & Recreation',
  fitness: 'Fitness & Wellness',
  services: 'Services & Convenience',
};

const categoryGradients: Record<string, string> = {
  leisure: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
  fitness: 'bg-gradient-to-br from-blue-600 to-blue-800',
  services: 'bg-gradient-to-br from-purple-600 to-purple-800',
};

export function FacilitiesSection({ facilities }: FacilitiesSectionProps) {
  const categories = Object.keys(facilities);
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'leisure');
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const items = facilities[activeCategory] || [];
  const activeItem = items[activeItemIndex] || items[0];

  const handleCategorySwitch = (cat: string) => {
    setActiveCategory(cat);
    setActiveItemIndex(0);
  };

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-xl font-extrabold text-foreground mb-5">Facilities & Amenities</h2>

      {/* Category tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategorySwitch(cat)}
            className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all ${
              activeCategory === cat
                ? 'glass-dark text-white border-none'
                : 'glass-button text-[#1a1a2e]'
            }`}
          >
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      {/* Showcase panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border bg-white">
        {/* Hero panel */}
        <div
          className={`relative min-h-[300px] ${categoryGradients[activeCategory] || 'bg-gradient-to-br from-gray-600 to-gray-800'} glass-specular flex items-end p-6 text-white`}
        >
          <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/35 backdrop-blur-sm text-white flex items-center gap-1.5">
            {items.length} facilities
          </span>
          <div className="text-[17px] font-bold drop-shadow-md">
            {activeItem?.name || 'Select a facility'}
          </div>
        </div>

        {/* Facility list */}
        <div className="flex flex-col">
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => setActiveItemIndex(i)}
              className={`flex items-center gap-3.5 px-5 py-4 border-b border-border/50 last:border-b-0 cursor-pointer transition-colors ${
                activeItemIndex === i ? 'bg-emerald-50' : 'hover:glass'
              }`}
            >
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0 bg-muted/50">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground">{item.name}</h4>
                {item.desc && (
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                )}
              </div>
              <span className="text-muted-foreground/40 text-base ml-auto">&rsaquo;</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
