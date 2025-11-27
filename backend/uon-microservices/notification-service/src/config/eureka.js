import { Eureka } from "eureka-js-client";
import dotenv from "dotenv";

dotenv.config();

const client = new Eureka({
  instance: {
    app: process.env.SERVICE_NAME.toUpperCase(),
    hostName: "127.0.0.1",
    ipAddr: "127.0.0.1",
    statusPageUrl: `http://localhost:${process.env.PORT}`,
    port: {
      $: parseInt(process.env.PORT),
      "@enabled": "true",
    },
    vipAddress: process.env.SERVICE_NAME,
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn",
    },
    leaseInfo: {
      renewalIntervalInSecs: 10,     // Heartbeat every 10 sec
      durationInSecs: 60             // Remove after 20 sec of no heartbeat
    }
  },
  eureka: {
    host: "localhost",
    port: 8761,
    servicePath: "/eureka/apps/",
  },
});

export const startEureka = () => {
  client.start((error) => {
    if (error) {
      console.error("❌ Failed to register with Eureka:", error);
    } else {
      console.log("✅ Registered with Eureka successfully");
    }
  });
};
