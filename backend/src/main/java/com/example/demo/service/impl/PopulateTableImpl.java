package com.example.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.demo.entity.District;
import com.example.demo.entity.Neighborhood;
import com.example.demo.entity.Province;
import com.example.demo.repository.ProvinceRepository;
import com.example.demo.service.interfaces.PopulateTableService;

@Service
public class PopulateTableImpl implements PopulateTableService{

    @Autowired
    private ProvinceRepository repository;

    @Override
    public void populate(Map<String, Map<String, List<String>>> data) {

        for (String province : data.keySet()) {
            if (repository.existsByProvinceName(province)) {
                continue;
            }
            Map<String, List<String>> districtInfo = data.get(province);
            Province newProvince = new Province();
            newProvince.setProvinceName(province);
            List<District> districtsOfProvince = new ArrayList<>();

            for (String district : districtInfo.keySet()) {
                List<String> neighborhoods = data.get(province).get(district);
                District newDistrict = new District();
                newDistrict.setDistrictName(district);
                newDistrict.setProvince(newProvince);
                List<Neighborhood> neighborhoodsOfDistrict = new ArrayList<>();
                
                for (String neigborhood : neighborhoods) {
                    Neighborhood newNeighborhood = new Neighborhood();
                    newNeighborhood.setNeigborhoodName(neigborhood);
                    newNeighborhood.setDistrict(newDistrict);
                    neighborhoodsOfDistrict.add(newNeighborhood);
                }
                newDistrict.setAllNeigborhood(neighborhoodsOfDistrict);
                districtsOfProvince.add(newDistrict);
            }
            newProvince.setAllDistricts(districtsOfProvince);
            repository.save(newProvince);
        }
    }
}