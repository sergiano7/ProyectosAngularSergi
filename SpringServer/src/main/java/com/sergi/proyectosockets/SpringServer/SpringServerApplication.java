package com.sergi.proyectosockets.SpringServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication(scanBasePackages = {"com.sergi.proyectosockets.SpringServer.config",
		"com.sergi.proyectosockets.SpringServer.controller",
		"com.sergi.proyectosockets.SpringServer.models",
		"com.sergi.proyectosockets.SpringServer.services",
})
@EnableMongoRepositories(basePackages = "com.sergi.proyectosockets.SpringServer.repositories")
public class SpringServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringServerApplication.class, args);
	}
}
