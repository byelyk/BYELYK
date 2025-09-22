import { NextRequest, NextResponse } from 'next/server';
//import { getServerSession } from 'next-auth/next';
import { getSessionUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    
    if (!user?.id || user?.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Admin access required' },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }

    // For now, we'll just return a mock URL
    // In production, you would upload to Cloudinary, AWS S3, etc.
    const mockUrl = `https://images.unsplash.com/photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}?w=800&h=600&fit=crop`;

    return NextResponse.json({ 
      url: mockUrl,
      message: 'Photo uploaded successfully' 
    });
  } catch (error) {
    console.error('Photo upload error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
