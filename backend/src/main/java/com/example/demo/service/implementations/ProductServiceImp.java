package com.example.demo.service.implementations;

import java.text.Collator;
import java.util.List;
import java.util.Locale;
import java.util.Random;

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
        Random random = new Random();
        String[] unitsOfHarvest = {"kg", "adet", "demet", "kök", "bağ", "baş"};
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
            product.setDurationTillHarvest(15 + random.nextInt(166));
            product.setUnitOfHarvest(unitsOfHarvest[random.nextInt(unitsOfHarvest.length)]);
            productRepository.save(product);
        }
    }

    @Override
    public List<Product> fetchByType(String type) {
        List<Product> products = productRepository.fetchByTpe(type);
        Collator turkishCollator = Collator.getInstance(new Locale("tr", "TR"));
        turkishCollator.setStrength(Collator.PRIMARY);
        turkishCollator.setDecomposition(Collator.CANONICAL_DECOMPOSITION);
        products.sort((p1, p2) -> turkishCollator.compare(p1.getProductName().toLowerCase(), p2.getProductName().toLowerCase()));
        return products;
    }
}