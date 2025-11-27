package com.ikon.uonserver.model;

import java.time.OffsetDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@RequiredArgsConstructor
@Data
@Table(name = "assets")
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "asset_id",unique = true, nullable = false)
    private String assetId;

    @Column(name = "asset_identifier", unique = true, nullable = false)
    private UUID assetIdentifier;

    @Column(name = "asset_name")
    private String assetName;

    @Column(name = "asset_type")
    private String assetType;

    @Column(name = "asset_area")
    private Double assetArea;

    @Column(name = "asset_construction_year")
    private Integer assetConstructionYear;

    @Column(name = "campus")
    private String campus;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "what3words")
    private String what3words;

    @Column(name = "bulk_upload")
    private Boolean bulkUpload;

    @Column(name = "created_by")
    private UUID createdBy;

    @Column(name = "created_on")
    private OffsetDateTime createdOn;

    @Column(name = "updated_by")
    private UUID updatedBy;

    @Column(name = "updated_on")
    private OffsetDateTime updatedOn;

    @Column(name = "is_active")
    private Boolean isActive;

}
