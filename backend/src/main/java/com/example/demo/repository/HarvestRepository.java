package com.example.demo.repository;

import com.example.demo.entity.Harvest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HarvestRepository extends JpaRepository<Harvest, Long> {
    
}
