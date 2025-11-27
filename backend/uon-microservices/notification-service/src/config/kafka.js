import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"],  // your Kafka broker
  ssl: false,   // TEMP: keep false unless you use SSL
});
