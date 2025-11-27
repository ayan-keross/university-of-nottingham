package com.ikon.uonserver.service;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.ikon.uonserver.event.NotificationEvent;

@Service
public class NotificationService {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    private static final String TOPIC = "user-notifications";

    public void sendProjectMovedNotification(
            String projectIdentifier,
            String message,
            String eventType,
            String createdBy,
            List<String> targetUsers,
            List<String> targetRoles,
            Map<String, Object> additionalData) {

        // ---- Build Entity Info ----
        NotificationEvent.EntityInfo entity = new NotificationEvent.EntityInfo();
        entity.setEntityType("PROJECT");
        entity.setId(projectIdentifier);
        entity.setName(message); // You can replace with project name if needed

        // ---- Build Target Info ----
        NotificationEvent.TargetInfo targets = new NotificationEvent.TargetInfo();
        targets.setUsers(targetUsers);
        targets.setRoles(targetRoles);

        // ---- Build Notification Event ----
        NotificationEvent event = new NotificationEvent();
        event.setEventId("evt_" + System.currentTimeMillis());
        event.setEventType(eventType); // e.g. PROJECT_DEMAND_SENT
        event.setNotificationType("SYSTEM"); // static for now
        event.setEntity(entity);
        event.setData(additionalData); // dynamic payload
        event.setCreatedBy(createdBy);
        event.setTargets(targets);
        event.setTimestamp(Instant.now()); // ISO timestamp

        // ---- Send to Kafka ----
        kafkaTemplate.send(TOPIC, event.getEventId(), event)
                .whenComplete((result, ex) -> {
                    if (ex == null) {
                        System.out.println("✅ Kafka message sent successfully!");
                    } else {
                        System.err.println("❌ Kafka send failed: " + ex.getMessage());
                    }
                });
    }
}
