package com.example.demo.service.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Field;
import com.example.demo.repository.FieldRepository;
import com.example.demo.service.interfaces.FieldService;
import java.util.List;

@Service
public class FieldServiceImp implements FieldService {
 
    @Autowired
    private FieldRepository fieldRepository;

    @Override
    public Field saveField(Field field) {
        return fieldRepository.save(field);
    }

    @Override
    public List<Field> fetchAllFields() {
        return fieldRepository.findAll();
    }

    @Override
    public Field findField(Long id) {
        return fieldRepository.findById(id).orElse(null);
    }  
    
    @Override
    public void deleteField(Long id) {
        fieldRepository.deleteById(id);;
    }
}