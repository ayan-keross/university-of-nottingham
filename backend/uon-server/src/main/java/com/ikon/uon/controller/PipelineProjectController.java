package com.ikon.uon.controller;

import java.util.List;
import java.util.Map;

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

import com.ikon.uon.service.PipelineProjectService;
import com.ikon.uon.model.PipelineProject;

@RestController
@RequestMapping("api/v1/pipeline-projects")
public class PipelineProjectController {
    @Autowired
    PipelineProjectService pipelineProjectService;

    @GetMapping({"","/"})
    public List<PipelineProject> getPipelineProjects(@RequestParam(required= false) String status){
        if(status != null){
            return pipelineProjectService.getPipelineProjectsByStatus(status);
        }else{
            return pipelineProjectService.getAllPipelineProjects();
        }
    }

    @GetMapping("/{projectIdentifier}")
    public PipelineProject getPipelineProjectByProjectIdentifier(@PathVariable String projectIdentifier){
        return pipelineProjectService.getPipelineProjectByProjectIdentifier(projectIdentifier);
    }

    @PostMapping("/")
    public PipelineProject createPipelineProject(@RequestBody Map<String,Object> pipelineProject){
        return pipelineProjectService.createPipelineProject(pipelineProject,false);
    }

    @PutMapping("/{projectIdentifier}")
    public PipelineProject updatePipelineProject(@PathVariable String projectIdentifier,@RequestBody Map<String,Object> pipelineProjectData){
        return pipelineProjectService.updatePipelineProject(projectIdentifier, pipelineProjectData);
    }

    @PatchMapping("/{projectIdentifier}/assign-project-managers")
    public PipelineProject assignProjectManagers(@PathVariable String projectIdentifier,@RequestBody List<String> projectManagerList){
        return pipelineProjectService.assignProjectManagers(projectIdentifier,projectManagerList);
    }

    @PatchMapping("/{projectIdentifier}/assign-business-partners")
    public PipelineProject assignBusinessPartners(@PathVariable String projectIdentifier,@RequestBody List<String> businessPartnerList){
        return pipelineProjectService.assignBusinessPartners(projectIdentifier,businessPartnerList);
    }

    // mark status archive
    @PatchMapping("/{projectIdentifier}/deactivate")
    public PipelineProject deactivatePipelineProject(
            @PathVariable String projectIdentifier) {

        return pipelineProjectService.updatePipelineProject(projectIdentifier,
                Map.of("status", "archive"));
    }

    // mark status active
    @PatchMapping("/{projectIdentifier}/activate")
    public PipelineProject activatePipelineProject(
            @PathVariable String projectIdentifier) {

        return pipelineProjectService.updatePipelineProject(projectIdentifier,
                Map.of("status", "active"));
    }

    // send pipeline project to director-approval
    // mark projectStatus directorApproval
    @PatchMapping("/{projectIdentifier}/send-to-director-approval")
    public PipelineProject sendToDirectorApproval(
            @PathVariable String projectIdentifier) {
        return pipelineProjectService.sendToDirectorApproval(projectIdentifier);
    }

    // send directorApproval project to pipeline
    // mark projectStatus pipeline
    @PatchMapping("/{projectIdentifier}/send-back-to-pipeline")
    public PipelineProject sendBackToPipeline(
            @PathVariable String projectIdentifier) {
        return pipelineProjectService.sendBackToPipeline(projectIdentifier);
    }
}
