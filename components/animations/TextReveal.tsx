'use client';

import { useLayoutEffect, useRef, ReactNode, useState } from 'react';
import { gsap } from '@/lib/gsap';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean; // If true, animate immediately without scroll trigger
}

export function TextReveal({
  children,
  className,
  delay = 0,
  immediate = false
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    if (!ref.current) return;

    // Simple fade-in animation that doesn't break text layout
    const ctx = gsap.context(() => {
      if (immediate) {
        // Animate immediately (for hero sections above fold)
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: delay,
            ease: 'power3.out',
            onComplete: () => setIsVisible(true)
          }
        );
      } else {
        // Use Intersection Observer for scroll-triggered animation
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !isVisible) {
              gsap.fromTo(
                ref.current,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  delay: delay,
                  ease: 'power3.out',
                  onComplete: () => setIsVisible(true)
                }
              );
              observer.disconnect();
            }
          },
          { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
      }
    });

    return () => ctx.revert();
  }, [delay, immediate, isVisible]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
}
