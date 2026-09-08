import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './server/models/User';
dotenv.config();

async function test() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    
    const user = await User.findOne({});
    if (!user) {
      console.log("No user found");
      process.exit(1);
    }
    
    console.log("User found:", user.email);
    user.isOnboardingComplete = true;
    await user.save();
    console.log("Save successful!");
    process.exit(0);
  } catch(e) {
    console.error("Save failed:", e);
    process.exit(1);
  }
}
test();
