'use client';

/**
 * Sanity Studio route — accessible at /studio
 *
 * This renders the full Sanity Studio admin interface.
 * The studio is client-side only (no SSR needed).
 */

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
