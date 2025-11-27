package com.ikon.uonserver.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ikon.uonserver.exception.ResourceNotFoundException;
import com.ikon.uonserver.model.InflightProject;
import com.ikon.uonserver.repository.InflightProjectRepository;

@Service
public class InflightProjectService {
    @Autowired
    InflightProjectRepository inflightProjectRepository;

    @Autowired
    private CostAndBudgetService costAndBudgetService;

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private ReportService reportService;

    @Autowired
    ObjectMapper objectMapper;

    public List<InflightProject> getAllInflightProjects(){
        return inflightProjectRepository.findAll();
    }

    public List<InflightProject> getInflightProjectsByStatus(String status){
        return inflightProjectRepository.findByStatus(status);
    }

    public InflightProject getInflightProjectByProjectIdentifier(String projectIdentifier){
        return inflightProjectRepository.findByProjectIdentifier(projectIdentifier);
    }

    @Transactional
    public InflightProject createInflightProject(Map<String,Object> inflightProjectData,Boolean fromPipeline){
        InflightProject inflightProject = objectMapper.convertValue(inflightProjectData, InflightProject.class);
        if(!fromPipeline){
            inflightProject.setProjectIdentifier(UUID.randomUUID().toString());
        
            inflightProject.setProjectId("IP-" + System.currentTimeMillis());
        }
        
        inflightProject.setStatus("active");
        inflightProject.setProjectStatus("inflight");

        inflightProject.setCreatedAt(LocalDateTime.now());
        inflightProject.setUpdatedAt(LocalDateTime.now());
        inflightProject.setCreatedBy("System");
        inflightProject.setUpdatedBy("System");

        // 🔹 Initialize related modules (Cost, Schedule, Report)
        try {
            costAndBudgetService.createCostAndBudget(inflightProject.getProjectIdentifier());
            scheduleService.createSchedule(inflightProject.getProjectIdentifier());
            reportService.createReport(inflightProject.getProjectIdentifier());
        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize related modules for inflight project", e);
        }
        
        return inflightProjectRepository.save(inflightProject);
    }

    public InflightProject updateInflightProject(String projectIdentifier, Map<String, Object> inflightProjectData) {
        InflightProject existingProject = inflightProjectRepository.findByProjectIdentifier(projectIdentifier);
        if (existingProject == null) {
            return null;
        }

        Map<String, Object> existingData = objectMapper.convertValue(existingProject,Map.class);
        existingData.putAll(inflightProjectData);
        InflightProject updatedProject = objectMapper.convertValue(existingData, InflightProject.class);

        updatedProject.setUpdatedAt(LocalDateTime.now());
        updatedProject.setUpdatedBy("System");

        return inflightProjectRepository.save(updatedProject);
    }

    public InflightProject assignProjectManagers(String projectIdentifier, List<String> projectManagerList){
        InflightProject existingProject = inflightProjectRepository.findByProjectIdentifier(projectIdentifier);
        if(existingProject == null){
            throw new ResourceNotFoundException("Inflight project not found: "+ projectIdentifier);
        }
        existingProject.setProjectManagerList(projectManagerList);
        existingProject.setUpdatedBy("System");
        existingProject.setUpdatedAt(LocalDateTime.now());
        return inflightProjectRepository.save(existingProject);
    }

    public InflightProject assignBusinessPartners(String projectIdentifier, List<String> businessPartnerList){
        InflightProject existingProject = inflightProjectRepository.findByProjectIdentifier(projectIdentifier);
        if(existingProject == null){
            throw new ResourceNotFoundException("Inflight project not found: "+ projectIdentifier);
        }
        existingProject.setBusinessPartnerList(businessPartnerList);
        existingProject.setUpdatedBy("System");
        existingProject.setUpdatedAt(LocalDateTime.now());
        return inflightProjectRepository.save(existingProject);
    }

    public InflightProject sendToCompletedProject(String projectIdentifier){
        InflightProject existingProject = inflightProjectRepository.findByProjectIdentifier(projectIdentifier);
        if(existingProject == null){
            throw new ResourceNotFoundException("Inflight project not found :"+ projectIdentifier);
        }
        if ("completed".equalsIgnoreCase(existingProject.getProjectStatus())) {
            throw new IllegalStateException("Project already in completed");
        }
        existingProject.setProjectStatus("completed");
        existingProject.setUpdatedBy("System");
        existingProject.setUpdatedAt(LocalDateTime.now());
        return inflightProjectRepository.save(existingProject);
    }

    public InflightProject sendBackToInflight(String projectIdentifier){
        InflightProject existingProject = inflightProjectRepository.findByProjectIdentifier(projectIdentifier);
        if(existingProject == null){
            throw new ResourceNotFoundException("Inflight project not found :"+ projectIdentifier);
        }
        if ("inflight".equalsIgnoreCase(existingProject.getProjectStatus())) {
            throw new IllegalStateException("Project already in inflight");
        }
        existingProject.setProjectStatus("inflight");
        existingProject.setUpdatedBy("System");
        existingProject.setUpdatedAt(LocalDateTime.now());
        return inflightProjectRepository.save(existingProject);
    }
}
