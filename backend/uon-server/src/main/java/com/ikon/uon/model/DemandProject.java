package com.ikon.uon.model;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "demand_projects")
@Data
public class DemandProject {
    @Id
    private String id;

    private UUID project_identifier;
    private String projectId;
    private String oldProjectId;
    private String projectName;
    private String projectDescription;
    private String projectStatus;
    private UUID assetIdentifier;
    private LocalDateTime requestedDate;
    private Integer estimatedGrossBudget;
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
