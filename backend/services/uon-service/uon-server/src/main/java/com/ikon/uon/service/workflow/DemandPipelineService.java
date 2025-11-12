package com.ikon.uon.service.workflow;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ikon.uon.exception.ResourceNotFoundException;
import com.ikon.uon.model.DemandProject;
import com.ikon.uon.model.PipelineProject;
import com.ikon.uon.service.DemandProjectService;
import com.ikon.uon.service.PipelineProjectService;

import tools.jackson.databind.ObjectMapper;

@Service
public class DemandPipelineService {
    @Autowired
    private DemandProjectService demandProjectService;

    @Autowired
    private PipelineProjectService pipelineProjectService;

    @Autowired
    private ObjectMapper objectMapper;

    @Transactional
    public DemandProject sendToPipeline(String projectIdentifier) {

        DemandProject existing = demandProjectService.getDemandProjectByProjectIdentifier(projectIdentifier);
        if (existing == null) {
            throw new ResourceNotFoundException("Demand project not found: " + projectIdentifier);
        }

        if ("pipeline".equalsIgnoreCase(existing.getProjectStatus())) {
            throw new IllegalStateException("Project already in pipeline");
        }

        // Convert demand project to map or DTO
        Map<String, Object> demandProjectMap = objectMapper.convertValue(existing, Map.class);

        PipelineProject pipeline = pipelineProjectService.createPipelineProject(demandProjectMap, true);
        if (pipeline == null) {
            throw new IllegalStateException("Pipeline project creation failed");
        }
        // if(true){
        //     throw new IllegalStateException("dummy error");
        // }

        return demandProjectService.updateDemandProject(
                projectIdentifier, Map.of("projectStatus", "pipeline"));
    }
}
