package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.service.interfaces.FieldService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.demo.dto.UserDTO;
import com.example.demo.entity.Field;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/field")
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
    public ResponseEntity<List<Field>> fetchUserFields(@RequestBody UserDTO user) {
        return new ResponseEntity<>(fieldService.fetchUserFields(user.getId()), HttpStatus.OK);
    }

    @GetMapping("/field-type")
    public List<String> getFieldTypes() {
        return fieldService.fetchFieldTypes();
    }

    @PutMapping("/update-field")
    public ResponseEntity<Field> updateField(
        @RequestParam int sign,
        @RequestParam int area,
        @RequestParam Long fieldId) {
        Field field = fieldService.findField(fieldId);
        field.setAvailableArea(field.getAvailableArea() + sign * area);
        fieldService.saveField(field);
        return new ResponseEntity<>(field, HttpStatus.OK);  
    }
}