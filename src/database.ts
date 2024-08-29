import * as mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/testDB");
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
export default connectDB;
