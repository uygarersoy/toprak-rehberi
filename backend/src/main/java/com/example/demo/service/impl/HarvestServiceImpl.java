package com.example.demo.service.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Land;
import com.example.demo.entity.Harvest;
import com.example.demo.repository.LandRepository;
import com.example.demo.repository.HarvestRepository;
import com.example.demo.service.interfaces.HarvestService;

@Service
public class HarvestServiceImpl implements HarvestService {
    
    @Autowired
    private HarvestRepository harvestRepository;

    @Autowired
    private LandRepository landRepository;

    @Override
    public Harvest saveHarvest(Harvest harvest) {
        return harvestRepository.save(harvest);
    }

    @Override
    public Harvest findHarvestById(Long harvestId) {
        return harvestRepository.findById(harvestId).orElse(null);
    }

    @Override
    public Harvest findHarvest(Harvest harvest) {
        return harvestRepository.findById(harvest.getId()).orElse(null);
    }

    @Override
    public void deleteHarvest(Long harvestId, boolean harvestedOrDeleted, Long harvestAmount) {
        Harvest harvest = this.findHarvestById(harvestId);
        Land land = landRepository.findById(harvest.getLand().getId()).orElse(null);
        land.getHarvests().removeIf(h -> h.getId() == harvestId);
        landRepository.save(land);
        harvest.setIsDeleted(true);
        if (harvestedOrDeleted) {
            harvest.setHarvestDate(new Date());
        }
        if (harvestAmount != 0) {
            harvest.setHarvestAmount(harvestAmount);
        }
        this.saveHarvest(harvest);
    }

    @Override
    public List<Harvest> findAll() {
        return harvestRepository.findAll();
    }

    @Override
    public List<Harvest> getHarvestOfLand(Land land) {
        return landRepository.findById(land.getId()).orElse(null).getHarvests().stream().filter(h -> h.getIsDeleted() != true).collect(Collectors.toList());
    }

    @Override
    public Harvest addNewHarvestToLand(Harvest harvest) {
        Land land = landRepository.findById(harvest.getLand().getId()).orElse(null);
        harvest.setLand(land);
        Harvest newHarvest = this.saveHarvest(harvest);
        land.getHarvests().add(newHarvest);
        landRepository.save(land);
        return newHarvest;
    }

    @Override
    public List<Harvest> getPastHarvests(Long adaNo, Long parcelNo) {
        return harvestRepository.getPastHarvests(adaNo, parcelNo);
    }
}