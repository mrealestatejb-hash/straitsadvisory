'use client';

import { useLayoutEffect, useRef, ReactNode } from 'react';
import { gsap } from '@/lib/gsap';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="page-content">
      {children}
    </div>
  );
}
