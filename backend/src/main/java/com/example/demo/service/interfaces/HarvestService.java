package com.example.demo.service.interfaces;

import java.util.List;
import com.example.demo.entity.Harvest;
import com.example.demo.entity.Land;
public interface HarvestService {

    Harvest saveHarvest(Harvest harvest);
    Harvest findHarvest(Harvest harvest);
    void deleteHarvest(Long harvestId, boolean harvestedOrDeleted, Long harvestAmount);
    List<Harvest> findAll();
    Harvest findHarvestById(Long harvestId);
    List<Harvest> getHarvestOfLand(Land land);
    Harvest addNewHarvestToLand(Harvest harvest);
    List<Harvest> getPastHarvests(Long adaNo, Long parcelNo);
}