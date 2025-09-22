import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_EMAIL = 'admin@rumered.com';
const ADMIN_PASSWORD = 'admin123';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Set admin session cookie
      const cookieStore = await cookies();
      cookieStore.set('admin-session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return NextResponse.json({ success: true, message: 'Login successful' });
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
