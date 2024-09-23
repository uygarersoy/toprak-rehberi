package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name="product_success")
public class ProductSuccess {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private Long neighborhoodId;
    private Long productId;
    private Double percentage;
}