package com.example.demo.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class FractionDTO {
    private Long id;
    private Long productId;
    private String productName;
    private Double percentage;
    private String productType;
    
    public FractionDTO(Long id, Long productId, String productName, Double percentage, String productType) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.percentage = percentage;
        this.productType = productType;
    }
    public Long getId() {
        return this.id;
    }

    public Long getProductId() {
        return this.productId;
    }

    public String getProductName() {
        return this.productName;
    }

    public Double getPercentage() {
        return this.percentage;
    }

    public String getProductType() {
        return this.productType;
    }
}