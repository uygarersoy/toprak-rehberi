package com.example.demo;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.service.interfaces.PopulateTableService;
import com.example.demo.service.interfaces.ProductService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

	@Autowired
	private PopulateTableService service;

	@Autowired
	private ProductService productService;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		String path = "C:\\Users\\UYGAR ERSOY\\Desktop\\data.json";
		ObjectMapper mapper = new ObjectMapper();
		try {
			Map<String, Map<String, List<String>>> data = mapper.readValue(new File(path), new TypeReference<Map<String, Map<String, List<String>>>>(){});
			service.populate(data);
		}
		catch (IOException err) {
			err.printStackTrace();
		}

		List<String> fruit = readLines("C:\\Users\\UYGAR ERSOY\\Desktop\\meyve.txt");
		productService.populateProductTable("MEYVE", fruit);
		List<String> vegetables = readLines("C:\\Users\\UYGAR ERSOY\\Desktop\\sebze.txt");
		productService.populateProductTable("SEBZE", vegetables);
		List<String> cereal = readLines("C:\\Users\\UYGAR ERSOY\\Desktop\\tahil.txt");
		productService.populateProductTable("TAHIL", cereal);
		List<String> ornamental = readLines("C:\\Users\\UYGAR ERSOY\\Desktop\\sus_bitkileri.txt");
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