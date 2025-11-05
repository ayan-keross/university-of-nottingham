package com.ikon.uon.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ikon.uon.model.DemandProject;
import com.ikon.uon.service.DemandProjectService;
import com.ikon.uon.service.workflow.DemandPipelineService;

@RestController
@RequestMapping("/api/v1/demand-projects")
public class DemandProjectController {

    @Autowired
    DemandProjectService demandProjectService;

    @Autowired
    DemandPipelineService demandPipelineService;

    // fetch all demand projects
    @GetMapping({"","/"})
    public List<DemandProject> getDemandProjects(@RequestParam(required = false) String status) {
        if (status != null) {
            // status - active/archive
            return demandProjectService.getDemandProjectsByStatus(status);
        } else {
            return demandProjectService.getAllDemandProjects();
        }
    }
    
    // fetch a demand project by its project identifier
    @GetMapping("/{projectIdentifier}")
    public DemandProject getDemandProjectById(
            @PathVariable String projectIdentifier) {

        return demandProjectService.getDemandProjectByProjectIdentifier(projectIdentifier);
    }

    // create a new demand project
    @PostMapping("/")
    public DemandProject createDemandProject(@RequestBody Map<String, Object> demandProjectData) {
        return demandProjectService.createDemandProject(demandProjectData);
    }

    // update an existing demand project
    @PutMapping("/{projectIdentifier}")
    public DemandProject updateDemandProject(
            @PathVariable String projectIdentifier,
            @RequestBody Map<String, Object> demandProjectData) {

        return demandProjectService.updateDemandProject(projectIdentifier, demandProjectData);
    }

    // mark status archive
    @PatchMapping("/{projectIdentifier}/deactivate")
    public DemandProject deactivateDemandProject(
            @PathVariable String projectIdentifier) {

        return demandProjectService.updateDemandProject(projectIdentifier,
                Map.of("status", "archive"));
    }

    // mark status active
    @PatchMapping("/{projectIdentifier}/activate")
    public DemandProject activateDemandProject(
            @PathVariable String projectIdentifier) {

        return demandProjectService.updateDemandProject(projectIdentifier,
                Map.of("status", "active"));
    }

    // send demand project to pipeline
    // mark projectStatus pipeline
    @PatchMapping("/{projectIdentifier}/send-to-pipeline")
    public DemandProject sendToPipeline(
            @PathVariable String projectIdentifier) {
        return demandPipelineService.sendToPipeline(projectIdentifier);
    }
}
