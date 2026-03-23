import { Globe } from 'lucide-react';

interface RouteItem {
  route: string;
  time: string;
}

interface PlaceItem {
  place: string;
  time: string;
}

interface ConnectivitySectionProps {
  toSingapore: RouteItem[];
  withinJB: PlaceItem[];
}

export function ConnectivitySection({ toSingapore, withinJB }: ConnectivitySectionProps) {
  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-xl font-extrabold text-foreground mb-5">Connectivity</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* To Singapore */}
        <div className="rounded-[14px] p-5 bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
          <div className="flex items-center gap-2 mb-3.5 text-[15px] font-bold text-foreground">
            <Globe className="w-5 h-5" />
            To Singapore
          </div>
          {toSingapore.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 text-sm text-gray-700 border-b border-black/[0.04] last:border-b-0"
            >
              <span>{item.route}</span>
              <span className="font-bold text-foreground whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </div>

        {/* Within JB */}
        <div className="rounded-[14px] p-5 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
          <div className="flex items-center gap-2 mb-3.5 text-[15px] font-bold text-foreground">
            <Globe className="w-5 h-5" />
            Within JB
          </div>
          {withinJB.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 text-sm text-gray-700 border-b border-black/[0.04] last:border-b-0"
            >
              <span>{item.place}</span>
              <span className="font-bold text-foreground whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
