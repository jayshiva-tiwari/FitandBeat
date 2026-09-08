import express from 'express';
import { resolve } from 'path';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import next from 'next';
import { verifyGoogleAuth, getCurrentUser, completeOnboarding, authMiddleware, logout } from './server/controllers/authController';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

async function createServer() {
  await nextApp.prepare();
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

  app.use('/api/auth', express.json());
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

  // Next.js handles all other routes
  app.all('*', (req, res) => {
    return handle(req, res);
  });
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

createServer();
