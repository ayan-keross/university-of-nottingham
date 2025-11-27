package com.ikon.uonserver.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uonserver.model.Report;

public interface ReportRepository extends MongoRepository<Report,String> {
    Report findByProjectIdentifier(String projectIdentifier);
}
