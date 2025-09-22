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

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            votes: true,
            applications: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
