import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      approved: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ users });
}

export async function PATCH(request: NextRequest) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userId, role, approved } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  // Prevent admin from demoting themselves
  if (userId === session.user.id) {
    return NextResponse.json({ error: 'Cannot modify your own account' }, { status: 400 });
  }

  const updateData: { role?: string; approved?: boolean } = {};
  if (role !== undefined) updateData.role = role;
  if (approved !== undefined) updateData.approved = approved;

  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      approved: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ user });
}
