package com.ikon.uon.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uon.model.Report;

public interface ReportRepository extends MongoRepository<Report,String> {
    Report findByProjectIdentifier(String projectIdentifier);
}
