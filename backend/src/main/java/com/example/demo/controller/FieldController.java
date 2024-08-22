package com.example.demo.controller;

import java.util.List;
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
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/field")
@CrossOrigin(origins="http://localhost:3000")
public class FieldController {
    
    @Autowired
    private FieldService fieldService;

    @DeleteMapping("/{field-id}")
    public ResponseEntity<Long> removeField(@PathVariable("field-id") Long fieldId) {
        fieldService.deleteField(fieldId);
        return new ResponseEntity<>(fieldId, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Field> addField(@RequestBody Field field) {
        Field savedField = fieldService.addField(field);
        return new ResponseEntity<>(savedField, HttpStatus.CREATED);
    }

    @PostMapping("/fetch-user-fields")
    public ResponseEntity<List<Field>> fetchUserFields(@RequestBody User user) {
        return new ResponseEntity<>(fieldService.fetchUserFields(user.getId()), HttpStatus.OK);
    }
}