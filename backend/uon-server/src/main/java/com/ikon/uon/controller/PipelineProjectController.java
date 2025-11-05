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

    @GetMapping("/{projectIdentifiier}")
    public PipelineProject getPipelineProjectByProjectIdentifier(@PathVariable String projectIdentifier){
        return pipelineProjectService.getPipelineProjectByProjectIdentifier(projectIdentifier);
    }

    @PostMapping("/")
    public PipelineProject createPipelineProject(@RequestBody Map<String,Object> pipelineProject){
        return pipelineProjectService.createPipelineProject(pipelineProject,false);
    }
}
