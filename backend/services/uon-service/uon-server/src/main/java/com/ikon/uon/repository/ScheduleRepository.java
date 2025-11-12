package com.ikon.uon.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uon.model.Schedule;

public interface ScheduleRepository extends MongoRepository<Schedule,String>{
    Schedule findByProjectIdentifier(String projectIdentifier);
}
