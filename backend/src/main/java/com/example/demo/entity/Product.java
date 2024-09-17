package com.example.demo.entity;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name="product")
public class Product {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String type;
    private String productName;
    private Integer durationTillHarvest;
    private String unitOfHarvest;
    private String suggestedPlantingSeason;

    @OneToMany(mappedBy="product")
    @JsonIgnoreProperties("product")
    private List<Harvest> harvests;
}