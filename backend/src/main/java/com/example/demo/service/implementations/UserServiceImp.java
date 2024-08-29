package com.example.demo.service.implementations;

import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import com.example.demo.entity.User;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService{
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    /*@Autowired
    private PasswordEncoder passwordEncoder;*/

    @Override
    public User saveUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
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
    public User loginCredentials(String userName) {
        //String encodedPassword = passwordEncoder.encode(password);
        return userRepository.loginUser(userName);
    }

    @Override
    public int registerCredentials(User user) {
        User checkUserName = userRepository.checkUserName(user.getUsername());
        if (checkUserName != null) {
            return -1; //userName exists
        }
        User checkEmail = userRepository.checkEmail(user.getEmail());
        if (checkEmail != null) {
            return 1; //email exists
        }
        this.saveUser(user);
        return 0; //we are good
    }

    @Override
    public User updateUser(String userName, String password, String newPassword) {
        //String encodedPassword = passwordEncoder.encode(password);
        User user =  userRepository.updateUser(userName, password);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(newPassword));
            this.saveUser(user);
        }
        return user;
    }
}