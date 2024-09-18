package com.example.demo.service.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.FractionDTO;
import com.example.demo.entity.Fraction;
import com.example.demo.entity.Product;
import com.example.demo.repository.FractionRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.interfaces.FractionService;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class FractionServiceImp implements FractionService{
    
    @Autowired
    private FractionRepository fractionRepository;
    @Autowired
    private ProductRepository productRepository;


    @Override
    public Fraction saveFraction(Fraction fraction) {
        Fraction newFraction = fractionRepository.save(fraction);
        return newFraction;
    }

    @Override
    public void updateFractionTable(Double increase, Fraction fraction) {
        Double newPercentage = fraction.getPercentage() + increase;
        if (newPercentage >= 95) {
            newPercentage = 95.0;
        }
        else if (newPercentage <= 5) {
            newPercentage = 5.0;
        }
        fraction.setPercentage(newPercentage);
        this.saveFraction(fraction);
    }

    @Override
    public List<FractionDTO> fetchFractions(Long neighborhoodId, String season) {
        List<FractionDTO> fractionDTOs = new ArrayList<>();
        List<Fraction> fractions = fractionRepository.fetchFractions(neighborhoodId);
        for (Fraction fraction : fractions) {
            Product product = productRepository.findById(fraction.getProductId()).orElse(null);
            if (product.getSuggestedPlantingSeason().equals(season)) {
                fractionDTOs.add(new FractionDTO(
                    fraction.getId(), 
                    fraction.getProductId(),
                    product.getProductName(),
                    Math.round(fraction.getPercentage() * 100.0) / 100.0,
                    product.getType(),
                    product.getSuggestedPlantingSeason()));
            }
        }
        fractionDTOs.sort(Comparator.comparingDouble(FractionDTO::getPercentage).reversed());
        return fractionDTOs;
    }

    @Override
    public Fraction getFraction(Long neighborhoodId, Long productId) {
        return fractionRepository.getFraction(neighborhoodId, productId);
    }

    @Override
    public Fraction calculateFractionVal(Long neighborhoodId, Long productId, Integer satisfaction, Long area, String productName) {
        Fraction fraction = this.getFraction(neighborhoodId, productId);
        if (fraction == null) {
            Double percentage = (satisfaction == 3) ? 80.0 : ((satisfaction == 2) ? 60.0 : 30.0);
            Fraction newFraction = new Fraction();
            newFraction.setNeighborhoodId(neighborhoodId);
            newFraction.setProductId(productId);
            newFraction.setPercentage(percentage);
            this.saveFraction(newFraction);
            return newFraction;
        }
        else {
            int flag = (satisfaction == 1) ? -1 : 1;
            Double increase = (area / 2000.0) * (flag * satisfaction / 6.0);
            this.updateFractionTable(increase, fraction);
            return fraction;
        }
    }

}