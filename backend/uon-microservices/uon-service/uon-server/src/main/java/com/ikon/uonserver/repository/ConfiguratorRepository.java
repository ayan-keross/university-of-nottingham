package com.ikon.uonserver.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uonserver.model.Configurator;


public interface ConfiguratorRepository extends MongoRepository<Configurator,String> {
    Configurator findByConfigType(String configType);

}
