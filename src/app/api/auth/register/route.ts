import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password || username.length < 3 || password.length < 4) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 400 });
    }

    const existing = await prisma.user.findFirst({ where: { username } });
    if (existing) {
      return NextResponse.json({ message: 'Username already taken' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        passwordHash,
        role: 'USER'
      },
      select: { id: true, username: true, role: true }
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


