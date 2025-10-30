package com.ikon.uon.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikon.uon.model.DemandProject;
import com.ikon.uon.repository.DemandProjectRepository;

import tools.jackson.databind.ObjectMapper;

@Service

public class DemandProjectService {

    @Autowired
    DemandProjectRepository demandProjectRepository;

    @Autowired
    ObjectMapper objectMapper;

    public List<DemandProject> getAllDemandProjects() {
        return demandProjectRepository.findAll();
    }

    public DemandProject getDemandProjectByProjectIdentifier(String id) {
        DemandProject demandProject = demandProjectRepository.findByProjectIdentifier(id);
        if (demandProject != null) {
            return demandProject;
        } else {
            return new DemandProject();
        }
    }

    public List<DemandProject> getDemandProjectsByStatus(String projectStatus) {
        List<DemandProject> allProjects = demandProjectRepository.findAll();
        return allProjects.stream()
                .filter(project -> projectStatus.equals(project.getProjectStatus()))
                .toList();
    }

    public DemandProject createDemandProject(Map<String, Object> demandProjectData) {
        DemandProject demandProject = objectMapper.convertValue(demandProjectData, DemandProject.class);

        demandProject.setProjectIdentifier(UUID.randomUUID().toString());
        demandProject.setProjectId("DP-" + System.currentTimeMillis());
        demandProject.setCreatedAt(LocalDateTime.now());
        demandProject.setUpdatedAt(LocalDateTime.now());
        demandProject.setProjectStatus("active");
        demandProject.setCreatedBy("System");
        demandProject.setUpdatedBy("System");

        return demandProjectRepository.save(demandProject);
    }

    public DemandProject updateDemandProject(String projectIdentifier, Map<String, Object> demandProjectData) {
        DemandProject existingProject = demandProjectRepository.findByProjectIdentifier(projectIdentifier);
        if (existingProject == null) {
            return null;
        }

        Map<String, Object> existingData = objectMapper.convertValue(existingProject,Map.class);
        existingData.putAll(demandProjectData);
        DemandProject updatedProject = objectMapper.convertValue(existingData, DemandProject.class);

        updatedProject.setUpdatedAt(LocalDateTime.now());
        updatedProject.setUpdatedBy("System");

        return demandProjectRepository.save(updatedProject);
    }
}
