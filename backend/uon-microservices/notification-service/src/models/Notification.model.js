import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true }, // from Kafka
    eventType: { type: String, required: true },
    notificationType: { type: String, required: true },

    entity: {
      type: {
        entityType: { type: String, required: true },  // project, asset, user...
        id: { type: String, required: true },
        name: { type: String }
      },
      required: true
    },

    data: {
      type: Object,
      default: {},
      // dynamic payload from main-service
    },

    createdBy: { type: String, required: true },

    targets: {
      users: [{ type: String }],
      roles: [{ type: String }]
    },

    timestamp: { type: Date, default: Date.now },

    // Additional useful fields for notification system:
    status: {
      type: String,
      enum: ["pending", "delivered", "failed"],
      default: "pending"
    },

    readBy: [{ type: String }], // track which users read it
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
