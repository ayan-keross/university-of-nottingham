import express from "express";
import notificationRoutes from "./routes/notification.route.js";
import {errorHandler} from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/api/v1/notifications", notificationRoutes);
app.use(errorHandler);

export default app;
