package com.ikon.uonserver.event;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationEvent {

    private String eventId;
    private String eventType;
    private String notificationType;

    private EntityInfo entity; // nested object

    private Map<String, Object> data; // dynamic payload

    private String createdBy;

    private TargetInfo targets; // nested object

    private Instant timestamp; // ISO timestamp

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EntityInfo {
        private String entityType;
        private String id;
        private String name;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TargetInfo {
        private List<String> users;
        private List<String> roles;
    }
}
