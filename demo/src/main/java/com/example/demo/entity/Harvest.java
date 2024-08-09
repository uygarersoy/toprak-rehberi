package com.example.demo.entity;

import com.example.demo.entity.enums.Product;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//import com.example.demo.entity.Field;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="harvest")
public class Harvest {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Product product;
    private Long area;

    @ManyToOne()
    @JoinColumn(name="field_id")
    @JsonIgnoreProperties("harvests")
    private Field field;
}