package com.ikon.uon.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ikon.uon.model.DemandProject;
import com.ikon.uon.service.DemandProjectService;

@RestController
@RequestMapping("/api/v1/demand-projects")
public class DemandProjectController {

    @Autowired
    DemandProjectService demandProjectService;

    // fetch all demand projects
    @GetMapping("/")
    public List<DemandProject> getDemandProjects(@RequestParam(required = false) String status) {
        if (status != null) {
            return demandProjectService.getDemandProjectsByStatus(status);
        } else {
            return demandProjectService.getAllDemandProjects();
        }
    }

    // create a new demand project
    @PostMapping("/")
    public DemandProject createDemandProject(@RequestBody Map<String, Object> demandProjectData) {
        return demandProjectService.createDemandProject(demandProjectData);
    }
    // update an existing demand project
    @PutMapping("/{projectIdentifier}")
    public DemandProject updateDemandProject(
            @PathVariable("projectIdentifier") String project_identifier,
            @RequestBody Map<String, Object> demandProjectData) {

        return demandProjectService.updateDemandProject(project_identifier, demandProjectData);
    }

}
