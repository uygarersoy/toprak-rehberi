package com.example.demo.repository;

import com.example.demo.entity.Harvest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HarvestRepository extends JpaRepository<Harvest, Long> {
    @Query("SELECT h FROM Harvest h WHERE h.product.id = :productId AND h.field.id = :fieldId")
    Harvest checkHarvestExists(@Param("fieldId") Long fieldId, @Param("productId") Long productId);
}