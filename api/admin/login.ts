import type { ApiRequest, ApiResponse } from '../_lib/types.js';
import { handleAdminLogin } from '../_lib/handlers.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).send('');
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    return await handleAdminLogin(req, res);
  } catch (err: any) {
    console.error('[API /api/admin/login Error]:', err);
    return res.status(500).json({ error: 'Authentication service error' });
  }
}
