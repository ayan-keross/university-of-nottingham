package com.ikon.uonserver.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uonserver.model.Schedule;

public interface ScheduleRepository extends MongoRepository<Schedule,String>{
    Schedule findByProjectIdentifier(String projectIdentifier);
}
