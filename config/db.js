import mongoose from 'mongoose';

export const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connect to the Database`);
};
