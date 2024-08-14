package com.example.demo.service.implementations;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.interfaces.ProductService;

@Service
public class ProductServiceImp implements ProductService{
    
    @Autowired
    private ProductRepository productRepository;

    @Override
    public void populateProductTable(String type, List<String> productNames) {
        List<Product> allProducts = productRepository.findAll();

        for (String productString : productNames) {
            boolean check = false;
            for (Product p : allProducts) {
                if (p.getProductName().equals(productString) && type.equals(p.getType())) {
                    check = true;
                    break;
                }
            }
            
            if (check) {
                continue;
            }

            Product product = new Product();
            product.setType(type);
            product.setProductName(productString);
            productRepository.save(product);
        }
    }

    @Override
    public List<Product> fetchByType(String type) {
        List<Product> allProducts = productRepository.findAll();
        List<Product> res = new ArrayList<>();

        for (Product product : allProducts) {
            if (product.getType().equals(type)) {
                res.add(product);
            }
        }
        return res;
    }
}