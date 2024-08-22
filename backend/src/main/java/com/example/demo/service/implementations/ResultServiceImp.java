package com.example.demo.service.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.ResultRepository;
import com.example.demo.service.interfaces.ResultService;
import com.example.demo.entity.Result;

@Service
public class ResultServiceImp implements ResultService {
    
    @Autowired
    private ResultRepository resultRepository;

    @Override
    public void saveResult(Result result) {
        resultRepository.save(result);
    }
}