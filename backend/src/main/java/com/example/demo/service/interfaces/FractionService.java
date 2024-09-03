package com.example.demo.service.interfaces;

import com.example.demo.dto.FractionDTO;
import com.example.demo.entity.Fraction;
import java.util.List;

public interface FractionService {
    Fraction saveFraction(Fraction fraction);
    void updateFractionTable(Double increase, Fraction fraction);
    List<FractionDTO> fetchFractions(Long neighborhoodId);
    Fraction getFraction(Long neighborhoodId, Long productId);
    Fraction calculateFractionVal(Long neighborhoodId, Long productId, Integer satisfaction, Long area, String productName);
}