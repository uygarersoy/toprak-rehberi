package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.GenerationType;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name="district")
public class District {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String districtName;

    @ManyToOne
    @JoinColumn(name="province_id")
    @JsonIgnoreProperties("allDistricts")
    private Province province;

    @OneToMany(mappedBy="district", cascade=CascadeType.ALL, orphanRemoval=true)
    @JsonIgnoreProperties("district")
    private List<Neighborhood> allNeigborhood;

}
