package com.ikon.uonserver.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uonserver.model.PipelineProject;

import java.util.List;


public interface PipelineProjectRepository extends MongoRepository<PipelineProject,String>{
    PipelineProject findByProjectIdentifier(String projectIdentifier);

    List<PipelineProject> findByStatus(String status);
}
