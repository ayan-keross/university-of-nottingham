package com.ikon.uon.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uon.model.CommitteeRegister;

public interface CommitteeRegisterRepository extends MongoRepository<CommitteeRegister,String>{
    CommitteeRegister findByProjectIdentifier(String projectIdentifier);
}
