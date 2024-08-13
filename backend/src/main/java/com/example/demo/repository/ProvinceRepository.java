package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Province;


public interface ProvinceRepository extends JpaRepository<Province, Long>{
    boolean existsByProvinceName(String provinceName);
}