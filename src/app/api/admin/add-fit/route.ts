import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin-session');
    if (!adminSession || adminSession.value !== 'true') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { creator, creatorInstagram, description, photos, styleTags, dorm } = await request.json();

    const fit = await prisma.fit.create({
      data: {
        creator,
        creatorInstagram: creatorInstagram || null,
        description: description || '',
        photos: JSON.stringify(photos || []),
        styleTags: JSON.stringify(styleTags || []),
        dorm: dorm || null,
        rating: { average: 0, count: 0 },
      }
    });

    return NextResponse.json({ success: true, fit });
  } catch (error) {
    console.error('Error adding fit:', error);
    return NextResponse.json({ success: false, message: 'Failed to add fit' }, { status: 500 });
  }
}


