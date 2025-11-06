package com.ikon.uon.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikon.uon.model.InflightProject;
import com.ikon.uon.repository.InflightProjectRepository;

import tools.jackson.databind.ObjectMapper;

@Service
public class InflightProjectService {
    @Autowired
    InflightProjectRepository inflightProjectRepository;

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

        return inflightProjectRepository.save(inflightProject);
    }
}
