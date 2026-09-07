import express from 'express';
import { createServer as createViteServer } from 'vite';
import { resolve } from 'path';

async function createServer() {
  const app = express();
  
  app.use(express.json());
  
  // Mock Database
  const users: any[] = [];
  const activities: any[] = [];
  const challenges: any[] = [];
  
  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Example API
  app.post('/api/auth/register', (req, res) => {
    const user = { ...req.body, id: Date.now().toString() };
    users.push(user);
    res.json(user);
  });
  
  // Vite integration for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(resolve('dist')));
    app.get('*', (req, res) => {
      res.sendFile(resolve('dist/index.html'));
    });
  }
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

createServer();
