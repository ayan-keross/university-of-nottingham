package com.ikon.uon.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikon.uon.model.CommitteeRegister;
import com.ikon.uon.repository.CommitteeRegisterRepository;

@Service
public class CommitteeRegisterService {
    @Autowired
    CommitteeRegisterRepository committeeRegisterRepository;

    public List<CommitteeRegister> getAllCommitteeRegisters(){
        return committeeRegisterRepository.findAll();
    }

    public CommitteeRegister getCommitteeRegisterByProjectIdentifier(String projectIdentifier){
        return committeeRegisterRepository.findByProjectIdentifier(projectIdentifier);
    }

    public CommitteeRegister createCommitteeRegister(String projectIdentifier,Map<String,List<Map<String,Object>>> committeeRegisterData){
        // Check if one already exists for this project
        CommitteeRegister existing = committeeRegisterRepository.findByProjectIdentifier(projectIdentifier);
        if (existing!=null) {
            throw new IllegalStateException("committee register already found: " + projectIdentifier);
        }

        CommitteeRegister committeeRegister= new CommitteeRegister();
        committeeRegister.setProjectIdentifier(projectIdentifier);

        // Initialize default empty structures
        committeeRegister.setCommitteePlanningList(committeeRegisterData.get("committeePlanningList"));
        committeeRegister.setCommitteeHistoryList(committeeRegisterData.get("committeeHistoryList"));

        committeeRegister.setCreatedAt(LocalDateTime.now());
        committeeRegister.setUpdatedAt(LocalDateTime.now());
        committeeRegister.setCreatedBy("System");
        committeeRegister.setUpdatedBy("System");
        // Save to MongoDB
        return committeeRegisterRepository.save(committeeRegister);
    }

    public CommitteeRegister updateCommitteeRegister(String projectIdentifier, Map<String, List<Map<String, Object>>> committeeRegisterData) {
        CommitteeRegister committeeRegister = committeeRegisterRepository.findByProjectIdentifier(projectIdentifier);
        if (committeeRegister == null) {
            throw new IllegalStateException("Committee Register not found: " + projectIdentifier);
        }

        // Update fields
        committeeRegister.setCommitteePlanningList(committeeRegisterData.get("committeePlanningList"));
        committeeRegister.setCommitteeHistoryList(committeeRegisterData.get("committeeHistoryList"));

        committeeRegister.setUpdatedAt(LocalDateTime.now());
        committeeRegister.setUpdatedBy("System");

        // Save to MongoDB
        return committeeRegisterRepository.save(committeeRegister);
    }
}
