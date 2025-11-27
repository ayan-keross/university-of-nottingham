package com.ikon.uonserver.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uonserver.model.InflightProject;

public interface InflightProjectRepository extends MongoRepository<InflightProject,String> {
    InflightProject findByProjectIdentifier(String projectIdentifier);
    
    List<InflightProject> findByStatus(String status);
}
