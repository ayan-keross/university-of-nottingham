import mongoose from "mongoose";

export async function connectDB(mongoUri) {
  try {
    const conn = await mongoose.connect(mongoUri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(`🟢 MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("🔴 MongoDB Connection Error:", err);
    process.exit(1); // Stop the service if DB fails
  }
}
