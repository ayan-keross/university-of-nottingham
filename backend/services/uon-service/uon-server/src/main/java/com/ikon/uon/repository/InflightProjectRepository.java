package com.ikon.uon.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uon.model.InflightProject;

public interface InflightProjectRepository extends MongoRepository<InflightProject,String> {
    InflightProject findByProjectIdentifier(String projectIdentifier);
    
    List<InflightProject> findByStatus(String status);
}
