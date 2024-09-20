package com.example.demo.service.interfaces;

import com.example.demo.entity.Land;

import java.util.List;
public interface LandService {
    Land saveLand(Land land);
    List<Land> fetchAllLands();
    Land findLand(Long id);
    void deleteLand(Long id);
    Land addLand(Land land);
    List<Land> fetchUserLands(Long userId);
    List<String> fetchLandTypes();
}