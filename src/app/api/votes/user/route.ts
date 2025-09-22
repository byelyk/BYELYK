import { NextRequest, NextResponse } from 'next/server';
//import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';

import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user-session');
    if (!userCookie) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }
    const user = JSON.parse(userCookie.value);

    const votes = await prisma.vote.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(votes);
  } catch (error) {
    console.error('Get user votes error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
