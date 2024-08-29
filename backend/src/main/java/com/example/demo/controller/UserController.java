package com.example.demo.controller;

import com.example.demo.config.jwt.JwtService;
import com.example.demo.dto.UserDTO;
import com.example.demo.entity.User;
import com.example.demo.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private UserDTO convertToUserDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail());
    }

    private UserDTO convertToUserDTO(User user, String token) {
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), token);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<User> users = userService.fetchAllUsers();
        List<UserDTO> userDTOs = users.stream().map(user -> convertToUserDTO(user)).toList();
        return new ResponseEntity<>(userDTOs, HttpStatus.OK);
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        User user = userService.findUser(id);
        if (user != null) {
            return new ResponseEntity<>(convertToUserDTO(user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<UserDTO> saveUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return new ResponseEntity<>(convertToUserDTO(savedUser), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginControl(@RequestParam String userName, @RequestParam String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, password));
        User user = userService.loginCredentials(userName);
        if (user != null) {
            String jwt = jwtService.generateToken(user);
            return new ResponseEntity<>(convertToUserDTO(user, jwt), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> createUser(@RequestBody User user) {
        int check = userService.registerCredentials(user);
        if (check == -1) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        else if (check == 1) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        String jwt = jwtService.generateToken(user);
        return new ResponseEntity<>(convertToUserDTO(user, jwt), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<UserDTO> updatePassword(
        @RequestParam String userName,
        @RequestParam String currentPassword,
        @RequestParam String newPassword ) {
        
        User user = userService.updateUser(userName, currentPassword, newPassword);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String jwt = jwtService.generateToken(user);
        return new ResponseEntity<>(convertToUserDTO(user, jwt), HttpStatus.OK);
    }
}