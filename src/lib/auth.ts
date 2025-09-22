// Temporary simple auth for deployment
export const auth = async () => {
  return null; // No authentication for now
};

export const signIn = async () => {
  return { ok: true };
};

export const signOut = async () => {
  return { ok: true };
};

export const handlers = {
  GET: async () => new Response('OK'),
  POST: async () => new Response('OK'),
};