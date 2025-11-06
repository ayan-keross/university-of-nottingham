package com.ikon.uon.service.workflow;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ikon.uon.exception.ResourceNotFoundException;
import com.ikon.uon.model.InflightProject;
import com.ikon.uon.model.PipelineProject;
import com.ikon.uon.service.InflightProjectService;
import com.ikon.uon.service.PipelineProjectService;

import tools.jackson.databind.ObjectMapper;

@Service
public class PipelineInflightService {
    @Autowired
    private PipelineProjectService pipelineProjectService;

    @Autowired
    private InflightProjectService inflightProjectService;

    @Autowired
    private ObjectMapper objectMapper;

    @Transactional
    public PipelineProject sendToInflight(String projectIdentifier) {

        PipelineProject existing = pipelineProjectService.getPipelineProjectByProjectIdentifier(projectIdentifier);
        if (existing == null) {
            throw new ResourceNotFoundException("Director Approval project not found: " + projectIdentifier);
        }

        if ("inflight".equalsIgnoreCase(existing.getProjectStatus())) {
            throw new IllegalStateException("Project already in inflight");
        }

        // Convert demand project to map or DTO
        Map<String, Object> pipelineProjectMap = objectMapper.convertValue(existing, Map.class);

        InflightProject inflight = inflightProjectService.createInflightProject(pipelineProjectMap, true);
        if (inflight == null) {
            throw new IllegalStateException("Inflight project creation failed");
        }
        
        return pipelineProjectService.updatePipelineProject(
                projectIdentifier, Map.of("projectStatus", "inflight"));
    }
}
