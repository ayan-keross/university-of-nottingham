import { dispatchNotification } from "./dispatchNotification.js";

export async function handleProjectEvents(event) {
  console.log("📌 Processing Project Event:", event.eventType);

  const {eventId, eventType, entity, data, createdBy, targets, notificationType, timestamp} = event;

  // Reusable notification message builder
  const notification = {
    eventId,
    eventType,
    notificationType,

    entity: {
      type: entity.type,
      id: entity.id,
      name: entity.name,
    },

    data: data || {},

    createdBy,
    targets: {
      users: targets?.users || [],
      roles: targets?.roles || [],
    },

    timestamp: timestamp || new Date(),

    // additional fields from schema
    status: "pending",
    readBy: [],
  };

  await dispatchNotification(targets, notification);
 console.log("✅ Project event handled:", event.eventType);
}
