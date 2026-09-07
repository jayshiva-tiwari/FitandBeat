import express from 'express';
import { createServer as createViteServer } from 'vite';
import { resolve } from 'path';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { verifyGoogleAuth, getCurrentUser, completeOnboarding, authMiddleware, logout } from './server/controllers/authController';

async function createServer() {
  const app = express();
  
  // Connect to MongoDB
  const mongoURI = process.env.MONGODB_URI;
  if (mongoURI) {
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected to MongoDB successfully');
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
    }
  } else {
    console.warn('MONGODB_URI is not set. Database operations will fail.');
  }

  app.use(express.json());
  app.use(cookieParser());
  
  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Google Auth API
  app.post('/api/auth/google', verifyGoogleAuth);
  app.get('/api/auth/me', authMiddleware, getCurrentUser);
  app.put('/api/auth/onboarding', authMiddleware, completeOnboarding);
  app.post('/api/auth/logout', logout);

  
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
