import type { ApiRequest, ApiResponse } from './_lib/types.js';
import { handleChat } from './_lib/handlers.js';

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
    return await handleChat(req, res);
  } catch (err: any) {
    console.error('[API /api/chat Error]:', err);
    return res.status(500).json({
      reply:
        'I apologize, but I am experiencing a temporary connection delay. You can reach Asad directly via email at aliofficialtech1@gmail.com or WhatsApp at +92 316 4227321.',
    });
  }
}
