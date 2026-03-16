import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Sanity webhook revalidation endpoint.
 *
 * When content is published in Sanity Studio, a webhook POSTs here
 * and we revalidate the affected pages so they regenerate.
 *
 * Set up the webhook in Sanity:
 *   URL: https://yourdomain.com/api/revalidate
 *   Secret: SANITY_REVALIDATE_SECRET (set in .env)
 *   Trigger on: Create, Update, Delete
 */
export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret');

    // Verify the webhook secret
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const body = await request.json();
    const { _type } = body;

    // Revalidate based on the document type that was changed
    switch (_type) {
      case 'property':
        // Revalidate property pages and homepage (which shows featured properties)
        revalidatePath('/[locale]', 'page');
        revalidatePath('/[locale]/properties', 'page');
        revalidatePath('/[locale]/properties/[slug]', 'page');
        break;

      case 'testimonial':
      case 'faq':
        // These appear on the homepage
        revalidatePath('/[locale]', 'page');
        break;

      case 'siteSettings':
        // Settings affect all pages (nav, footer, WhatsApp, etc.)
        revalidatePath('/', 'layout');
        break;

      case 'developer':
        // Developer info appears on property pages
        revalidatePath('/[locale]/properties/[slug]', 'page');
        break;

      default:
        // Revalidate everything as a fallback
        revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      now: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}
