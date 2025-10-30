package com.ikon.uon.repository;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uon.model.DemandProject;


public interface DemandProjectRepository extends MongoRepository<DemandProject, String> {
    DemandProject findByProjectIdentifier(String projectIdentifier);

}
