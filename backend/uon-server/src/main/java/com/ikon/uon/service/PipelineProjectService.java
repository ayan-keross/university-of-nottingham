package com.ikon.uon.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
