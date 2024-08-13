package com.example.demo;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.service.interfaces.PopulateTable;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

	@Autowired
	private PopulateTable service;

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
		
	}
}