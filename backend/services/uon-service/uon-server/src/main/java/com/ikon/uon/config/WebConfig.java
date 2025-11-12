package com.ikon.uon.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")   // restrict to API endpoints
                        .allowedOrigins("http://localhost:3000") // your Next.js frontend
                        .allowedMethods("GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS")
                        .allowedHeaders("*") // allow all headers
                        .allowCredentials(true); // if using cookies/auth
            }
        };
    }
}
