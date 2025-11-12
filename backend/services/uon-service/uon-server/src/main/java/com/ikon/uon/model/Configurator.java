package com.ikon.uon.model;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "configurators")
@Data
public class Configurator {

    @Id
    private String id;

    private Map<String, Map<String, Object>> configuratorItemDetails;
    private String configType;
    private String updatedBy;
    private LocalDateTime updatedAt;

    // inner static class for item details
    // @Data
    // public static class ConfiguratorItem {
    //     private int order;
    //     private String itemId;
    //     private String itemName;
    //     private String configType;
    //     private boolean active;
    //     private LocalDateTime createdAt;
    //     private String createdBy;
    //     private LocalDateTime updatedAt;
    //     private String updatedBy;
    // }

}
