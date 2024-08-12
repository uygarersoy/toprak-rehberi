package com.example.demo.service.interfaces;

import java.util.List;

import com.example.demo.entity.Harvest;

public interface HarvestService {

    Harvest saveHarvest(Harvest harvest);
    Harvest findHarvest(Harvest harvest);
    void deleteHarvest(Long harvestId);
    List<Harvest> findAll();
}