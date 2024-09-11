package com.example.demo.service.interfaces;

import com.example.demo.entity.Field;

import java.util.List;
public interface FieldService {
    Field saveField(Field field);
    List<Field> fetchAllFields();
    Field findField(Long id);
    void deleteField(Long id);
    Field addField(Field field);
    List<Field> fetchUserFields(Long userId);
    List<String> fetchFieldTypes();
}