package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
    private String neighborhood;
    private Long yield;

    @OneToOne
    @JoinColumn(name="harvest_id")
    @JsonIgnoreProperties("result")
    private Harvest harvest;
}