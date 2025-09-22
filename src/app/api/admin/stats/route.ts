import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || session.user?.role !== 'ADMIN') {
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
