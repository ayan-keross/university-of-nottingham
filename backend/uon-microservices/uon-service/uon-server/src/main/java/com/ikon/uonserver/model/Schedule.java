package com.ikon.uonserver.model;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Data;

@Document(collection = "schedule")
@Data
public class Schedule {
    @Id
    private String id;

    private String projectIdentifier;
    private String scheduleIdentifier;
    private Map<String,Object> actualScheduleDetails;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
}
