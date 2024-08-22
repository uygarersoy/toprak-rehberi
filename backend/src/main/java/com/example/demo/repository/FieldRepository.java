package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import com.example.demo.entity.Field;

public interface FieldRepository extends JpaRepository<Field, Long> {
    @Query("SELECT f FROM Field f WHERE f.user.id = :userId")
    List<Field> fetchUserFields(@Param("userId") Long userId);
}