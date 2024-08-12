package com.example.demo.service.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Harvest;
import com.example.demo.repository.HarvestRepository;
import com.example.demo.service.interfaces.HarvestService;

@Service
public class HarvestServiceImp implements HarvestService {
    
    @Autowired
    private HarvestRepository harvestRepository;

    @Override
    public Harvest saveHarvest(Harvest harvest) {
        return harvestRepository.save(harvest);
    }

    @Override
    public Harvest findHarvest(Harvest harvest) {
        return harvestRepository.findById(harvest.getId()).orElse(null);
    }

    @Override
    public void deleteHarvest(Long harvestId ) {
        harvestRepository.deleteById(harvestId);
    }

    @Override
    public List<Harvest> findAll() {
        return harvestRepository.findAll();
    }

}