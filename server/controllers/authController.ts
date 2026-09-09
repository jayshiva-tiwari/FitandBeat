import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '229925102759-7i5onko9abood1l0r1iih5738fvct6a1.apps.googleusercontent.com';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.auth_token;
  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, email: string };
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      isOnboardingComplete: user.isOnboardingComplete
    });
  } catch (error) {
    console.error('completeOnboarding error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

export const completeOnboarding = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    user.isOnboardingComplete = true;
    await user.save();
    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      isOnboardingComplete: user.isOnboardingComplete
    });
  } catch (error) {
    console.error('completeOnboarding error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

export const verifyGoogleAuth = async (req: Request, res: Response): Promise<void> => {
  const { credential } = req.body;
  
  if (!credential) {
    res.status(400).json({ error: 'No credential provided' });
    return;
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    if (!payload) throw new Error('Invalid token payload');
    
    const { sub: googleId, email, name, picture } = payload;
    
    if (!email) {
      res.status(400).json({ error: 'Email not provided by Google' });
      return;
    }

    let user = await User.findOne({ email });
    
    if (user) {
      if (user.authProvider === 'local') {
        user.googleId = googleId;
        user.picture = picture || user.picture;
        await user.save();
      }
    } else {
      user = new User({
        name: name || 'User',
        email,
        picture,
        googleId,
        authProvider: 'google',
        isOnboardingComplete: false,
      });
      await user.save();
    }
    
    const token = jwt.sign(
      { userId: user._id, email: user.email, isOnboardingComplete: user.isOnboardingComplete },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        isOnboardingComplete: user.isOnboardingComplete
      }
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie('auth_token', { sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  res.json({ success: true });
};

