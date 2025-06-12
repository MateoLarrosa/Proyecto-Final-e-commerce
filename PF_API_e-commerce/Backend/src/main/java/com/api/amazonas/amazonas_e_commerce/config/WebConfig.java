package com.api.amazonas.amazonas_e_commerce.config;

// import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // aplica a todos los endpoints
                .allowedOrigins("http://localhost:5173") // origen de tu frontend
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // métodos permitidos
                .allowedHeaders("*") // permitir todos los headers
                .allowCredentials(true); // permitir cookies/autenticación si la hay
    }
}

