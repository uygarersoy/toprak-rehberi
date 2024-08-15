package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.demo.entity.Fraction;

public interface FractionRepository extends JpaRepository<Fraction, Long>{
    @Query("SELECT f FROM Fraction f WHERE f.neighborhoodId = :neighborhoodId")
    List<Fraction> fetchFractions(@Param("neighborhoodId") Long neighborhoodId);

    @Query("SELECT f FROM Fraction f WHERE f.neighborhoodId = :neighborhoodId AND f.productId = :productId")
    Fraction getFraction(@Param("neighborhoodId") Long neighborhoodId, @Param("productId") Long productId);
}