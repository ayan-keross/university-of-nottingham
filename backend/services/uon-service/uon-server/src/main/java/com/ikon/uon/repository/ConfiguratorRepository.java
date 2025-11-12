package com.ikon.uon.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uon.model.Configurator;


public interface ConfiguratorRepository extends MongoRepository<Configurator,String> {
    Configurator findByConfigType(String configType);

}
