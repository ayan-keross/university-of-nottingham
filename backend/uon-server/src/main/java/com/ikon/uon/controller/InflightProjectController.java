package com.ikon.uon.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ikon.uon.model.InflightProject;
import com.ikon.uon.service.InflightProjectService;

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
}
