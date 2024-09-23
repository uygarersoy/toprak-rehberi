package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.dto.ProductSuccessDTO;
import com.example.demo.entity.ProductSuccess;
import com.example.demo.service.interfaces.ProductSuccessService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/product-success")
public class ProductSuccessController {
    
    @Autowired ProductSuccessService productSuccessService;


    @GetMapping("/guide")
    public ResponseEntity<List<ProductSuccessDTO>> getGuidenceForLand(@RequestParam Long neighborhoodId, @RequestParam String season) {
        return new ResponseEntity<>(productSuccessService.fetchProductSuccessValues(neighborhoodId, season), HttpStatus.OK);
    }
    
    @PutMapping("/update")
    public ResponseEntity<ProductSuccess> updateSuccessVAlueAfterHarvest(
        @RequestParam Long neighborhoodId,
        @RequestParam Long productId,
        @RequestParam Integer satisfaction,
        @RequestParam Long area,
        @RequestParam String productName ) {
        
        ProductSuccess productSuccess = productSuccessService.calculateSuccessVal(neighborhoodId, productId, satisfaction, area, productName);
        return new ResponseEntity<>(productSuccess, HttpStatus.OK);
    }

    @GetMapping("/get-success-value")
    public ResponseEntity<?> getProductSuccessForNeighborhood(@RequestParam Long neighborhoodId, @RequestParam Long productId) {
        ProductSuccess productSuccess = productSuccessService.getProductSuccess(neighborhoodId, productId);
        if (productSuccess != null) {
            return new ResponseEntity<>(productSuccess, HttpStatus.OK);
        }
        return new ResponseEntity<>("There is no record for this product.", HttpStatus.OK);
    }
}