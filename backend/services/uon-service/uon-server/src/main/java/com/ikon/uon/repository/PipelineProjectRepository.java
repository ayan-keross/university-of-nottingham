package com.ikon.uon.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uon.model.PipelineProject;
import java.util.List;


public interface PipelineProjectRepository extends MongoRepository<PipelineProject,String>{
    PipelineProject findByProjectIdentifier(String projectIdentifier);

    List<PipelineProject> findByStatus(String status);
}
