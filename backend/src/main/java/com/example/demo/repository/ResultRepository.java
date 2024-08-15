package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
/*import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
*/
import com.example.demo.entity.Result;

public interface ResultRepository extends JpaRepository<Result, Long> {
    /*@Query("SELECT r FROM Result r WHERE r.neighborhoodId = :neighborhoodId AND r.product.id = :productId")
    Result checkExists(@Param("neighborhoodId") Long neighborhoodId, @Param("productId") Long productId);
    */
}