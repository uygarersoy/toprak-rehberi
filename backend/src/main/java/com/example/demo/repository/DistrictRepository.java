package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import com.example.demo.entity.District;
import com.example.demo.entity.Province;

public interface DistrictRepository extends JpaRepository<District, Long> {
    @Query("SELECT d FROM District d WHERE d.province = :province")
    List<District> getByProvince(@Param("province") Province province);
}
