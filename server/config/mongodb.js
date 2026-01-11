import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log(" Database connected successfully");

    mongoose.connection.on("error", (err) => {
      console.error(" MongoDB error:", err);
    });

  } catch (error) {
    console.error(" Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
