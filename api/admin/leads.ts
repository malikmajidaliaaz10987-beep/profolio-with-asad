import type { ApiRequest, ApiResponse } from '../_lib/types.js';
import { handleAdminLeads } from '../_lib/handlers.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res.status(204).send('');
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    return await handleAdminLeads(req, res);
  } catch (err: any) {
    console.error('[API /api/admin/leads Error]:', err);
    return res.status(500).json({ error: 'Failed to retrieve leads' });
  }
}
