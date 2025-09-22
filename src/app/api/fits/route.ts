import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const fits = await prisma.fit.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Parse JSON fields
    const fitsWithParsedData = fits.map(fit => ({
      ...fit,
      photos: JSON.parse(fit.photos || '[]'),
      styleTags: JSON.parse(fit.styleTags || '[]'),
      rating: fit.rating as { average: number; count: number }
    }));

    return NextResponse.json(fitsWithParsedData);
  } catch (error) {
    console.error('Error fetching fits:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const fit = await prisma.fit.create({
      data: {
        creator: data.creator,
        description: data.description,
        photos: JSON.stringify(data.photos || []),
        styleTags: JSON.stringify(data.styleTags || []),
        dorm: data.dorm,
        rating: data.rating || { average: 0, count: 0 }
      }
    });

    return NextResponse.json(fit);
  } catch (error) {
    console.error('Error creating fit:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
