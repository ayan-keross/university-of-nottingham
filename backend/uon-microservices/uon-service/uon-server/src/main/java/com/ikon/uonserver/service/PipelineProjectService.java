package com.ikon.uonserver.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ikon.uonserver.exception.ResourceNotFoundException;
import com.ikon.uonserver.model.PipelineProject;
import com.ikon.uonserver.repository.PipelineProjectRepository;

@Service
public class PipelineProjectService {
    @Autowired
    PipelineProjectRepository pipelineProjectRepository;

    @Autowired
    CommitteeRegisterService committeeRegisterService;

    @Autowired
    ObjectMapper objectMapper;

    public List<PipelineProject> getAllPipelineProjects() {
        return pipelineProjectRepository.findAll();
    }

    public PipelineProject getPipelineProjectByProjectIdentifier(String projectIdentifier) {
        return pipelineProjectRepository.findByProjectIdentifier(projectIdentifier);
    }

    public List<PipelineProject> getPipelineProjectsByStatus(String status) {
        return pipelineProjectRepository.findByStatus(status);
    }

    @Transactional
    public PipelineProject createPipelineProject(Map<String, Object> pipelineProjectData, boolean fromDemand) {
        PipelineProject pipelineProject = objectMapper.convertValue(pipelineProjectData, PipelineProject.class);
        if (!fromDemand) {
            pipelineProject.setProjectIdentifier(UUID.randomUUID().toString());

            pipelineProject.setProjectId("PP-" + System.currentTimeMillis());
        }
        if (fromDemand) {
            pipelineProject.setProjectManagerList(new ArrayList<>());
            pipelineProject.setBusinessPartnerList(new ArrayList<>());
            pipelineProject.setEstimatedGrossBudgetDetails(new ArrayList<>());
            pipelineProject.setFundingRequestDetails(new ArrayList<>());
            pipelineProject.setBaselineScheduleDetails(new HashMap<>());
        }else{
            if (pipelineProject.getProjectManagerList() == null) {
                pipelineProject.setProjectManagerList(new ArrayList<>());
            }
            if (pipelineProject.getBusinessPartnerList() == null) {
                pipelineProject.setBusinessPartnerList(new ArrayList<>());
            }
            if (pipelineProject.getEstimatedGrossBudgetDetails() == null) {
                pipelineProject.setEstimatedGrossBudgetDetails(new ArrayList<>());
            }
            if (pipelineProject.getFundingRequestDetails() == null) {
                pipelineProject.setFundingRequestDetails(new ArrayList<>());
            }
            if (pipelineProject.getBaselineScheduleDetails() == null) {
                pipelineProject.setBaselineScheduleDetails(new HashMap<>());
            }
        }

        pipelineProject.setStatus("active");
        pipelineProject.setProjectStatus("pipeline");

        pipelineProject.setCreatedAt(LocalDateTime.now());
        pipelineProject.setUpdatedAt(LocalDateTime.now());
        pipelineProject.setCreatedBy("System");
        pipelineProject.setUpdatedBy("System");

        // Initialize committee register
        try {
            committeeRegisterService.createCommitteeRegister(
                    pipelineProject.getProjectIdentifier(),
                    Map.of(
                            "committeePlanningList", new ArrayList<>(),
                            "committeeHistoryList", new ArrayList<>()));
        } catch (Exception e) {
            throw new IllegalStateException(
                    "Failed to create committee register for project: " + pipelineProject.getProjectIdentifier());
        }
        return pipelineProjectRepository.save(pipelineProject);
    }

    public PipelineProject updatePipelineProject(String projectIdentifier, Map<String, Object> pipelineProjectData) {
        PipelineProject existingProject = pipelineProjectRepository.findByProjectIdentifier(projectIdentifier);
        if (existingProject == null) {
            return null;
        }

        Map<String, Object> existingData = objectMapper.convertValue(existingProject, Map.class);
        existingData.putAll(pipelineProjectData);
        PipelineProject updatedProject = objectMapper.convertValue(existingData, PipelineProject.class);

        updatedProject.setUpdatedAt(LocalDateTime.now());
        updatedProject.setUpdatedBy("System");

        return pipelineProjectRepository.save(updatedProject);
    }

    public PipelineProject assignProjectManagers(String projectIdentifier, List<String> projectManagerList) {
        PipelineProject existingProject = pipelineProjectRepository.findByProjectIdentifier(projectIdentifier);
        if (existingProject == null) {
            throw new ResourceNotFoundException("Pipeline project not found: " + projectIdentifier);
        }
        existingProject.setProjectManagerList(projectManagerList);
        existingProject.setUpdatedBy("System");
        existingProject.setUpdatedAt(LocalDateTime.now());
        return pipelineProjectRepository.save(existingProject);
    }

    public PipelineProject assignBusinessPartners(String projectIdentifier, List<String> businessPartnerList) {
        PipelineProject existingProject = pipelineProjectRepository.findByProjectIdentifier(projectIdentifier);
        if (existingProject == null) {
            throw new ResourceNotFoundException("Pipeline project not found: " + projectIdentifier);
        }
        existingProject.setBusinessPartnerList(businessPartnerList);
        existingProject.setUpdatedBy("System");
        existingProject.setUpdatedAt(LocalDateTime.now());
        return pipelineProjectRepository.save(existingProject);
    }

    public PipelineProject sendToDirectorApproval(String projectIdentifier) {
        PipelineProject existingProject = pipelineProjectRepository.findByProjectIdentifier(projectIdentifier);
        if (existingProject == null) {
            throw new ResourceNotFoundException("Pipeline project not found: " + projectIdentifier);
        }

        if ("directorApproval".equalsIgnoreCase(existingProject.getProjectStatus())) {
            throw new IllegalStateException("Project already in director-approval");
        }

        existingProject.setProjectStatus("directorApproval");
        existingProject.setUpdatedAt(LocalDateTime.now());
        existingProject.setUpdatedBy("System");
        return pipelineProjectRepository.save(existingProject);
    }

    public PipelineProject sendBackToPipeline(String projectIdentifier) {
        PipelineProject existingProject = pipelineProjectRepository.findByProjectIdentifier(projectIdentifier);
        if (existingProject == null) {
            throw new ResourceNotFoundException("Pipeline project not found :" + projectIdentifier);
        }
        if ("pipeline".equalsIgnoreCase(existingProject.getProjectStatus())) {
            throw new IllegalStateException("Project already in pipeline");
        }
        existingProject.setProjectStatus("pipeline");
        existingProject.setUpdatedBy("System");
        existingProject.setUpdatedAt(LocalDateTime.now());
        return pipelineProjectRepository.save(existingProject);
    }

}
