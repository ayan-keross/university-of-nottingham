import dotenv from "dotenv";
import app from "./app.js";
import { startEureka } from "./config/eureka.js";
import { startConsumer } from "./kafka/consumer.js";
import { connectDB } from "./config/mongodb.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
async function startServer() {
  try {
    // 1️⃣ Connect Database
    await connectDB(process.env.MONGODB_URI);
    console.log("🟢 Database Connected");

    // 3️⃣ Start Node Server
    app.listen(process.env.PORT, async() => {
      console.log(`🚀 Notification-Service running on ${PORT}`);
      startEureka();
      // 2️⃣ Start Kafka Consumer only after DB ready
      await startConsumer();
      console.log("🟢 Kafka Consumer Started");
    });

  } catch (error) {
    console.error("❌ Failed to start service:", error);
    process.exit(1);
  }
}

await startServer();

