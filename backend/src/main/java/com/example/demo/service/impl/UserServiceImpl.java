package com.example.demo.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import com.example.demo.entity.User;
import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final String passwordRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])(?!.*\\s).{8,}$";
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
        if (!this.isStrongPassword(user.getPassword())) {
            return 2;
        }
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
        User user =  userRepository.loginUser(userName);
        if (user != null) {
            if (!passwordEncoder.matches(password, user.getPassword())) {
                return null;
            } else if (this.isStrongPassword(newPassword)) {
                user.setPassword(newPassword);
                return this.saveUser(user);                
            }
            return user;
        }
        return user;
    }

    @Override
    public boolean isStrongPassword(String password) {
        Pattern pattern = Pattern.compile(passwordRegex);
        return pattern.matcher(password).matches();
    }
}