package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.GenerationType;



@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name="neighborhood")
public class Neighborhood {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String neigborhoodName;

    @ManyToOne
    @JoinColumn(name="ditrict_id")
    @JsonIgnoreProperties("allNeighborhood")
    private District district;
}