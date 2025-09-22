import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ message: 'Email required' }, { status: 400 });

    const user = await prisma.user.findFirst({ where: { email } });
    // For security, always respond success
    if (!user) return NextResponse.json({ success: true });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000);
    await prisma.user.update({ where: { id: user.id }, data: { resetToken, resetTokenExpiry: expiry } });

    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;
    // Try Resend if configured; otherwise fallback to console
    const resendKey = process.env.RESEND_API_KEY;
    const resend = resendKey ? new Resend(resendKey) : null;
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Rumered <no-reply@rumered.com>',
          to: email,
          subject: 'Reset your password',
          html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`
        });
      } catch (e) {
        console.error('Resend error, falling back to console:', e);
        await sendPasswordResetEmail(email, resetToken);
      }
    } else {
      await sendPasswordResetEmail(email, resetToken);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


