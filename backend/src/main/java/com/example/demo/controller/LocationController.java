package com.example.demo.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.DistrictDTO;
import com.example.demo.dto.NeighborhoodDTO;
import com.example.demo.dto.ProvinceDTO;
import com.example.demo.entity.District;
import com.example.demo.entity.Neighborhood;
import com.example.demo.entity.Province;
import com.example.demo.repository.DistrictRepository;
import com.example.demo.repository.NeighborhoodRepository;
import com.example.demo.repository.ProvinceRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/location")
public class LocationController {
    
    @Autowired
    private DistrictRepository dRepo;

    @Autowired
    private ProvinceRepository pRepo;

    @Autowired
    private NeighborhoodRepository nRepo;


    @GetMapping("/province")
    public ResponseEntity<List<ProvinceDTO>> getProvinces() {
        List<Province> allProvinces = pRepo.findAll();
        List<ProvinceDTO> provinceDTOs = allProvinces.stream()
            .map(province -> new ProvinceDTO(province.getId(), province.getProvinceName()))
            .collect(Collectors.toList());
        return new ResponseEntity<>(provinceDTOs, HttpStatus.OK);
    }

    @GetMapping("/district")
    public ResponseEntity<List<DistrictDTO>> getDistrictsForProvince(@RequestParam Long provinceId) {
        Province province = pRepo.findById(provinceId).orElse(null);
        if (province != null) {
            List<District> districts = dRepo.getByProvince(province);
            List<DistrictDTO> districtDTOs = districts.stream()
                .map(district -> new DistrictDTO(district.getId(), district.getDistrictName()))
                .collect(Collectors.toList());
            return new ResponseEntity<>(districtDTOs, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @GetMapping("/neighborhood")
    public ResponseEntity<List<NeighborhoodDTO>> getNeighborhoodForDistrict(@RequestParam Long districtId) {
        District district = dRepo.findById(districtId).orElse(null);
        if (district != null) {
            List<Neighborhood> neighborhoods = nRepo.getByDistrict(district);
            List<NeighborhoodDTO> neighborhoodDTOs = neighborhoods.stream()
                .map(neighborhood -> new NeighborhoodDTO(neighborhood.getId(), neighborhood.getNeigborhoodName()))
                .collect(Collectors.toList());
            return new ResponseEntity<>(neighborhoodDTOs, HttpStatus.OK);           
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}