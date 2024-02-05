package com.ssafy.forest.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

@OpenAPIDefinition(
    info = @Info(
        title = "[판도라의 숲] API 명세서",
        description = "REST API",
        version = "1.0.0"
    )
)
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        String key = "Access Token (Bearer)";
        String refreshKey = "Refresh Token";

        SecurityRequirement securityRequirement = new SecurityRequirement()
            .addList(key)
            .addList(refreshKey);

        SecurityScheme accessTokenSecurityScheme = new SecurityScheme()
            .type(SecurityScheme.Type.HTTP)
            .scheme("bearer")
            .bearerFormat("JWT")
            .in(SecurityScheme.In.HEADER)
            .name(HttpHeaders.AUTHORIZATION);

        SecurityScheme refreshTokenSecurityScheme = new SecurityScheme()
            .type(SecurityScheme.Type.APIKEY)
            .in(SecurityScheme.In.HEADER)
            .name("RefreshToken");

        Components components = new Components()
            .addSecuritySchemes(key, accessTokenSecurityScheme)
            .addSecuritySchemes(refreshKey, refreshTokenSecurityScheme);

        return new OpenAPI()
            .addSecurityItem(securityRequirement)
            .components(components);
    }

}