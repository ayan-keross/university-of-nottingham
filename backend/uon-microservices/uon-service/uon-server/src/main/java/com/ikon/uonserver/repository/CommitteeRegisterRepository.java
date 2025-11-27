package com.ikon.uonserver.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uonserver.model.CommitteeRegister;

public interface CommitteeRegisterRepository extends MongoRepository<CommitteeRegister,String>{
    CommitteeRegister findByProjectIdentifier(String projectIdentifier);
}
