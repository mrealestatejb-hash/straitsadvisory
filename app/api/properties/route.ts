import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const properties = await prisma.property.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ properties });
}
