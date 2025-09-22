import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const user = cookieStore.get('user-session');
  if (!user) return NextResponse.json({ user: null });
  try {
    return NextResponse.json({ user: JSON.parse(user.value) });
  } catch {
    return NextResponse.json({ user: null });
  }
}


