package com.example.demo.repository;

import com.example.demo.entity.Harvest;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HarvestRepository extends JpaRepository<Harvest, Long> {
    @Query("SELECT h FROM Harvest h WHERE h.product.id = :productId AND h.land.id = :landId")
    Harvest checkHarvestExists(@Param("landId") Long landId, @Param("productId") Long productId);

    @Query("SELECT h FROM Harvest h WHERE h.isDeleted = true AND h.harvestDate IS NOT NULL AND h.land.adaNo = :adaNo AND h.land.parcelNo = :parcelNo AND h.harvestAmount IS NOT NULL")
    List<Harvest> getPastHarvests(@Param("adaNo") Long adaNo, @Param("parcelNo") Long parcelNo);
}