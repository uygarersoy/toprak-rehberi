package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import com.example.demo.entity.Harvest;
import com.example.demo.entity.Result;
import com.example.demo.service.interfaces.FieldService;
import com.example.demo.service.interfaces.HarvestService;
import com.example.demo.service.interfaces.ResultService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.demo.entity.Field;



@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/harvest")
public class HarvestController {
    
    @Autowired
    private HarvestService harvestService;

    @Autowired
    private FieldService fieldService;

    @Autowired
    private ResultService resultService;

    @PostMapping("/feedback")
    public ResponseEntity<Result> feedbackOfHarvest(@RequestBody Result result) {
        resultService.saveResult(result);
        return new ResponseEntity<>(result, HttpStatus.OK);        
    }
    

    @PostMapping("/fetch-field-harvest")
    public ResponseEntity<List<Harvest>> getHarvestOfField(@RequestBody Field field){
        Field fetchedField = fieldService.findField(field.getId());
        List<Harvest> harvests = fetchedField.getHarvests();
        return new ResponseEntity<>(harvests, HttpStatus.OK);
    }
    
    @PostMapping("/add")
    public ResponseEntity<Harvest> addHarvest(@RequestBody Harvest harvest) {
        Field field = fieldService.findField(harvest.getField().getId());
        harvest.setField(field);
        Harvest newHarvest = harvestService.saveHarvest(harvest);
        field.getHarvests().add(harvest);
        fieldService.saveField(field);
        return new ResponseEntity<>(newHarvest, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{harvest-id}")
    public void deleteHarvest(@PathVariable("harvest-id") Long harvestId) {
        Harvest harvest = harvestService.findHarvestById(harvestId);
        Field field = fieldService.findField(harvest.getField().getId());
        field.getHarvests().removeIf(h -> h.getId().equals(harvestId));
        fieldService.saveField(field);
        harvestService.deleteHarvest(harvestId);
    }
}