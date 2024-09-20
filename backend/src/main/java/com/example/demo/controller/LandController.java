package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.service.interfaces.LandService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.demo.dto.UserDTO;
import com.example.demo.entity.Land;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/land")
public class LandController {
    
    @Autowired
    private LandService landService;

    @DeleteMapping("/{land-id}")
    public ResponseEntity<Long> removeLand(@PathVariable("land-id") Long landId) {
        landService.deleteLand(landId);
        return new ResponseEntity<>(landId, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addLand(@RequestBody Land land) {
        Land savedLand = landService.addLand(land);
        if (savedLand != null) {
            return new ResponseEntity<>(savedLand, HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>("There exists a land with the given ada and parcel no!", HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/fetch-user-lands")
    public ResponseEntity<List<Land>> fetchUserLands(@RequestBody UserDTO user) {
        return new ResponseEntity<>(landService.fetchUserLands(user.getId()), HttpStatus.OK);
    }

    @GetMapping("/land-type")
    public List<String> getLandTypes() {
        return landService.fetchLandTypes();
    }

    @PutMapping("/update-land")
    public ResponseEntity<Land> updateLand(
        @RequestParam int sign,
        @RequestParam int area,
        @RequestParam Long landId) {
        Land land = landService.findLand(landId);
        land.setAvailableArea(land.getAvailableArea() + sign * area);
        landService.saveLand(land);
        return new ResponseEntity<>(land, HttpStatus.OK);  
    }
}