package com.ikon.uon.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikon.uon.model.Schedule;
import com.ikon.uon.service.ScheduleService;

@RestController
@RequestMapping("api/v1/schedule")
public class ScheduleController {
    @Autowired
    ScheduleService scheduleService;

    @GetMapping({"/",""})
    public List<Schedule> getAllSchedules(){
        return scheduleService.getAllSchedules();
    }

    @GetMapping("/{projectIdentifier}")
    public Schedule getScheduleByProjectIdentifier(@PathVariable String projectIdentifier){
        return scheduleService.getScheduleByProjectIdentifier(projectIdentifier);
    }

    @PutMapping("/{projectIdentifier}")
    public Schedule updateSchedule(@PathVariable String projectIdentifier, @RequestBody Map<String,Object> actualScheduleDetails){
        return scheduleService.updateSchedule(projectIdentifier,actualScheduleDetails);
    }

}
