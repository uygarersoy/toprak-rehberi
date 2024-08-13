package com.example.demo.dto;

public class NeighborhoodDTO {
    private Long id;
    private String neighborhoodName;

    public NeighborhoodDTO(Long id, String neighborhoodName) {
        this.id = id;
        this.neighborhoodName = neighborhoodName;
    }

    public Long getId() {
        return this.id;
    }

    public String getNeighborhoodName() {
        return this.neighborhoodName;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public void setNeighborhoodName(String name) {
        this.neighborhoodName = name;
    }
}
