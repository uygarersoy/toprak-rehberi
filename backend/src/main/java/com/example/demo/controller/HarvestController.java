package com.example.demo.controller;

//import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import com.example.demo.entity.Harvest;
import com.example.demo.entity.Result;
import com.example.demo.service.interfaces.HarvestService;
import com.example.demo.service.interfaces.ResultService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.demo.entity.Land;
import org.springframework.web.bind.annotation.GetMapping;





@RestController
@RequestMapping("/api/harvest")
public class HarvestController {
    
    @Autowired
    private HarvestService harvestService;

    @Autowired
    private ResultService resultService;

    @PostMapping("/feedback")
    public ResponseEntity<Result> feedbackOfHarvest(@RequestBody Result result) {
        resultService.saveResult(result);
        return new ResponseEntity<>(result, HttpStatus.OK);   
    }
    

    @PostMapping("/fetch-land-harvest")
    public ResponseEntity<List<Harvest>> getHarvestOfLand(@RequestBody Land land){
        return new ResponseEntity<>(harvestService.getHarvestOfLand(land), HttpStatus.OK);
    }
    
    @PostMapping("/add")
    public ResponseEntity<Harvest> addHarvest(@RequestBody Harvest harvest) {
        return new ResponseEntity<>(harvestService.addNewHarvestToLand(harvest), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{harvest-id}")
    public void deleteHarvest(@PathVariable("harvest-id") Long harvestId, @RequestParam boolean harvestedOrDeleted, @RequestParam Long harvestAmount) {
        harvestService.deleteHarvest(harvestId, harvestedOrDeleted, harvestAmount);
    }

    @GetMapping("/get-past-harvests")
    public ResponseEntity<List<Harvest>> getPastHarvests(@RequestParam Long adaNo, @RequestParam Long parcelNo) {
        return new ResponseEntity<>(harvestService.getPastHarvests(adaNo, parcelNo), HttpStatus.OK);
    }
}