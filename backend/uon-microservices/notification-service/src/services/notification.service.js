import NotificationModel from "../models/Notification.model.js";

export async function saveNotificationToDB(userId, notification) {
  await NotificationModel.create({
    ...notification,
    userId,
  });

  console.log(`💾 Notification saved for user ${userId}`);
}

