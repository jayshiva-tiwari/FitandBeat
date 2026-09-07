import mongoose from 'mongoose';
import { User } from './server/models/User.js';

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected.");
    const user = await User.findOne({});
    console.log("User:", user);
    process.exit(0);
  } catch (err) {
    console.error("Err:", err);
    process.exit(1);
  }
})();
