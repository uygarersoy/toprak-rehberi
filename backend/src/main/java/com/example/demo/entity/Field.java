package com.example.demo.entity;

import java.util.List;
import com.example.demo.enums.FieldType;
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
@Table(name="fields")
@Entity
@Data
public class Field {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    private FieldType type;
    private Long neighborhoodId;
    private Long availableArea;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnoreProperties("fields")
    private User user;

    @OneToMany(mappedBy="field", cascade=CascadeType.ALL, orphanRemoval=true)
    @JsonIgnoreProperties("field")
    private List<Harvest> harvests;
}