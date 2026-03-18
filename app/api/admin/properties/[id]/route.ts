import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    // Build update data, only including provided fields
    const data: Record<string, unknown> = {};

    if (body.name !== undefined) data.name = body.name;
    if (body.developer !== undefined) data.developer = body.developer;
    if (body.location !== undefined) data.location = body.location;
    if (body.area !== undefined) data.area = body.area;
    if (body.type !== undefined) data.type = body.type;
    if (body.status !== undefined) data.status = body.status;
    if (body.tenure !== undefined) data.tenure = body.tenure;
    if (body.priceRM !== undefined) data.priceRM = parseInt(body.priceRM, 10);
    if (body.priceMaxRM !== undefined)
      data.priceMaxRM = body.priceMaxRM ? parseInt(body.priceMaxRM, 10) : null;
    if (body.beds !== undefined) data.beds = body.beds;
    if (body.baths !== undefined) data.baths = body.baths;
    if (body.size !== undefined) data.size = body.size;
    if (body.yieldPercent !== undefined)
      data.yieldPercent = body.yieldPercent
        ? parseFloat(body.yieldPercent)
        : null;
    if (body.rtsDistance !== undefined)
      data.rtsDistance = body.rtsDistance || null;
    if (body.description !== undefined)
      data.description = body.description || null;
    if (body.amenities !== undefined) data.amenities = body.amenities;
    if (body.features !== undefined) data.features = body.features;
    if (body.tourUrl !== undefined) data.tourUrl = body.tourUrl || null;
    if (body.whatsappUrl !== undefined)
      data.whatsappUrl = body.whatsappUrl || null;
    if (body.gradient !== undefined) data.gradient = body.gradient || null;
    if (body.lat !== undefined)
      data.lat = body.lat ? parseFloat(body.lat) : null;
    if (body.lng !== undefined)
      data.lng = body.lng ? parseFloat(body.lng) : null;
    if (body.published !== undefined) data.published = body.published;

    const property = await prisma.property.update({
      where: { id },
      data,
    });

    return NextResponse.json({ property });
  } catch (error) {
    console.error('Failed to update property:', error);
    return NextResponse.json(
      { error: 'Failed to update property' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;

    await prisma.property.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete property:', error);
    return NextResponse.json(
      { error: 'Failed to delete property' },
      { status: 500 }
    );
  }
}
