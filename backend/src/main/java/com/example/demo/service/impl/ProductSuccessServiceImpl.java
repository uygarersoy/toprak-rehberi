package com.example.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.dto.ProductSuccessDTO;
import com.example.demo.entity.ProductSuccess;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductSuccessRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.interfaces.ProductSuccessService;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class ProductSuccessServiceImpl implements ProductSuccessService{
    
    @Autowired
    private ProductSuccessRepository productSuccessRepository;
    @Autowired
    private ProductRepository productRepository;


    @Override
    public ProductSuccess saveProductSuccess(ProductSuccess productSuccess) {
        ProductSuccess newSuccess = productSuccessRepository.save(productSuccess);
        return newSuccess;
    }

    @Override
    public void updateSuccessTable(Double increase, ProductSuccess productSuccess) {
        Double newPercentage = productSuccess.getPercentage() + increase;
        if (newPercentage >= 95) {
            newPercentage = 95.0;
        }
        else if (newPercentage <= 5) {
            newPercentage = 5.0;
        }
        productSuccess.setPercentage(newPercentage);
        this.saveProductSuccess(productSuccess);
    }

    @Override
    public List<ProductSuccessDTO> fetchProductSuccessValues(Long neighborhoodId, String season) {
        List<ProductSuccessDTO> productSuccessDTOs = new ArrayList<>();
        List<ProductSuccess> productSuccessValues = productSuccessRepository.fetchSuccessValues(neighborhoodId);
        for (ProductSuccess productSuccess : productSuccessValues) {
            Product product = productRepository.findById(productSuccess.getProductId()).orElse(null);
            if (product.getSuggestedPlantingSeason().equals(season)) {
                productSuccessDTOs.add(new ProductSuccessDTO(
                    productSuccess.getId(), 
                    productSuccess.getProductId(),
                    product.getProductName(),
                    Math.round(productSuccess.getPercentage() * 100.0) / 100.0,
                    product.getType(),
                    product.getSuggestedPlantingSeason()));
            }
        }
        productSuccessDTOs.sort(Comparator.comparingDouble(ProductSuccessDTO::getPercentage).reversed());
        return productSuccessDTOs;
    }

    @Override
    public ProductSuccess getProductSuccess(Long neighborhoodId, Long productId) {
        return productSuccessRepository.getSuccessValueForProduct(neighborhoodId, productId);
    }

    @Override
    public ProductSuccess calculateSuccessVal(Long neighborhoodId, Long productId, Integer satisfaction, Long area, String productName) {
        ProductSuccess productSuccess = this.getProductSuccess(neighborhoodId, productId);
        if (productSuccess == null) {
            Double percentage = (satisfaction == 3) ? 80.0 : ((satisfaction == 2) ? 60.0 : 30.0);
            ProductSuccess newProductSuccess = new ProductSuccess();
            newProductSuccess.setNeighborhoodId(neighborhoodId);
            newProductSuccess.setProductId(productId);
            newProductSuccess.setPercentage(percentage);
            this.saveProductSuccess(newProductSuccess);
            return newProductSuccess;
        }
        else {
            int flag = (satisfaction == 1) ? -1 : 1;
            Double increase = (area / 2000.0) * (flag * satisfaction / 6.0);
            this.updateSuccessTable(increase, productSuccess);
            return productSuccess;
        }
    }
}