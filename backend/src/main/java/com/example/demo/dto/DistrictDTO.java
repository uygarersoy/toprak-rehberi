package com.example.demo.dto;

public class DistrictDTO {
    private Long id;
    private String districtName;

    public DistrictDTO(Long id, String districtName) {
        this.id = id;
        this.districtName = districtName;
    }

    public Long getId() {
        return this.id;
    }

    public String getDistrictName() {
        return this.districtName;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public void setDistrictName(String name) {
        this.districtName = name;
    }
    
}
