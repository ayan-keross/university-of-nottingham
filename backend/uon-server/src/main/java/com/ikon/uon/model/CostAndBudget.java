package com.ikon.uon.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "cost_budget")
@Data
public class CostAndBudget {
    @Id
    private String id;

    private String projectIdentifier;
    private String costIdentifier;
    private Map<String,Map<String,List<Object>>> actualDetails;
    private List<Map<String,Object>> costWorksheetDetails;
    private Map<String,Object> cashflowForecastDetails;
    private List<Map<String,Object>> fundingDetails;
    private List<Map<String,Object>> totalProjectSpendDetails;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
}
