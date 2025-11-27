package com.ikon.uonserver.model;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Data;

@Document(collection = "report")
@Data
public class Report {
    @Id
    private String id;

    private String projectIdentifier;
    private String reportIdentifier;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
}
