import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import type { ApiRequest, ApiResponse } from './api/_lib/types.js';
import {
  handleAdminExport,
  handleAdminLeadById,
  handleAdminLeads,
  handleAdminLogin,
  handleChat,
  handleCreateLead,
  handleHealth,
} from './api/_lib/handlers.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '2mb' }));

function toApiRequest(req: Request): ApiRequest {
  return req as unknown as ApiRequest;
}

function toApiResponse(res: Response): ApiResponse {
  return res as unknown as ApiResponse;
}

// =========================================================================
// API ROUTES (Shared with Vercel Serverless Functions in /api)
// =========================================================================

app.get('/api/health', (req, res) => {
  void handleHealth(toApiRequest(req), toApiResponse(res));
});

app.post('/api/leads', (req, res) => {
  void handleCreateLead(toApiRequest(req), toApiResponse(res));
});

app.post('/api/contact', (req, res) => {
  void handleCreateLead(toApiRequest(req), toApiResponse(res));
});

app.post('/api/chat', (req, res) => {
  void handleChat(toApiRequest(req), toApiResponse(res));
});

app.post('/api/admin/login', (req, res) => {
  void handleAdminLogin(toApiRequest(req), toApiResponse(res));
});

app.get('/api/admin/leads', (req, res) => {
  void handleAdminLeads(toApiRequest(req), toApiResponse(res));
});

app.patch('/api/admin/leads/:id', (req, res) => {
  void handleAdminLeadById(toApiRequest(req), toApiResponse(res), req.params.id);
});

app.delete('/api/admin/leads/:id', (req, res) => {
  void handleAdminLeadById(toApiRequest(req), toApiResponse(res), req.params.id);
});

app.get('/api/admin/export', (req, res) => {
  void handleAdminExport(toApiRequest(req), toApiResponse(res));
});

// =========================================================================
// VITE DEV SERVER OR STATIC PRODUCTION SERVE
// =========================================================================
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} (isProduction: ${isProduction})`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
});
