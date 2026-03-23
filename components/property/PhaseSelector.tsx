import Link from 'next/link';

interface Phase {
  key: string;
  label: string;
  href?: string;
}

interface PhaseSelectorProps {
  phases: Phase[];
  activePhase: string;
}

export function PhaseSelector({ phases, activePhase }: PhaseSelectorProps) {
  return (
    <div className="flex gap-0 max-w-[1200px] mx-auto px-[clamp(20px,5vw,60px)] border-b-2 border-border overflow-x-auto scrollbar-hide glass">
      {phases.map((phase) => {
        const isActive = phase.key === activePhase;
        const baseClasses =
          'px-6 py-3.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-[3px] -mb-[2px]';

        if (isActive) {
          return (
            <span
              key={phase.key}
              className={`${baseClasses} text-foreground border-[#c9a962] cursor-default`}
            >
              {phase.label}
            </span>
          );
        }

        return (
          <Link
            key={phase.key}
            href={phase.href || '#'}
            className={`${baseClasses} text-muted-foreground hover:text-foreground border-transparent`}
          >
            {phase.label}
          </Link>
        );
      })}
    </div>
  );
}
