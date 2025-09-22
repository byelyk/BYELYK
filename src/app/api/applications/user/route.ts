import { NextRequest, NextResponse } from 'next/server';
//import { auth } from '@/lib/auth';
import { auth } from '@/lib/auth';

import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!(session as any)?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const applications = await prisma.application.findMany({
      where: {
        userId: (session as any)?.user?.id || 'demo-user',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Get user applications error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
