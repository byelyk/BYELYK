import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getFits } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get fits from the data layer and add vote counts
    const fits = getFits();
    
    // Get vote counts for each fit
    const fitVotes = await prisma.vote.findMany({
      where: { itemType: 'FIT' },
      select: { itemId: true, score: true }
    });

    // Calculate ratings for each fit
    const fitsWithRatings = fits.map(fit => {
      const votes = fitVotes.filter(vote => vote.itemId === fit.id);
      const average = votes.length > 0 
        ? votes.reduce((sum, vote) => sum + vote.score, 0) / votes.length 
        : 0;
      
      return {
        ...fit,
        rating: {
          average,
          count: votes.length
        }
      };
    });

    return NextResponse.json(fitsWithRatings);
  } catch (error) {
    console.error('Get fits error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
