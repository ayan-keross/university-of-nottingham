import dotenv from "dotenv";
dotenv.config();

export const config = {
  serviceName: process.env.SERVICE_NAME || "notification-service",
  port: process.env.PORT || 5000,
};
