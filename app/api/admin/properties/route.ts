import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const properties = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ properties });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    let slug = generateSlug(body.name);

    // Ensure slug uniqueness
    const existing = await prisma.property.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    const property = await prisma.property.create({
      data: {
        name: body.name,
        slug,
        developer: body.developer,
        location: body.location,
        area: body.area,
        type: body.type || 'condo',
        status: body.status || 'completed',
        tenure: body.tenure || 'freehold',
        priceRM: parseInt(body.priceRM, 10),
        priceMaxRM: body.priceMaxRM ? parseInt(body.priceMaxRM, 10) : null,
        beds: body.beds,
        baths: body.baths,
        size: body.size,
        yieldPercent: body.yieldPercent ? parseFloat(body.yieldPercent) : null,
        rtsDistance: body.rtsDistance || null,
        description: body.description || null,
        amenities: body.amenities || null,
        features: body.features || null,
        tourUrl: body.tourUrl || null,
        whatsappUrl: body.whatsappUrl || null,
        gradient: body.gradient || null,
        lat: body.lat ? parseFloat(body.lat) : null,
        lng: body.lng ? parseFloat(body.lng) : null,
        published: body.published ?? true,
      },
    });

    return NextResponse.json({ property }, { status: 201 });
  } catch (error) {
    console.error('Failed to create property:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}
