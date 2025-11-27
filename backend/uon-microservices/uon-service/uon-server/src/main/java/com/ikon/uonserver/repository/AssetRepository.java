package com.ikon.uonserver.repository;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ikon.uonserver.model.Asset;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    Asset findByAssetIdentifier(UUID assetIdentifier);
    Asset findByAssetId(String assetId);
}
