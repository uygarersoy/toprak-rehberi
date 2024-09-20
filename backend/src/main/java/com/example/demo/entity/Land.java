package com.example.demo.entity;

import java.util.List;
import com.example.demo.enums.LandType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Table(name="lands")
@Entity
@Data
public class Land {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    private LandType type;
    private Long neighborhoodId;
    private Long availableArea;
    private String landName;
    private Long adaNo;
    private Long parcelNo;
    private Boolean isDeleted;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnoreProperties("lands")
    private User user;

    @OneToMany(mappedBy="land", cascade=CascadeType.ALL, orphanRemoval=true)
    @JsonIgnoreProperties("land")
    private List<Harvest> harvests;
}