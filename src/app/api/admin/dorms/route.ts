import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getDorms } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get dorms from the data layer and add vote counts
    const dorms = getDorms();
    
    // Get vote counts for each dorm
    const dormVotes = await prisma.vote.findMany({
      where: { itemType: 'DORM' },
      select: { itemId: true, score: true }
    });

    // Calculate ratings for each dorm
    const dormsWithRatings = dorms.map(dorm => {
      const votes = dormVotes.filter(vote => vote.itemId === dorm.id);
      const average = votes.length > 0 
        ? votes.reduce((sum, vote) => sum + vote.score, 0) / votes.length 
        : 0;
      
      return {
        ...dorm,
        rating: {
          average,
          count: votes.length
        }
      };
    });

    return NextResponse.json(dormsWithRatings);
  } catch (error) {
    console.error('Get dorms error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
