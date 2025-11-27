package com.ikon.uonserver.controller;

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

import com.ikon.uonserver.model.InflightProject;
import com.ikon.uonserver.service.InflightProjectService;

@RestController
@RequestMapping("api/v1/inflight-projects")
public class InflightProjectController {
    @Autowired
    InflightProjectService inflightProjectService;

    @GetMapping({"","/"})
    public List<InflightProject> getAllInflightProjects(@RequestParam(required = false) String status){
        if(status!=null){
            // status - active/archive
            return inflightProjectService.getInflightProjectsByStatus(status);
        }else{
            return inflightProjectService.getAllInflightProjects();
        }
    }

    @GetMapping("/{projectIdentifier}")
    public InflightProject getInflightProjectByProjectIdentifier(@PathVariable String projectIdentifier){
        return inflightProjectService.getInflightProjectByProjectIdentifier(projectIdentifier);
    }

    @PostMapping("/")
    public InflightProject createInflightProject(@RequestBody Map<String,Object> inflightProjectData, Boolean fromPipeline){
        return inflightProjectService.createInflightProject(inflightProjectData,false);
    }

    @PutMapping("/{projectIdentifier}")
    public InflightProject updateInflightProject(@PathVariable String projectIdentifier,@RequestBody Map<String,Object> inflightProjectData){
        return inflightProjectService.updateInflightProject(projectIdentifier, inflightProjectData);
    }

    @PatchMapping("/{projectIdentifier}/assign-project-managers")
    public InflightProject assignProjectManagers(@PathVariable String projectIdentifier,@RequestBody List<String> projectManagerList){
        return inflightProjectService.assignProjectManagers(projectIdentifier,projectManagerList);
    }

    @PatchMapping("/{projectIdentifier}/assign-business-partners")
    public InflightProject assignBusinessPartners(@PathVariable String projectIdentifier,@RequestBody List<String> businessPartnerList){
        return inflightProjectService.assignBusinessPartners(projectIdentifier,businessPartnerList);
    }

    // send inflight project to completed
    // mark projectStatus completed
    @PatchMapping("/{projectIdentifier}/send-to-completed")
    public InflightProject sendToCompleted(
            @PathVariable String projectIdentifier) {
        return inflightProjectService.sendToCompletedProject(projectIdentifier);
    }

    // send completed project to inflight
    // mark projectStatus inflight
    @PatchMapping("/{projectIdentifier}/send-back-to-inflight")
    public InflightProject sendBackToInflight(
            @PathVariable String projectIdentifier) {
        return inflightProjectService.sendBackToInflight(projectIdentifier);
    }
}
