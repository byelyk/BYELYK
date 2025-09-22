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

    // Get fits from database
    const fits = await prisma.fit.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Parse JSON fields and return
    const fitsWithParsedData = fits.map(fit => ({
      ...fit,
      photos: JSON.parse(fit.photos || '[]'),
      styleTags: JSON.parse(fit.styleTags || '[]'),
      rating: fit.rating as { average: number; count: number }
    }));

    return NextResponse.json(fitsWithParsedData);
  } catch (error) {
    console.error('Get fits error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
