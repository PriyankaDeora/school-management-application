import mongoose from "mongoose";

export const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI2);
    console.log("Connected to Mongodb");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};