import { NextRequest, NextResponse } from 'next/server';
//import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';

import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin-session');
    if (!adminSession || adminSession.value !== 'true') {
      return NextResponse.json(
        { message: 'Admin access required' },
        { status: 403 }
      );
    }

    const votes = await prisma.vote.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(votes);
  } catch (error) {
    console.error('Get votes error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
