package com.example.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Land;
import com.example.demo.entity.Harvest;
import com.example.demo.enums.LandType;
import com.example.demo.repository.LandRepository;
import com.example.demo.repository.HarvestRepository;
import com.example.demo.service.interfaces.LandService;
import java.text.Collator;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class LandServiceImpl implements LandService {
 
    @Autowired
    private LandRepository landRepository;
    @Autowired
    private HarvestRepository harvestRepository;

    @Override
    public Land saveLand(Land land) {
        return landRepository.save(land);
    }

    @Override
    public List<Land> fetchAllLands() {
        return landRepository.findAll();
    }

    @Override
    public Land findLand(Long id) {
        return landRepository.findById(id).orElse(null);
    }
    
    @Override
    public void deleteLand(Long id) {
        Land land = landRepository.findById(id).orElse(null);
        for (Harvest harvest : land.getHarvests()) {
            harvest.setIsDeleted(true);
            harvestRepository.save(harvest);
        }
        land.setIsDeleted(true);
        this.saveLand(land);
    }

    @Override
    public Land addLand(Land land) {
        Land checkLandExists = landRepository.checkAdaParcelExists(land.getAdaNo(), land.getParcelNo());
        if (checkLandExists == null) {
            return this.saveLand(land);
        }
        return null;
    }

    @Override
    public List<Land> fetchUserLands(Long userId) {
        return landRepository.fetchUserLands(userId);
    }

    @Override
    public List<String> fetchLandTypes() {
        Collator turkishCollator = Collator.getInstance(new Locale("tr", "TR"));
        turkishCollator.setStrength(Collator.PRIMARY);
        turkishCollator.setDecomposition(Collator.CANONICAL_DECOMPOSITION);
        return Arrays.stream(LandType.values()).map(Enum::name).sorted(turkishCollator::compare).collect(Collectors.toList());
    }
}