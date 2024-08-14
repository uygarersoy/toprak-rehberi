package com.example.demo.service.interfaces;
import java.util.Map;
import java.util.List;

public interface PopulateTableService {
    void populate(Map<String, Map<String, List<String>>> data);
}
