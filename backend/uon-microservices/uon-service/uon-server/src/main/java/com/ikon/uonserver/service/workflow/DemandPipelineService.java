package com.ikon.uonserver.service.workflow;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ikon.uonserver.event.NotificationEvent;
import com.ikon.uonserver.exception.ResourceNotFoundException;
import com.ikon.uonserver.model.DemandProject;
import com.ikon.uonserver.model.PipelineProject;
import com.ikon.uonserver.service.DemandProjectService;
import com.ikon.uonserver.service.NotificationService;
import com.ikon.uonserver.service.PipelineProjectService;

@Service
public class DemandPipelineService {
    @Autowired
    private DemandProjectService demandProjectService;

    @Autowired
    private PipelineProjectService pipelineProjectService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private NotificationService notificationService;

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
        // throw new IllegalStateException("dummy error");
        // }

        DemandProject updatedDemandProject = demandProjectService.updateDemandProject(
                projectIdentifier, Map.of("projectStatus", "pipeline"));

        // 🔥 Send notification using your new NotificationService
        List<String> targetUsers = List.of("admin1");
        List<String> targetRoles = List.of("UON SYSTEM ADMIN","UON-FINANCE-MANAGER");
        Map<String,Object> additionalData = Map.of("status", "DEMAND_SUBMITTED");
        notificationService.sendProjectMovedNotification(
                projectIdentifier,
                "Demand Project moved to pipeline successfully.",
                "PROJECT_DEMAND_SENT",
                "system", // or logged user
                targetUsers, // target users
                targetRoles, // target roles
                additionalData // custom dynamic data
        );

        return updatedDemandProject;
    }
}
