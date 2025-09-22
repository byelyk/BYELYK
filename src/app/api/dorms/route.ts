import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const dorms = await prisma.dorm.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Parse JSON fields
    const dormsWithParsedData = dorms.map(dorm => ({
      ...dorm,
      photos: JSON.parse(dorm.photos || '[]'),
      tags: JSON.parse(dorm.tags || '[]'),
      rating: dorm.rating as { average: number; count: number }
    }));

    return NextResponse.json(dormsWithParsedData);
  } catch (error) {
    console.error('Error fetching dorms:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const dorm = await prisma.dorm.create({
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

    return NextResponse.json(dorm);
  } catch (error) {
    console.error('Error creating dorm:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
