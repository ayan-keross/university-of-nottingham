package com.ikon.uonserver.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikon.uonserver.model.Configurator;
import com.ikon.uonserver.service.ConfiguratorService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/v1/configurators")
public class ConfiguratorController {

    @Autowired
    ConfiguratorService configuratorService;

    @GetMapping({"","/"})
    public List<Configurator> getAllConfigurators(){
        return configuratorService.getAllConfigurators();
    }
    @GetMapping("/{configType}")
    public Configurator getConfiguratorByConfigType(@PathVariable String configType){
        return configuratorService.getConfiguratorByConfigType(configType);
    }
    
    @PostMapping("/{configType}")
    public Configurator createConfiguratorByConfigType(@PathVariable String configType, @RequestBody Map<String,Object> configuratorItem){
        return configuratorService.createConfiguratorByConfigType(configType,configuratorItem);
    }
    @PutMapping("/{configType}")
    public Configurator updateConfiguratorByConfigType(@PathVariable String configType, @RequestBody Map<String,Object> configuratorItem){
        return configuratorService.updateConfiguratorByConfigType(configType,configuratorItem);
    }
}
