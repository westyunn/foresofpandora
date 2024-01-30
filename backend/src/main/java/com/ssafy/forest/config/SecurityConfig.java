package com.ssafy.forest.config;

import com.ssafy.forest.exception.AccessDeniedHandlerException;
import com.ssafy.forest.exception.AuthenticationEntryPointException;
import com.ssafy.forest.security.JwtFilter;
import com.ssafy.forest.security.TokenProvider;
import com.ssafy.forest.service.UserDetailsServiceImpl;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.autoconfigure.security.ConditionalOnDefaultWebSecurity;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@ConditionalOnDefaultWebSecurity
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
public class SecurityConfig {

    @Value("${jwt.secret}")
    String SECRET_KEY;
    private final TokenProvider tokenProvider;
    private final UserDetailsServiceImpl userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Order(SecurityProperties.BASIC_AUTH_ORDER)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(CsrfConfigurer::disable)  // REST API 방식이므로 CSRF 보안 토큰 생성 기능 종료
            .headers((headerConfig) ->
                headerConfig.frameOptions(FrameOptionsConfig::disable)
            )
            .sessionManagement(configurer -> configurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests((authorizeRequests) ->
                authorizeRequests
                    .requestMatchers("/", "/index").permitAll()
                    .requestMatchers("/auth/**").permitAll()
                    .anyRequest().permitAll()
            )
            .exceptionHandling(authenticationManager -> authenticationManager
                .authenticationEntryPoint(new AuthenticationEntryPointException())
                .accessDeniedHandler(new AccessDeniedHandlerException()))
            .addFilterBefore(new JwtFilter(SECRET_KEY, tokenProvider, userDetailsService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // CORS 허용 관련 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.setAllowedOrigins(Arrays.asList(
            "http://localhost",
            "http://localhost:3000"
        ));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setExposedHeaders(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList(
            HttpMethod.GET.name(),
            HttpMethod.POST.name(),
            HttpMethod.DELETE.name(),
            HttpMethod.PUT.name(),
            HttpMethod.HEAD.name(),
            HttpMethod.OPTIONS.name()
        ));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}