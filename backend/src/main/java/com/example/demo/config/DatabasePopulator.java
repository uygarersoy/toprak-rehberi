package com.example.demo.config;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.service.interfaces.PopulateTableService;
import com.example.demo.service.interfaces.ProductService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class DatabasePopulator implements CommandLineRunner{
    @Autowired
	private PopulateTableService service;

	@Autowired
	private ProductService productService;
    
    @Override
	public void run(String... args) throws Exception {
		String path = "src/main/java/com/example/demo/config/locationData/data.json";
		ObjectMapper mapper = new ObjectMapper();
		try {
			Map<String, Map<String, List<String>>> data = mapper.readValue(new File(path), new TypeReference<Map<String, Map<String, List<String>>>>(){});
			service.populate(data);
		}
		catch (IOException err) {
			err.printStackTrace();
		}

		List<String> fruit = readLines("src/main/java/com/example/demo/config/products/meyve.txt");
		productService.populateProductTable("MEYVE", fruit);
		List<String> vegetables = readLines("src/main/java/com/example/demo/config/products/sebze.txt");
		productService.populateProductTable("SEBZE", vegetables);
		List<String> cereal = readLines("src/main/java/com/example/demo/config/products/tahil.txt");
		productService.populateProductTable("TAHIL", cereal);
		List<String> ornamental = readLines("src/main/java/com/example/demo/config/products/sus_bitkileri.txt");
		productService.populateProductTable("SÜS BİTKİSİ", ornamental);
	}

	public static List<String> readLines(String filePath) {
		try {
	        File file = new File(filePath);
	        Scanner scanner = new Scanner(file, "UTF-8");
	        List<String> lines = new ArrayList<>();
	        while (scanner.hasNextLine()) {
	            String data = scanner.nextLine();
	            lines.add(data);
	        }
	        scanner.close();
	        return lines;
        } catch (FileNotFoundException e) {
	        e.printStackTrace();
	        return null;
        }
	}
}