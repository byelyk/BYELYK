import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin-session');

    if (adminSession?.value === 'true') {
      return NextResponse.json({ isAdmin: true });
    }

    return NextResponse.json({ isAdmin: false });
  } catch (error) {
    console.error('Admin check error:', error);
    return NextResponse.json({ isAdmin: false });
  }
}
