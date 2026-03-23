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

  const maxHeight = 160;

  return (
    <div className="py-8 border-b border-border">
      <div className="bg-white border border-border rounded-2xl p-7 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-foreground mb-1">
              Rental Income Performance
            </h2>
            {subtitle && <p className="text-[13px] text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="text-right flex-shrink-0">
            <span className="block text-[32px] font-extrabold text-emerald-600">
              RM{currentRent.rent.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">Current rental</span>
          </div>
        </div>

        {/* Chart */}
        <div className="flex items-end gap-0 h-[200px] px-2 mb-2 relative">
          <div className="absolute top-0 left-0 right-0 bottom-7 border-b border-dashed border-border" />
          {data.map((d, i) => {
            const barHeight = Math.round((d.rent / (maxRent * 1.3)) * maxHeight);
            const isLatest = i === data.length - 1;
            const opacity = 0.3 + (i / data.length) * 0.7;
            const bgColor = isLatest
              ? '#059669'
              : `rgba(5, 150, 105, ${opacity.toFixed(2)})`;

            return (
              <div key={d.year} className="flex-1 flex flex-col items-center gap-1 relative">
                <div
                  className="w-[60%] rounded-t-md relative min-h-[4px] transition-all duration-600"
                  style={{ height: `${barHeight}px`, background: bgColor }}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[11px] font-bold text-emerald-600 whitespace-nowrap">
                    RM{d.rent.toLocaleString()}
                  </span>
                </div>
                <span className="text-xs font-semibold text-muted-foreground mt-1">
                  {d.year}
                </span>
              </div>
            );
          })}
        </div>

        {/* Growth insight */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 flex items-center gap-3.5 mt-4">
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
