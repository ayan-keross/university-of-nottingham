import { kafka } from "../config/kafka.js";
import { handleProjectEvents } from "../event/handlers/projectEventHandler.js";

const consumer = kafka.consumer({ groupId: "notification-consumers" });

export async function startConsumer() {
  await consumer.connect();
  console.log("Kafka consumer connected");

  await consumer.subscribe({
    topic: "user-notifications",
    fromBeginning: false
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const value = message.value.toString();
        const event = JSON.parse(value);

        console.log("📩 Received Notification Event:");
        console.log(JSON.stringify(event, null, 2));

        // -------------------------------------
        // 🔥 Process event here
        // Example:
        //    - Save in DB
        //    - Send Email
        //    - Send Push Notification
        //    - Send WebSocket update
        // -------------------------------------
        await handleProjectEvents(event);
        
        
        // Example processing:
        console.log(`➡️ Event Type: ${event.eventType}`);
        console.log(`➡️ For Entity: ${event.entity.type} (${event.entity.id})`);

      } catch (err) {
        console.error("❌ Error processing Kafka message:", err);
      }
    }
  });
}

