package com.ikon.uon.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "demand_projects")
@Data
public class DemandProject {
    @Id
    private String id;

    private String projectIdentifier;
    private String projectId;
    private String oldProjectId;
    private String projectName;
    private String projectDescription;
    private String status;// e.g.-active/archive
    private String projectStatus; // e.g.-demand/pipeline
    private String assetIdentifier;
    private LocalDate requestedDate;
    private Integer estimatedGrossBudget;
    private String fundingSource;
    
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
