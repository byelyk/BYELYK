import { NextRequest, NextResponse } from 'next/server';
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

    // Get dorms from database
    const dorms = await prisma.dorm.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Parse JSON fields and return
    const dormsWithParsedData = dorms.map(dorm => ({
      ...dorm,
      photos: JSON.parse(dorm.photos || '[]'),
      tags: JSON.parse(dorm.tags || '[]'),
      rating: dorm.rating as { average: number; count: number }
    }));

    return NextResponse.json(dormsWithParsedData);
  } catch (error) {
    console.error('Get dorms error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
