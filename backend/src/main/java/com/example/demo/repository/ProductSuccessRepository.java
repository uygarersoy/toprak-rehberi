package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.demo.entity.ProductSuccess;

public interface ProductSuccessRepository extends JpaRepository<ProductSuccess, Long>{
    @Query("SELECT p FROM ProductSuccess p WHERE p.neighborhoodId = :neighborhoodId")
    List<ProductSuccess> fetchSuccessValues(@Param("neighborhoodId") Long neighborhoodId);

    @Query("SELECT p FROM ProductSuccess p WHERE p.neighborhoodId = :neighborhoodId AND p.productId = :productId")
    ProductSuccess getSuccessValueForProduct(@Param("neighborhoodId") Long neighborhoodId, @Param("productId") Long productId);
}