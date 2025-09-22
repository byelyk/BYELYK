import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json();

    if (!token || !email) {
      return NextResponse.json({ message: 'token and email are required' }, { status: 400 });
    }

    const adminToken = process.env.ADMIN_TOKEN;
    if (!adminToken) {
      return NextResponse.json({ message: 'Admin token not configured' }, { status: 500 });
    }

    if (token !== adminToken) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const updated = await prisma.user.update({ where: { id: user.id }, data: { role: 'ADMIN' } });
    return NextResponse.json({ success: true, user: { id: updated.id, email: updated.email, role: updated.role } });
  } catch (error) {
    console.error('Make-admin error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


