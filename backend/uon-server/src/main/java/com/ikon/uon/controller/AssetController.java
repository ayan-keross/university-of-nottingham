package com.ikon.uon.controller;

import com.ikon.uon.model.Asset;
import com.ikon.uon.service.AssetService;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/assets")
public class AssetController {

    @Autowired
    AssetService assetService;

    @GetMapping("/")
    public List<Asset> getAllAssets() {
        return assetService.getAllAssets();
    }

    @GetMapping("/{assetIdentifier}")
    public Asset getAssetByAssetIdentifier(@PathVariable UUID assetIdentifier) {
        return assetService.getAssetByAssetIdentifier(assetIdentifier);
    }
    // @GetMapping("/{assetId}")
    // public Asset getAssetByAssetId(@PathVariable String assetId) {
    //     return assetService.getAssetByAssetId(assetId);
    // }
    @PostMapping("/")
    public Asset createAsset(@RequestBody Asset asset) {
        return assetService.createAsset(asset);
    }
    
    @PutMapping("/{assetIdentifier}")
    public Asset updateAsset(@PathVariable UUID assetIdentifier, @RequestBody Asset asset) {
        // Update logic to be implemented
        return assetService.updateAssetByAssetIdentifier(assetIdentifier,asset);
    }

}
