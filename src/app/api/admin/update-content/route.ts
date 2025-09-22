import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Admin access required' },
        { status: 403 }
      );
    }

    const { type, id, data } = await request.json();

    if (!type || !id || !data) {
      return NextResponse.json(
        { message: 'Type, ID, and data are required' },
        { status: 400 }
      );
    }

    let updatedItem;

    if (type === 'dorm') {
      updatedItem = await prisma.dorm.update({
        where: { id },
        data: {
          name: data.name,
          addressOrArea: data.addressOrArea,
          type: data.type,
          description: data.description,
          photos: JSON.stringify(data.photos || []),
          tags: JSON.stringify(data.tags || []),
          rating: data.rating || { average: 0, count: 0 }
        }
      });
    } else if (type === 'fit') {
      updatedItem = await prisma.fit.update({
        where: { id },
        data: {
          creator: data.creator,
          description: data.description,
          photos: JSON.stringify(data.photos || []),
          styleTags: JSON.stringify(data.styleTags || []),
          dorm: data.dorm,
          rating: data.rating || { average: 0, count: 0 }
        }
      });
    } else {
      return NextResponse.json(
        { message: 'Invalid type. Must be "dorm" or "fit"' },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      message: 'Content updated successfully',
      data: updatedItem 
    });
  } catch (error) {
    console.error('Update content error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
