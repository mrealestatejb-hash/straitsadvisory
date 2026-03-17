'use client';

/**
 * Sanity Studio route — accessible at /studio
 *
 * This renders the full Sanity Studio admin interface.
 * The studio is client-side only (no SSR needed).
 */

import dynamic from 'next/dynamic';

const StudioPage = dynamic(
  () => import('./StudioContent'),
  { ssr: false }
);

export default function Page() {
  return <StudioPage />;
}
