import { NextRequest, NextResponse } from 'next/server';
//import { auth } from '@/lib/auth';
import { auth } from '@/lib/auth';

import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!(session as any)?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const { itemId, itemType, score } = await request.json();

    if (!itemId || !itemType || !score || score < 1 || score > 10) {
      return NextResponse.json(
        { message: 'Invalid vote data' },
        { status: 400 }
      );
    }

    // Upsert vote (update if exists, create if not)
    const vote = await prisma.vote.upsert({
      where: {
        userId_itemId_itemType: {
          userId: (session as any)?.user?.id || 'demo-user',
          itemId,
          itemType: itemType as 'DORM' | 'FIT',
        },
      },
      update: {
        score,
      },
      create: {
        userId: (session as any)?.user?.id || 'demo-user',
        itemId,
        itemType: itemType as 'DORM' | 'FIT',
        score,
      },
    });

    // Calculate new average rating
    const votes = await prisma.vote.findMany({
      where: {
        itemId,
        itemType: itemType as 'DORM' | 'FIT',
      },
    });

    const average = votes.reduce((sum, v) => sum + v.score, 0) / votes.length;
    const count = votes.length;

    return NextResponse.json({
      vote,
      rating: { average, count },
    });
  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!(session as any)?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('itemId');
    const itemType = searchParams.get('itemType');

    if (!itemId || !itemType) {
      return NextResponse.json(
        { message: 'itemId and itemType are required' },
        { status: 400 }
      );
    }

    const vote = await prisma.vote.findUnique({
      where: {
        userId_itemId_itemType: {
          userId: (session as any)?.user?.id || 'demo-user',
          itemId,
          itemType: itemType as 'DORM' | 'FIT',
        },
      },
    });

    return NextResponse.json({ vote });
  } catch (error) {
    console.error('Get vote error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
