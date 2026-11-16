import { getQueryString, type ApiRequest, type ApiResponse } from '../../_lib/types.js';
import { handleAdminLeadById } from '../../_lib/handlers.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'PATCH, DELETE, OPTIONS');
    return res.status(204).send('');
  }

  const id = getQueryString(req.query, 'id') || '';

  try {
    return await handleAdminLeadById(req, res, id);
  } catch (err: any) {
    console.error('[API /api/admin/leads/[id] Error]:', err);
    return res.status(500).json({ error: 'Failed to update or delete lead' });
  }
}
