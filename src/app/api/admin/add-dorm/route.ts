import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin-session');
    
    if (!adminSession || adminSession.value !== 'true') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { name, building, roomNumber, description, photos, amenities, tags } = await request.json();

    // Create new dorm in database
    const newDorm = await prisma.dorm.create({
      data: {
        name,
        type: 'residence-hall', // Default type
        description: description || '',
        photos: JSON.stringify(photos || []),
        tags: JSON.stringify(tags || []),
        rating: { average: 0, count: 0 },
        addressOrArea: `${building} • ${roomNumber || ''}`
      }
    });

    return NextResponse.json({ success: true, dorm: newDorm });
  } catch (error) {
    console.error('Error adding dorm:', error);
    return NextResponse.json({ success: false, message: 'Failed to add dorm' }, { status: 500 });
  }
}
