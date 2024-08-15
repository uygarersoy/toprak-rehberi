package com.example.demo.entity;

import java.util.List;
//import com.example.demo.entity.Harvest;
//import com.example.demo.entity.User;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
//import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Table(name="fields")
@Entity
@Data
public class Field {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String type;
    /*private String province;
    private String district;
    private String neighborhood;

    @OneToOne
    @JoinColumn(name="province_id")
    private Province province;

    @OneToOne
    @JoinColumn(name="district_id")
    private District district;

    @OneToOne
    @JoinColumn(name="neighborhood_id")
    private Neighborhood neighborhood;*/

    private Long provinceId;
    private String provinceName;
    private Long districtId;
    private String districtName;
    private Long neighborhoodId;
    private String neighborhoodName;


    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnoreProperties("fields")
    private User user;

    @OneToMany(mappedBy="field", cascade=CascadeType.ALL, orphanRemoval=true)
    @JsonIgnoreProperties("field")
    private List<Harvest> harvests;
}