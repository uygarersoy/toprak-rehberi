package com.example.demo.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.interfaces.FieldService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.demo.entity.Field;
import com.example.demo.entity.User;
import com.example.demo.service.interfaces.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/field")
@CrossOrigin(origins="http://localhost:3000")
public class FieldController {
    
    @Autowired
    private FieldService fieldService;
    @Autowired
    private UserService userService;

    @DeleteMapping("/{field-id}")
    public ResponseEntity<Long> removeField(@PathVariable("field-id") Long fieldId) {
        fieldService.deleteField(fieldId);
        return new ResponseEntity<>(fieldId, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Field> addField(@RequestBody Field field) {
        User user = userService.findUser(field.getUser().getId());
        field.setUser(user);
        Field savedField = fieldService.saveField(field);
        return new ResponseEntity<>(savedField, HttpStatus.CREATED);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Field>> getFields() {
        List<Field> fields = fieldService.fetchAllFields();
        return new ResponseEntity<>(fields, HttpStatus.OK);
    }

    @PostMapping("/fetch-user-fields")
    public ResponseEntity<List<Field>> postMethodName(@RequestBody User user) {
        List<Field> userFields = new ArrayList<>();
        for (Field field : fieldService.fetchAllFields()) {
            if (field.getUser().getId() == user.getId()) {
                userFields.add(field);
            }
        }
        if (userFields.size() != 0) {
            return new ResponseEntity<>(userFields, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}