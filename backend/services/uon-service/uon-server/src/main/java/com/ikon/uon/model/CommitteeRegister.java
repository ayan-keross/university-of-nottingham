package com.ikon.uon.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Data;

@Document("committee_register")
@Data
public class CommitteeRegister {
    @Id
    private String id;

    private String projectIdentifier;
    private List<Map<String,Object>> committeePlanningList;
    private List<Map<String,Object>> committeeHistoryList;

    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
