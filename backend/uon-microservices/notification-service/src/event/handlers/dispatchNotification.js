import { saveNotificationToDB } from "../../services/notification.service.js";
import { notifyRole, notifyUser } from "../../utils/notificationUtils.js";

export async function dispatchNotification(targets, notification) {

  // 1. Notify specific users
  if (targets.users && targets.users.length > 0) {
    for (const userId of targets.users) {
      await notifyUser(userId, notification);
      await saveNotificationToDB(userId, notification);
    }
  }

  // 2. Notify all users having the role
  if (targets.roles && targets.roles.length > 0) {
    for (const role of targets.roles) {
      const users = await notifyRole(role, notification);
      for (const userId of users) {
        await saveNotificationToDB(userId, notification);
      }
    }
  }

  /*// 3. Real-time Socket.io push
  if (global.io) {
    io.emit("notification", notification);
  }

  // 4. If email notification required
  if (notification.notificationType === "EMAIL") {
    await sendEmail(notification);
  }*/
}
