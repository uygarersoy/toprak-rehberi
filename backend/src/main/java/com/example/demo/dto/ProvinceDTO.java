package com.example.demo.dto;

public class ProvinceDTO {
    private Long id;
    private String provinceName;

    public ProvinceDTO(Long id, String provinceName) {
        this.id = id;
        this.provinceName = provinceName;
    }

    public Long getId() {
        return this.id;
    }

    public String getProvinceName() {
        return this.provinceName;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public void setProvinceName(String name) {
        this.provinceName = name;
    }
}