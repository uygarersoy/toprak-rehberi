package com.example.demo.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String userName;
    private String email;
    private String token;

    public UserDTO(Long id, String userName, String email) {
        this.id = id;
        this.userName = userName;
        this.email = email;
    }

    public UserDTO(Long id, String userName, String email, String token) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.token = token;
    }

    public String getUserName() {
        return this.userName;
    }

    public String getEmail() {
        return this.email;
    }

    public String getToken() {
        return this.token;
    }

    public Long getId() {
        return this.id;
    }
}