package com.ikon.uonserver.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikon.uonserver.model.Schedule;
import com.ikon.uonserver.repository.ScheduleRepository;

@Service
public class ScheduleService {
    @Autowired
    private ScheduleRepository scheduleRepository;

    public List<Schedule> getAllSchedules(){
        return scheduleRepository.findAll();
    }

    public Schedule getScheduleByProjectIdentifier(String projectIdentifier){
        return scheduleRepository.findByProjectIdentifier(projectIdentifier);
    }

    public Schedule createSchedule(String projectIdentifier) {
        // Check if one already exists for this project
        Schedule existing = scheduleRepository.findByProjectIdentifier(projectIdentifier);
        if (existing!=null) {
            throw new IllegalStateException("Schedule already found: " + projectIdentifier);
        }
        Schedule schedule = new Schedule();

        schedule.setProjectIdentifier(projectIdentifier);
        schedule.setScheduleIdentifier(UUID.randomUUID().toString());
        schedule.setActualScheduleDetails(new HashMap<>());

        schedule.setCreatedAt(LocalDateTime.now());
        schedule.setUpdatedAt(LocalDateTime.now());
        schedule.setCreatedBy("System");
        schedule.setUpdatedBy("System");

        return scheduleRepository.save(schedule);
    }

    public Schedule updateSchedule(String projectIdentifier, Map<String,Object> actualScheduleDetails){
        Schedule schedule = scheduleRepository.findByProjectIdentifier(projectIdentifier);
        if (schedule == null) {
            throw new IllegalStateException("Schedule not found: " + projectIdentifier);
        }
        // Update fields
        schedule.setActualScheduleDetails(actualScheduleDetails);

        schedule.setUpdatedAt(LocalDateTime.now());
        schedule.setUpdatedBy("System");

        return scheduleRepository.save(schedule);
    }
}
