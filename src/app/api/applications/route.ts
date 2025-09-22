import { NextRequest, NextResponse } from 'next/server';
//import { getServerSession } from 'next-auth/next';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    
    if (!user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const { section, name, email, instagram, tiktok, dormOrHall, message, photoUrls } = await request.json();

    if (!section || !name || !message) {
      return NextResponse.json(
        { message: 'Section, name, and message are required' },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        section: section as 'DORM_WARS' | 'FIT_CHECKS',
        name,
        email: email || null,
        instagram: instagram || null,
        tiktok: tiktok || null,
        dormOrHall: dormOrHall || null,
        message,
        photoUrls: photoUrls || '[]',
        status: 'PENDING',
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Application creation error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    
    if (!user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    const whereClause: Record<string, unknown> = {};
    if (section) {
      whereClause.section = section.toUpperCase().replace('-', '_');
    }

    const applications = await prisma.application.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
