package com.example.demo.service.interfaces;

import java.util.List;
import com.example.demo.entity.User;

public interface UserService {
    User saveUser(User user);
    List<User> fetchAllUsers();
    User findUser(Long id);
    //User findByEmail(String email);
    User loginCredentials(String userName, String password);
    int registerCredentials(User user);
    User updateUser(String userName, String password);
}