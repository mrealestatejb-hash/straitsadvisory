'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/ThemeProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          duration: 1.2,
          smoothWheel: true,
          syncTouch: true,
        }}
      >
        {children}
      </ReactLenis>
    </ThemeProvider>
    </SessionProvider>
  );
}
