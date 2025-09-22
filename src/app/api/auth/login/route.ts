import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRemoteJWKSet, jwtVerify } from 'jose';

export async function POST(request: NextRequest) {
  try {
    const { id_token } = await request.json();
    if (!id_token) return NextResponse.json({ message: 'Missing id_token' }, { status: 400 });

    const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID || '';
    const JWKS = createRemoteJWKSet(new URL(`https://api.stack-auth.com/api/v1/projects/${projectId}/.well-known/jwks.json`));
    const { payload } = await jwtVerify(id_token, JWKS, {
      issuer: `stack/${projectId}`,
      audience: `stack/${projectId}`,
    });

    const cookieStore = await cookies();
    cookieStore.set('user-session', id_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    });

    return NextResponse.json({ user: { id: payload.sub, email: payload.email, role: (payload as any).role || 'USER' } });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


