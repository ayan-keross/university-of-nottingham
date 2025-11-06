package com.ikon.uon.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "inflight_projects")
@Data
public class InflightProject {
    @Id
    private String id;
    
    private String projectIdentifier;
    private String projectId;
    private String oldProjectId;
    private String projectName;
    private String projectDescription;
    private String status;// e.g.-active/archive
    private String projectStatus; // e.g.-inflight/completed
    private String assetIdentifier;
    private LocalDate requestedDate;
    private Integer estimatedGrossBudget;
    private String fundingSource;
    private List<String> projectManagerList;
    private List<String> businessPartnerList;
    private List<Map<String, Object>> estimatedGrossBudgetDetails;
    private List<Map<String, Object>> fundingRequestDetails;
    private Map<String, Object> baselineScheduleDetails;
    
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
