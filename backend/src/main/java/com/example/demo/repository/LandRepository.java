package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import com.example.demo.entity.Land;

public interface LandRepository extends JpaRepository<Land, Long> {
    @Query("SELECT l FROM Land l WHERE l.user.id = :userId AND l.isDeleted != true")
    List<Land> fetchUserLands(@Param("userId") Long userId);

    @Query("SELECT l FROM Land l WHERE l.adaNo = :adaNo AND l.parcelNo = :parcelNo AND l.isDeleted = false")
    Land checkAdaParcelExists(@Param("adaNo") Long adaNo, @Param("parcelNo") Long parcelNo);
}