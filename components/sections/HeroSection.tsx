import React from 'react';

interface HeroSectionProps {
  badge?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  goldText?: string;
}

export function HeroSection({ badge, title, subtitle, goldText }: HeroSectionProps) {
  const renderTitle = () => {
    if (typeof title !== 'string' || !goldText) {
      return title;
    }
    const index = title.indexOf(goldText);
    if (index === -1) {
      return title;
    }
    const before = title.slice(0, index);
    const after = title.slice(index + goldText.length);
    return (
      <>
        {before}
        <span className="text-[#c9a962]">{goldText}</span>
        {after}
      </>
    );
  };

  return (
    <section
      className="relative py-32 md:py-40 px-[clamp(16px,4vw,48px)] overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d5a 50%, #1a1a2e 100%)',
      }}
    >
      {/* Decorative radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(201,169,98,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(45,45,90,0.4) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-[900px] mx-auto text-center">
        {badge && (
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-[#c9a962] border border-[#c9a962]/40 rounded-full">
            {badge}
          </span>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          {renderTitle()}
        </h1>

        {subtitle && (
          <p className="text-lg md:text-xl text-white/65 max-w-[600px] mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
