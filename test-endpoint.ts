import { User } from './server/models/User.js';
import mongoose from 'mongoose';

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const user = await User.findOne({});
    console.log("Found:", user);
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();
