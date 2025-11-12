package com.ikon.uon.repository;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ikon.uon.model.Asset;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    Asset findByAssetIdentifier(UUID assetIdentifier);
    Asset findByAssetId(String assetId);
}
