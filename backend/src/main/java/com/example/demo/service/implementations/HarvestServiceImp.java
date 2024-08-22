package com.example.demo.service.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Field;
import com.example.demo.entity.Harvest;
import com.example.demo.repository.FieldRepository;
import com.example.demo.repository.HarvestRepository;
import com.example.demo.service.interfaces.HarvestService;

@Service
public class HarvestServiceImp implements HarvestService {
    
    @Autowired
    private HarvestRepository harvestRepository;

    @Autowired
    private FieldRepository fieldRepository;

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
    public void deleteHarvest(Long harvestId ) {
        Harvest harvest = this.findHarvestById(harvestId);
        Field field = fieldRepository.findById(harvest.getField().getId()).orElse(null);
        field.getHarvests().removeIf(h -> h.getId().equals(harvestId));
        fieldRepository.save(field);
        harvestRepository.deleteById(harvestId);
    }

    @Override
    public List<Harvest> findAll() {
        return harvestRepository.findAll();
    }

    @Override
    public List<Harvest> getHarvestOfField(Field field) {
        return fieldRepository.findById(field.getId()).orElse(null).getHarvests();
    }

    @Override
    public Harvest addNewHarvestToField(Harvest harvest) {
        Field field = fieldRepository.findById(harvest.getField().getId()).orElse(null);
        harvest.setField(field);
        Harvest newHarvest = this.saveHarvest(harvest);
        field.getHarvests().add(newHarvest);
        fieldRepository.save(field);
        return newHarvest;
    }
}