import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  picture?: string;
  googleId?: string;
  authProvider: 'local' | 'google';
  isOnboardingComplete: boolean;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String },
  googleId: { type: String },
  authProvider: { type: String, enum: ['local', 'google'], required: true },
  isOnboardingComplete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>('User', userSchema);

