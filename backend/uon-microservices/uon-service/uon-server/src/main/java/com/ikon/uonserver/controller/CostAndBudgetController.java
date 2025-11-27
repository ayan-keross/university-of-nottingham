package com.ikon.uonserver.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikon.uonserver.model.CostAndBudget;
import com.ikon.uonserver.service.CostAndBudgetService;

@RestController
@RequestMapping("api/v1/cost-budget")
public class CostAndBudgetController {
    @Autowired
    CostAndBudgetService costAndBudgetService;

    @GetMapping({"/",""})
    public List<CostAndBudget> getAllCostAndBudget(){
        return costAndBudgetService.getAllCostAndBudget();
    }

    @GetMapping("/{projectIdentifier}")
    public CostAndBudget getCostAndBudgetByProjectIdentifier(@PathVariable String projectIdentifier){
        return costAndBudgetService.getCostAndBudgetByProjectIdentifier(projectIdentifier);
    }

    @PutMapping("/cost-worksheet/{projectIdentifier}")
    public CostAndBudget updateCostWorksheetByProjectIdentifier(@PathVariable String projectIdentifier, @RequestBody List<Map<String,Object>> costWorksheetDetails){
        return costAndBudgetService.updateCostWorksheetByProjectIdentifier(projectIdentifier,costWorksheetDetails);
    }

    @PutMapping("/funding/{projectIdentifier}")
    public CostAndBudget updateFundingByProjectIdentifier(@PathVariable String projectIdentifier, @RequestBody List<Map<String,Object>> fundingDetails){
        return costAndBudgetService.updateFundingByProjectIdentifier(projectIdentifier,fundingDetails);
    }

    @PutMapping("/actual/{projectIdentifier}")
    public CostAndBudget updateActualByProjectIdentifier(@PathVariable String projectIdentifier, @RequestBody Map<String,Map<String,List<Object>>> actualDetails){
        return costAndBudgetService.updateActualByProjectIdentifier(projectIdentifier,actualDetails);
    }
}
