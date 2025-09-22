// Temporary simple auth for deployment
import { createRemoteJWKSet, jwtVerify } from 'jose';

const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID || '';
const jwksUrl = `https://api.stack-auth.com/api/v1/projects/${projectId}/.well-known/jwks.json`;
const JWKS = createRemoteJWKSet(new URL(jwksUrl));

export type SessionUser = { id: string; email?: string | null; username?: string | null; role?: 'USER' | 'ADMIN' };

export const auth = async (): Promise<{ user: SessionUser | null }> => {
  try {
    // Read token from the cookie set by our callback route
    const cookieHeader = (globalThis as any)?.headers?.get?.('cookie') || '';
    const match = cookieHeader.match(/user-session=([^;]+)/);
    if (!match) return { user: null };
    const token = decodeURIComponent(match[1]);

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `stack/${projectId}`,
      audience: `stack/${projectId}`,
    });

    const user: SessionUser = {
      id: (payload.sub as string) || 'unknown',
      email: (payload.email as string) || null,
      username: (payload.username as string) || null,
      role: (payload.role as any) || 'USER'
    };
    return { user };
  } catch {
    return { user: null };
  }
};

export const signIn = async () => ({ ok: true });
export const signOut = async () => ({ ok: true });

export const handlers = { GET: async () => new Response('OK'), POST: async () => new Response('OK') };