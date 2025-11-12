package com.ikon.uon.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikon.uon.model.CostAndBudget;
import com.ikon.uon.repository.CostAndBudgetRepository;

@Service
public class CostAndBudgetService {
    @Autowired
    CostAndBudgetRepository costAndBudgetRepository;

    public List<CostAndBudget> getAllCostAndBudget(){
        return costAndBudgetRepository.findAll();
    }
    
    public CostAndBudget getCostAndBudgetByProjectIdentifier(String projectIdentifier){
        return costAndBudgetRepository.findByProjectIdentifier(projectIdentifier);
    }

    public CostAndBudget createCostAndBudget(String projectIdentifier){
        // Check if one already exists for this project
        CostAndBudget existing = costAndBudgetRepository.findByProjectIdentifier(projectIdentifier);
        if (existing!=null) {
            throw new IllegalStateException("Cost and Budget already found: " + projectIdentifier);
        }

        CostAndBudget costAndBudget = new CostAndBudget();
        costAndBudget.setProjectIdentifier(projectIdentifier);
        costAndBudget.setCostIdentifier(UUID.randomUUID().toString());

        // Initialize default empty structures
        costAndBudget.setActualDetails(new HashMap<>());
        costAndBudget.setCostWorksheetDetails(new ArrayList<>());
        costAndBudget.setCashflowForecastDetails(new HashMap<>());
        costAndBudget.setFundingDetails(new ArrayList<>());
        costAndBudget.setTotalProjectSpendDetails(new ArrayList<>());

        costAndBudget.setCreatedAt(LocalDateTime.now());
        costAndBudget.setUpdatedAt(LocalDateTime.now());
        costAndBudget.setCreatedBy("System");
        costAndBudget.setUpdatedBy("System");

        // Save to MongoDB
        return costAndBudgetRepository.save(costAndBudget);
    }

    public CostAndBudget updateCostWorksheetByProjectIdentifier(String projectIdentifier, List<Map<String,Object>> costWorksheetDetails) {
        CostAndBudget costAndBudget = costAndBudgetRepository.findByProjectIdentifier(projectIdentifier);
        if (costAndBudget == null) {
            throw new IllegalStateException("Cost and Budget not found: " + projectIdentifier);
        }

        // Update fields
        costAndBudget.setCostWorksheetDetails(costWorksheetDetails);

        costAndBudget.setUpdatedAt(LocalDateTime.now());
        costAndBudget.setUpdatedBy("System");

        return costAndBudgetRepository.save(costAndBudget);
    }

    public CostAndBudget updateActualByProjectIdentifier(String projectIdentifier, Map<String,Map<String,List<Object>>> actualDetails){
        CostAndBudget costAndBudget = costAndBudgetRepository.findByProjectIdentifier(projectIdentifier);
        if (costAndBudget == null) {
            throw new IllegalStateException("Cost and Budget not found: " + projectIdentifier);
        }

        // Update fields
        costAndBudget.setActualDetails(actualDetails);

        costAndBudget.setUpdatedAt(LocalDateTime.now());
        costAndBudget.setUpdatedBy("System");

        return costAndBudgetRepository.save(costAndBudget);
    }

    public CostAndBudget updateFundingByProjectIdentifier(String projectIdentifier, List<Map<String,Object>> fundingDetails){
        CostAndBudget costAndBudget = costAndBudgetRepository.findByProjectIdentifier(projectIdentifier);
        if (costAndBudget == null) {
            throw new IllegalStateException("Cost and Budget not found: " + projectIdentifier);
        }

        // Update fields
        costAndBudget.setFundingDetails(fundingDetails);

        costAndBudget.setUpdatedAt(LocalDateTime.now());
        costAndBudget.setUpdatedBy("System");

        return costAndBudgetRepository.save(costAndBudget);
    }

}
