package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.userName = :userName AND u.password = :password")  
    User loginUser(@Param("userName") String userName, @Param("password") String password);

    @Query("SELECT u FROM User u WHERE u.userName = :userName")
    User checkUserName(@Param("userName") String userName);

    @Query("SELECT u FROM User u WHERE u.email = :email")
    User checkEmail(@Param("email") String email);

    @Query("SELECT u FROM User u WHERE u.userName = :userName AND u.password = :password")
    User updateUser(@Param("userName") String userName, @Param("password") String password);
}