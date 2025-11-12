package com.ikon.uon.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikon.uon.model.Asset;
import com.ikon.uon.repository.AssetRepository;

@Service
public class AssetService {
    @Autowired
    AssetRepository assetRepository;

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }
    public Asset getAssetByAssetIdentifier(UUID assetIdentifier) {
        return assetRepository.findByAssetIdentifier(assetIdentifier);
    }
    public Asset getAssetByAssetId(String assetId) {
        return assetRepository.findByAssetId(assetId);
    }
    public Asset createAsset(Asset asset) {
        if(asset.getAssetIdentifier() == null) {
            asset.setAssetIdentifier(UUID.randomUUID());
        }
        asset.setIsActive(true);
        var assetObj = assetRepository.save(asset);
        return assetObj;
    }
    public Asset updateAssetByAssetIdentifier(UUID assetIdentifier, Asset asset) {
        Asset existingAsset = assetRepository.findByAssetIdentifier(assetIdentifier);
        if (existingAsset != null) {
            // Update fields
            existingAsset.setAssetName(asset.getAssetName());
            existingAsset.setAssetType(asset.getAssetType());
            existingAsset.setAssetArea(asset.getAssetArea());
            existingAsset.setAssetConstructionYear(asset.getAssetConstructionYear());
            existingAsset.setCampus(asset.getCampus());
            existingAsset.setLatitude(asset.getLatitude());
            existingAsset.setLongitude(asset.getLongitude());
            existingAsset.setWhat3words(asset.getWhat3words());
            existingAsset.setBulkUpload(asset.getBulkUpload());
            existingAsset.setUpdatedBy(asset.getUpdatedBy());
            existingAsset.setUpdatedOn(asset.getUpdatedOn());
            // Save updated asset
            return assetRepository.save(existingAsset);
        } else {
            return null; // Or throw an exception
        }
    }
}
