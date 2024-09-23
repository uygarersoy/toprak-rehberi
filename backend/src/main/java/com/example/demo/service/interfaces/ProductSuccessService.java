package com.example.demo.service.interfaces;

import com.example.demo.dto.ProductSuccessDTO;
import com.example.demo.entity.ProductSuccess;
import java.util.List;

public interface ProductSuccessService {
    ProductSuccess saveProductSuccess(ProductSuccess productSuccess);
    void updateSuccessTable(Double increase, ProductSuccess productSuccess);
    List<ProductSuccessDTO> fetchProductSuccessValues(Long neighborhoodId, String season);
    ProductSuccess getProductSuccess(Long neighborhoodId, Long productId);
    ProductSuccess calculateSuccessVal(Long neighborhoodId, Long productId, Integer satisfaction, Long area, String productName);
}