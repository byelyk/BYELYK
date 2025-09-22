import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as any;
    
    if (!session?.user?.id || (session.user as any)?.role !== 'ADMIN') {
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
