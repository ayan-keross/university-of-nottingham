package com.ikon.uon.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikon.uon.repository.ConfiguratorRepository;
import com.ikon.uon.model.Configurator;
@Service
public class ConfiguratorService {

    @Autowired
    ConfiguratorRepository configRepository;

    public List<Configurator> getAllConfigurators() {
        return configRepository.findAll();
    }

    public Configurator getConfiguratorByConfigType(String configType){
        return configRepository.findByConfigType(configType);
    }

    public Configurator createConfiguratorByConfigType(String configType, Map<String,Object> configuratorItem){
        Configurator configurator = configRepository.findByConfigType(configType);
        if (configurator == null) {
            configurator = new Configurator();
            configurator.setConfigType(configType);
            configurator.setConfiguratorItemDetails(new HashMap<>());
        }

        Map<String, Map<String, Object>> configItems = configurator.getConfiguratorItemDetails();
        if (configItems == null) {
            configItems = new HashMap<>();
        }

        Object idObj = configuratorItem.get("itemId");
        if (idObj == null) {
            throw new IllegalArgumentException("configuratorItem must contain an 'itemId' key");
        }
        String itemId = String.valueOf(idObj);
        configuratorItem.put("configType", configType);
        configuratorItem.put("createdAt", LocalDateTime.now());
        configuratorItem.put("createdBy", "system");
        configuratorItem.put("updatedAt", LocalDateTime.now());
        configuratorItem.put("updatedBy", "system");
        configItems.put(itemId, configuratorItem);
        configurator.setConfiguratorItemDetails(configItems);
        configurator.setUpdatedBy("system");
        configurator.setUpdatedAt(LocalDateTime.now());
        return configRepository.save(configurator);
    }
    public Configurator updateConfiguratorByConfigType(String configType, Map<String,Object> configuratorItem){
        Configurator configurator = configRepository.findByConfigType(configType);
        if (configurator == null) {
            throw new IllegalArgumentException("Configurator with configType " + configType + " does not exist.");
        }

        Map<String, Map<String, Object>> configItems = configurator.getConfiguratorItemDetails();
        if (configItems == null) {
            configItems = new HashMap<>();
        }

        Object idObj = configuratorItem.get("itemId");
        if (idObj == null) {
            throw new IllegalArgumentException("configuratorItem must contain an 'itemId' key");
        }
        String itemId = String.valueOf(idObj);

        if (!configItems.containsKey(itemId)) {
            throw new IllegalArgumentException("Item with itemId " + itemId + " does not exist in configurator.");
        }
        configuratorItem.put("configType", configType);
        configuratorItem.put("updatedAt", LocalDateTime.now());
        configuratorItem.put("updatedBy", "system");
        configItems.put(itemId, configuratorItem);
        configurator.setConfiguratorItemDetails(configItems);
        configurator.setUpdatedBy("system");
        configurator.setUpdatedAt(LocalDateTime.now());
        return configRepository.save(configurator);
    }
}
