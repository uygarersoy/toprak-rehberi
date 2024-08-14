package com.example.demo.service.interfaces;

import java.util.List;
import com.example.demo.entity.Product;

public interface ProductService {
    void populateProductTable(String type, List<String> productNames);
    List<Product> fetchByType(String type);
}