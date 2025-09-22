import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || session.user?.role !== 'ADMIN') {
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

    // For now, we'll just return success since we're using static data
    // In production, you would update the database or external storage
    console.log(`Updating ${type} ${id}:`, data);

    return NextResponse.json({ 
      message: 'Content updated successfully',
      data 
    });
  } catch (error) {
    console.error('Update content error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
