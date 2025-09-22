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

    const [
      totalUsers,
      totalApplications,
      totalVotes,
      pendingApplications,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.application.count(),
      prisma.vote.count(),
      prisma.application.count({
        where: { status: 'PENDING' }
      }),
    ]);

    return NextResponse.json({
      totalUsers,
      totalApplications,
      totalVotes,
      pendingApplications,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
