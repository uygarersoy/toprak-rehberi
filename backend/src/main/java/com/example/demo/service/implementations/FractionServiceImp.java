package com.example.demo.service.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Fraction;
import com.example.demo.repository.FractionRepository;
import com.example.demo.service.interfaces.FractionService;
import java.util.List;

@Service
public class FractionServiceImp implements FractionService{
    
    @Autowired
    private FractionRepository fractionRepository;


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
    public List<Fraction> fetchFractions(Long neighborhoodId) {
        return fractionRepository.fetchFractions(neighborhoodId);
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
            newFraction.setProductName(productName);
            this.saveFraction(newFraction);
            return newFraction;
        }
        else {
            int flag = area == 1 ? -1 : 1;
            Double increase = (area / 2000.0) * (flag * satisfaction / 6.0);
            this.updateFractionTable(increase, fraction);
            return fraction;
        }
    }

}