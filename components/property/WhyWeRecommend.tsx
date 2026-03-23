import type { ReactNode } from 'react';

interface RecommendCard {
  title: string;
  desc: string;
  color: string;
  icon: ReactNode;
}

interface WhyWeRecommendProps {
  title: string;
  subtitle: string;
  cards: RecommendCard[];
}

const colorThemes: Record<string, { bg: string; iconBg: string; titleColor: string }> = {
  '#059669': {
    bg: 'glass-tint-green glass-specular',
    iconBg: 'bg-[#5289AD]',
    titleColor: 'text-[#5289AD]',
  },
  '#d97706': {
    bg: 'glass-tint-amber glass-specular',
    iconBg: 'bg-[#D4C4A8]',
    titleColor: 'text-[#D4C4A8]',
  },
  '#7c3aed': {
    bg: 'glass-tint-purple glass-specular',
    iconBg: 'bg-[#5289AD]',
    titleColor: 'text-[#5289AD]',
  },
  '#db2777': {
    bg: 'glass-tint-pink glass-specular',
    iconBg: 'bg-[#5289AD]',
    titleColor: 'text-[#5289AD]',
  },
};

export function WhyWeRecommend({ title, subtitle, cards }: WhyWeRecommendProps) {
  return (
    <div className="py-8 border-b border-border">
      <p className="text-center text-[13px] font-semibold tracking-[2px] uppercase text-[#5289AD] mb-3">
        WHY WE RECOMMEND
      </p>
      <h2 className="text-center text-2xl md:text-[32px] font-extrabold text-foreground mb-2">
        {title}
      </h2>
      <p className="text-center text-[15px] text-muted-foreground mb-8 max-w-[520px] mx-auto">
        {subtitle}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, i) => {
          const theme = colorThemes[card.color] || colorThemes['#059669'];
          return (
            <div
              key={i}
              className={`${theme.bg} rounded-2xl p-6 flex gap-4 items-start`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${theme.iconBg} flex items-center justify-center flex-shrink-0 text-white`}
              >
                {card.icon}
              </div>
              <div>
                <h3 className={`text-base font-bold ${theme.titleColor} mb-1`}>
                  {card.title}
                </h3>
                <p className="text-[13px] text-gray-700 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
