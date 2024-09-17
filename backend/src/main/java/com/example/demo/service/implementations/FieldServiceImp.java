package com.example.demo.service.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import com.example.demo.entity.User;
import com.example.demo.entity.Field;
import com.example.demo.entity.Harvest;
import com.example.demo.enums.FieldType;
import com.example.demo.repository.FieldRepository;
import com.example.demo.repository.HarvestRepository;
//import com.example.demo.repository.UserRepository;
import com.example.demo.service.interfaces.FieldService;
import java.text.Collator;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class FieldServiceImp implements FieldService {
 
    @Autowired
    private FieldRepository fieldRepository;
    @Autowired
    private HarvestRepository harvestRepository;

    /*@Autowired
    private UserRepository userRepository;
*/
    @Override
    public Field saveField(Field field) {
        return fieldRepository.save(field);
    }

    @Override
    public List<Field> fetchAllFields() {
        return fieldRepository.findAll();
    }

    @Override
    public Field findField(Long id) {
        return fieldRepository.findById(id).orElse(null);
    }
    
    @Override
    public void deleteField(Long id) {
        //fieldRepository.deleteById(id);
        Field field = fieldRepository.findById(id).orElse(null);
        for (Harvest harvest : field.getHarvests()) {
            harvest.setIsDeleted(true);
            harvestRepository.save(harvest);
        }
        field.setIsDeleted(true);
        this.saveField(field);
    }

    @Override
    public Field addField(Field field) {
        //userRepository.findById(field.getUser().getId()).orElse(null);
        //field.setUser(user);
        Field checkFieldExists = fieldRepository.checkAdaParcelExists(field.getAdaNo(), field.getParcelNo());
        if (checkFieldExists == null) {
            return this.saveField(field);
        }
        return null;
    }

    @Override
    public List<Field> fetchUserFields(Long userId) {
        return fieldRepository.fetchUserFields(userId);
    }

    @Override
    public List<String> fetchFieldTypes() {
        Collator turkishCollator = Collator.getInstance(new Locale("tr", "TR"));
        turkishCollator.setStrength(Collator.PRIMARY);
        turkishCollator.setDecomposition(Collator.CANONICAL_DECOMPOSITION);
        return Arrays.stream(FieldType.values()).map(Enum::name).sorted(turkishCollator::compare).collect(Collectors.toList());
    }
}