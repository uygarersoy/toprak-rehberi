package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Fraction;
import com.example.demo.service.interfaces.FractionService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/fraction")
public class FractionController {
    
    @Autowired FractionService fractionService;


    @GetMapping("/guide")
    public ResponseEntity<List<Fraction>> getGuidenceForField(@RequestParam Long neighborhoodId) {
        return new ResponseEntity<>(fractionService.fetchFractions(neighborhoodId), HttpStatus.OK);
    }
    
    @PutMapping("/update")
    public ResponseEntity<Fraction> updateFractionAfterHarvest(
        @RequestParam Long neighborhoodId,
        @RequestParam Long productId,
        @RequestParam Integer satisfaction,
        @RequestParam Long area,
        @RequestParam String productName ) {
        
        Fraction fraction = fractionService.calculateFractionVal(neighborhoodId, productId, satisfaction, area, productName);
        return new ResponseEntity<>(fraction, HttpStatus.OK);
    }

    @GetMapping("/get-fraction")
    public ResponseEntity<Fraction> getFractionForNeighborhood(@RequestParam Long neighborhoodId, @RequestParam Long productId) {
        Fraction fraction = fractionService.getFraction(neighborhoodId, productId);
        if (fraction != null) {
            return new ResponseEntity<>(fraction, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}