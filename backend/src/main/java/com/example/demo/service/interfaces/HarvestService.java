package com.example.demo.service.interfaces;

import java.util.List;
import com.example.demo.entity.Harvest;
import com.example.demo.entity.Field;
public interface HarvestService {

    Harvest saveHarvest(Harvest harvest);
    Harvest findHarvest(Harvest harvest);
    void deleteHarvest(Long harvestId, boolean harvestedOrDeleted, Long harvestAmount);
    List<Harvest> findAll();
    Harvest findHarvestById(Long harvestId);
    List<Harvest> getHarvestOfField(Field field);
    Harvest addNewHarvestToField(Harvest harvest);
    List<Harvest> getPastHarvests(Long neighborhoodId);
}