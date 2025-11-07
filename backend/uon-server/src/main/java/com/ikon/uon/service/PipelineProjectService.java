package com.ikon.uon.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikon.uon.exception.ResourceNotFoundException;
import com.ikon.uon.model.DemandProject;
import com.ikon.uon.model.PipelineProject;
import com.ikon.uon.repository.PipelineProjectRepository;

import tools.jackson.databind.ObjectMapper;

@Service
public class PipelineProjectService {
    @Autowired
    PipelineProjectRepository pipelineProjectRepository;
    @Autowired
    ObjectMapper objectMapper;

    public List<PipelineProject> getAllPipelineProjects(){
        return pipelineProjectRepository.findAll();
    }
    public PipelineProject getPipelineProjectByProjectIdentifier(String projectIdentifier){
        return pipelineProjectRepository.findByProjectIdentifier(projectIdentifier);
    }
    public List<PipelineProject> getPipelineProjectsByStatus(String status){
        return pipelineProjectRepository.findByStatus(status);
    }
    public PipelineProject createPipelineProject(Map<String,Object> pipelineProjectData, boolean fromDemand){
        PipelineProject pipelineProject = objectMapper.convertValue(pipelineProjectData, PipelineProject.class);
        if(!fromDemand){
            pipelineProject.setProjectIdentifier(UUID.randomUUID().toString());
        
            pipelineProject.setProjectId("PP-" + System.currentTimeMillis());
        }
        
        pipelineProject.setStatus("active");
        pipelineProject.setProjectStatus("pipeline");

        pipelineProject.setCreatedAt(LocalDateTime.now());
        pipelineProject.setUpdatedAt(LocalDateTime.now());
        pipelineProject.setCreatedBy("System");
        pipelineProject.setUpdatedBy("System");

        return pipelineProjectRepository.save(pipelineProject);

    }

    public PipelineProject updatePipelineProject(String projectIdentifier, Map<String, Object> pipelineProjectData) {
        PipelineProject existingProject = pipelineProjectRepository.findByProjectIdentifier(projectIdentifier);
        if (existingProject == null) {
            return null;
        }

        Map<String, Object> existingData = objectMapper.convertValue(existingProject,Map.class);
        existingData.putAll(pipelineProjectData);
        PipelineProject updatedProject = objectMapper.convertValue(existingData, PipelineProject.class);

        updatedProject.setUpdatedAt(LocalDateTime.now());
        updatedProject.setUpdatedBy("System");

        return pipelineProjectRepository.save(updatedProject);
    }
    public PipelineProject assignProjectManagers(String projectIdentifier, List<String> projectManagerList){
        PipelineProject existingProject = pipelineProjectRepository.findByProjectIdentifier(projectIdentifier);
        if(existingProject == null){
            throw new ResourceNotFoundException("Pipeline project not found: "+ projectIdentifier);
        }
        existingProject.setProjectManagerList(projectManagerList);
        existingProject.setUpdatedBy("System");
        existingProject.setUpdatedAt(LocalDateTime.now());
        return pipelineProjectRepository.save(existingProject);
    }

    public PipelineProject assignBusinessPartners(String projectIdentifier, List<String> businessPartnerList){
        PipelineProject existingProject = pipelineProjectRepository.findByProjectIdentifier(projectIdentifier);
        if(existingProject == null){
            throw new ResourceNotFoundException("Pipeline project not found: "+ projectIdentifier);
        }
        existingProject.setBusinessPartnerList(businessPartnerList);
        existingProject.setUpdatedBy("System");
        existingProject.setUpdatedAt(LocalDateTime.now());
        return pipelineProjectRepository.save(existingProject);
    }

    public PipelineProject sendToDirectorApproval(String projectIdentifier){
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

    public PipelineProject sendToInflight(String projectIdentifier){
        PipelineProject existingProject = pipelineProjectRepository.findByProjectIdentifier(projectIdentifier);
        if (existingProject == null) {
            throw new ResourceNotFoundException("Director Approval project not found: " + projectIdentifier);
        }

        if ("inflight".equalsIgnoreCase(existingProject.getProjectStatus())) {
            throw new IllegalStateException("Project already in inflight");
        }

        existingProject.setProjectStatus("inflight");
        existingProject.setUpdatedAt(LocalDateTime.now());
        existingProject.setUpdatedBy("System");
        return pipelineProjectRepository.save(existingProject);
    }
}
