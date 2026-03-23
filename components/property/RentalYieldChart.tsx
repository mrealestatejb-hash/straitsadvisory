'use client';

import { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';

interface RentalDataPoint {
  year: number;
  rent: number;
}

interface RentalYieldChartProps {
  data: RentalDataPoint[];
  subtitle?: string;
}

export function RentalYieldChart({ data, subtitle }: RentalYieldChartProps) {
  const { maxRent, currentRent, firstRent, growthPct } = useMemo(() => {
    const max = Math.max(...data.map((d) => d.rent));
    const current = data[data.length - 1];
    const first = data[0];
    const growth = Math.round(((current.rent - first.rent) / first.rent) * 100);
    return { maxRent: max, currentRent: current, firstRent: first, growthPct: growth };
  }, [data]);

  const maxHeight = 180;

  return (
    <div className="py-8 border-b border-border">
      <div className="glass-card rounded-2xl p-7 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-foreground mb-1">
              Rental Income Performance
            </h2>
            {subtitle && <p className="text-[13px] text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="text-right flex-shrink-0">
            <span className="block text-[32px] font-extrabold text-emerald-600 leading-tight">
              RM{currentRent.rent.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">Current rental</span>
          </div>
        </div>

        {/* Chart */}
        <div className="relative px-3">
          {/* Y-axis guide lines (behind bars) */}
          <div className="absolute inset-x-3 bottom-[28px] top-0 flex flex-col justify-between pointer-events-none">
            <div className="border-b border-dashed border-gray-200/60" />
            <div className="border-b border-dashed border-gray-200/60" />
            <div className="border-b border-dashed border-gray-200/60" />
            <div className="border-b border-gray-200/80" />
          </div>

          {/* Bars */}
          <div className="flex items-end gap-3 relative" style={{ height: `${maxHeight + 40}px` }}>
            {data.map((d, i) => {
              const barHeight = Math.round((d.rent / (maxRent * 1.15)) * maxHeight);
              const isLatest = i === data.length - 1;
              const progress = i / (data.length - 1);
              const bgColor = isLatest
                ? 'linear-gradient(180deg, #059669 0%, #047857 100%)'
                : `linear-gradient(180deg, rgba(16, 185, 129, ${0.35 + progress * 0.45}) 0%, rgba(5, 150, 105, ${0.3 + progress * 0.5}) 100%)`;

              return (
                <div key={d.year} className="flex-1 flex flex-col items-center relative">
                  {/* Value label */}
                  <span
                    className={`text-[11px] font-bold whitespace-nowrap mb-1.5 ${
                      isLatest ? 'text-emerald-700' : 'text-emerald-600/80'
                    }`}
                  >
                    RM{d.rent.toLocaleString()}
                  </span>

                  {/* Bar */}
                  <div
                    className={`w-[65%] rounded-t-lg transition-all duration-500 ${
                      isLatest ? 'shadow-md shadow-emerald-200' : ''
                    }`}
                    style={{
                      height: `${barHeight}px`,
                      background: bgColor,
                    }}
                  />

                  {/* Year label */}
                  <span
                    className={`text-xs font-semibold mt-2 ${
                      isLatest ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {d.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Growth insight */}
        <div className="glass-tint-green rounded-xl p-4 flex items-center gap-3.5 mt-6">
          <div className="w-10 h-10 rounded-[10px] bg-emerald-600 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-600 mb-0.5">
              +{growthPct}% rental growth since {firstRent.year}
            </h4>
            <p className="text-[13px] text-gray-700">
              Consistent upward trend driven by RTS Link anticipation & Singapore spillover
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-muted-foreground/60 mt-3 italic">
          Source: Internal transaction data & rental records. Past performance does not guarantee
          future results.
        </p>
      </div>
    </div>
  );
}
