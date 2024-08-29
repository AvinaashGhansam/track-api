import * as mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI; // Read environment variable
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    await mongoose.connect(mongoUri); // Use the environment variable for MongoDB URI
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
