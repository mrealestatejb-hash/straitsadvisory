import { FileText, CheckCircle, Globe, DollarSign } from 'lucide-react';
import type { ReactNode } from 'react';

const iconMap: Record<string, ReactNode> = {
  tenure: <FileText className="w-[22px] h-[22px] text-muted-foreground" />,
  status: <CheckCircle className="w-[22px] h-[22px] text-muted-foreground" />,
  foreigners: <Globe className="w-[22px] h-[22px] text-muted-foreground" />,
  entry: <DollarSign className="w-[22px] h-[22px] text-muted-foreground" />,
};

interface KeyInfoItem {
  icon: string;
  value: string;
  label: string;
}

interface KeyInfoRowProps {
  items: KeyInfoItem[];
}

export function KeyInfoRow({ items }: KeyInfoRowProps) {
  return (
    <div className="flex flex-wrap glass-card rounded-xl overflow-hidden mb-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex-1 min-w-[80px] px-2 sm:px-3 py-4 text-center border-r border-white/20 last:border-r-0 flex flex-col items-center gap-1"
        >
          {iconMap[item.icon] || <FileText className="w-[22px] h-[22px] text-muted-foreground" />}
          <span className="text-[14px] sm:text-base font-bold text-foreground leading-tight line-clamp-1">{item.value}</span>
          <span className="text-[11px] text-muted-foreground uppercase tracking-wide leading-tight">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
