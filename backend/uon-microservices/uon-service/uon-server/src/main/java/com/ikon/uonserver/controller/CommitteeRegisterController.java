package com.ikon.uonserver.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikon.uonserver.model.CommitteeRegister;
import com.ikon.uonserver.service.CommitteeRegisterService;

@RestController
@RequestMapping("api/v1/committee-register")
public class CommitteeRegisterController {
    @Autowired
    CommitteeRegisterService committeeRegisterService;

    @GetMapping({"/",""})
    public List<CommitteeRegister> getAllCommitteeRegisters(){
        return committeeRegisterService.getAllCommitteeRegisters();
    }

    @GetMapping("/{projectIdentifier}")
    public CommitteeRegister getCommitteeRegisterByProjectIdentifier(@PathVariable String projectIdentifier){
        return committeeRegisterService.getCommitteeRegisterByProjectIdentifier(projectIdentifier);
    }

    @PostMapping("/{projectIdentifier}")
    public CommitteeRegister createCommitteeRegister(@PathVariable String projectIdentifier,@RequestBody Map<String,List<Map<String,Object>>> committeeRegisterData){
        return committeeRegisterService.createCommitteeRegister(projectIdentifier, committeeRegisterData);
    }
    @PutMapping("/{projectIdentifier}")
    public CommitteeRegister updateCommitteeRegister(@PathVariable String projectIdentifier,@RequestBody Map<String,List<Map<String,Object>>> committeeRegisterData){
        return committeeRegisterService.updateCommitteeRegister(projectIdentifier, committeeRegisterData);
    }
}
