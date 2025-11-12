package com.ikon.uon.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uon.model.DemandProject;
import java.util.List;



public interface DemandProjectRepository extends MongoRepository<DemandProject, String> {
    DemandProject findByProjectIdentifier(String projectIdentifier);

    List<DemandProject> findByStatus(String status);

}
