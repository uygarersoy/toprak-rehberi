package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import com.example.demo.entity.District;
import com.example.demo.entity.Neighborhood;

public interface NeighborhoodRepository extends JpaRepository<Neighborhood, Long> {
    @Query("SELECT n FROM Neighborhood n WHERE n.district = :district")
    List<Neighborhood> getByDistrict(@Param("district") District district);
}
