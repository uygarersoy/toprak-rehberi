package com.example.demo.entity;


import java.util.Date;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
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
    private Long area;
    private Date plantingDate;
    private Date harvestDate;
    private Long expectedAmountPerMeterSquare;
    private Boolean isDeleted;
    private Long harvestAmount;

    @ManyToOne
    @JoinColumn(name="product_id")
    @JsonIgnoreProperties("harvests")    
    private Product product;

    @ManyToOne()
    @JoinColumn(name="field_id")
    @JsonIgnoreProperties("harvests")
    private Field field;
}