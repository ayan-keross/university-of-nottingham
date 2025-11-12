package com.ikon.uon.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikon.uon.model.Report;
import com.ikon.uon.repository.ReportRepository;

@Service
public class ReportService {
    @Autowired
    private ReportRepository reportRepository;

    public Report createReport(String projectIdentifier) {
        // Check if one already exists for this project
        Report existing = reportRepository.findByProjectIdentifier(projectIdentifier);
        if (existing!=null) {
            throw new IllegalStateException("Report already found: " + projectIdentifier);
        }
        Report report = new Report();

        report.setProjectIdentifier(projectIdentifier);
        report.setReportIdentifier(UUID.randomUUID().toString());

        report.setCreatedAt(LocalDateTime.now());
        report.setUpdatedAt(LocalDateTime.now());
        report.setCreatedBy("System");
        report.setUpdatedBy("System");

        return reportRepository.save(report);
    }
}
