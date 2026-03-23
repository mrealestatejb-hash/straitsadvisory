'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Bed, Bath } from 'lucide-react';

interface UnitType {
  name: string;
  beds: number;
  baths: number;
  size: string;
  img?: string;
  furnishing?: string;
}

interface UnitTypesViewerProps {
  units: UnitType[];
}

export function UnitTypesViewer({ units }: UnitTypesViewerProps) {
  const bedCounts = useMemo(() => {
    const counts = [...new Set(units.map((u) => u.beds))].sort((a, b) => a - b);
    return counts;
  }, [units]);

  const [activeBeds, setActiveBeds] = useState(bedCounts[0] || 1);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredUnits = useMemo(() => {
    return units.filter((u) => u.beds === activeBeds);
  }, [units, activeBeds]);

  const selectedUnit = filteredUnits[selectedIndex] || filteredUnits[0];

  const handleBedFilter = (beds: number) => {
    setActiveBeds(beds);
    setSelectedIndex(0);
  };

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-xl font-extrabold text-foreground mb-5">Unit Types</h2>

      {/* Bedroom filter tabs */}
      <div className="flex gap-0 border-b-2 border-border mb-0">
        {bedCounts.map((beds) => (
          <button
            key={beds}
            onClick={() => handleBedFilter(beds)}
            className={`px-6 py-3 text-sm font-semibold border-b-2 -mb-[2px] transition-all whitespace-nowrap ${
              activeBeds === beds
                ? 'text-foreground border-foreground'
                : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}
          >
            {beds} Bedroom{beds > 1 ? 's' : ''}
          </button>
        ))}
      </div>

      {/* Viewer */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] glass-card rounded-xl overflow-hidden min-h-[500px]">
        {/* Sidebar list */}
        <div className="border-b md:border-b-0 md:border-r border-border max-h-[200px] md:max-h-[500px] overflow-y-auto">
          {filteredUnits.map((unit, i) => (
            <div
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`px-4 py-3.5 border-b border-border/50 cursor-pointer transition-colors ${
                selectedIndex === i
                  ? 'glass-tint-pink border-l-[3px] border-l-red-600'
                  : 'hover:bg-muted/50'
              }`}
            >
              <div className="text-sm font-semibold text-foreground">{unit.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{unit.size}</div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selectedUnit && (
          <div className="flex flex-col">
            <div className="px-5 py-4 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="text-base font-bold text-foreground uppercase tracking-wide">
                    {selectedUnit.name}
                  </div>
                  <div className="text-sm text-gray-700 mt-1.5 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4" /> {selectedUnit.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-4 h-4" /> {selectedUnit.baths}
                    </span>
                    <span>{selectedUnit.size}</span>
                  </div>
                  {selectedUnit.furnishing && (
                    <div className="text-[13px] text-muted-foreground mt-1">
                      Furnishing: {selectedUnit.furnishing}
                    </div>
                  )}
                </div>
                <a
                  href={`https://wa.me/60197058001?text=${encodeURIComponent(
                    `Hi, I'd like to request the price for ${selectedUnit.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 border-2 border-[#06457F] rounded-lg text-[13px] font-semibold text-[#06457F] hover:bg-[#06457F] hover:text-white transition-colors"
                >
                  Request Price
                </a>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-muted/20 p-3">
              {selectedUnit.img ? (
                <Image
                  src={selectedUnit.img}
                  alt={`${selectedUnit.name} Floor Plan`}
                  width={600}
                  height={420}
                  className="max-w-full max-h-[420px] object-contain"
                  unoptimized
                />
              ) : (
                <div className="text-muted-foreground text-sm">Floor plan coming soon</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
