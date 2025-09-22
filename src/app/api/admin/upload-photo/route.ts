import { NextRequest, NextResponse } from 'next/server';
//import { auth } from '@/lib/auth';
import { auth } from '@/lib/auth';

async function uploadToSupabase(file: File) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  const bucket = process.env.SUPABASE_BUCKET || 'uploads';
  if (!url || !key) return null;

  const arrayBuffer = await file.arrayBuffer();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
  const uploadUrl = `${url}/storage/v1/object/${bucket}/${path}`;

  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': file.type || 'application/octet-stream'
    },
    body: Buffer.from(arrayBuffer)
  });
  if (!res.ok) return null;
  const publicUrl = `${url}/storage/v1/object/public/${bucket}/${path}`;
  return publicUrl;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!(session as any)?.user?.id || (session as any)?.user?.role !== 'ADMIN') {
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

    // Try Supabase Storage if configured
    const uploadedUrl = await uploadToSupabase(file);
    if (uploadedUrl) {
      return NextResponse.json({ url: uploadedUrl, message: 'Photo uploaded successfully' });
    }

    // Fallback mock URL
    const mockUrl = `https://images.unsplash.com/photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}?w=800&h=600&fit=crop`;
    return NextResponse.json({ url: mockUrl, message: 'Photo uploaded (mock)' });
  } catch (error) {
    console.error('Photo upload error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
