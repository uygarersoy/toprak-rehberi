package com.example.demo.service.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.UserRepository;
import com.example.demo.service.interfaces.UserService;
import com.example.demo.entity.User;
import java.util.List;

@Service
public class UserServiceImp implements UserService{
    
    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> fetchAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User loginCredentials(String userName, String password ) {
        return userRepository.loginUser(userName, password);
    }

    @Override
    public int registerCredentials(User user) {
        User checkUserName = userRepository.checkUserName(user.getUserName());
        if (checkUserName != null) {
            return -1; //userName exists
        }
        User checkEmail = userRepository.checkEmail(user.getEmail());
        if (checkEmail != null) {
            return 1; //email exists
        }
        return 0; //we are good
    }

    @Override
    public User updateUser(String userName, String password) {
        return userRepository.updateUser(userName, password);
    }




    /*@Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }*/
}