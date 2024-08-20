package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.fetchAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.findUser(id);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginControl(@RequestParam String userName, @RequestParam String password) {
        User user = userService.loginCredentials(userName, password);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        int check = userService.registerCredentials(user);
        if (check == -1) {
            return new ResponseEntity<>("UserName Exists", HttpStatus.CONFLICT);
        }
        else if (check == 1) {
            return new ResponseEntity<>("Email Exists", HttpStatus.CONFLICT);
        }
        userService.saveUser(user);
        return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updatePassword(
        @RequestParam String userName,
        @RequestParam String email,
        @RequestParam String currentPassword,
        @RequestParam String newPassword ) {
        
        User user = userService.updateUser(userName, currentPassword);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }

        user.setPassword(newPassword);
        userService.saveUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}