package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="result")
public class Result {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private Long harvestAmount;
    private Long productId;
    private Long neighborhoodId;
}