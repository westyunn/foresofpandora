package com.ssafy.forest.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.KakaoOauthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final KakaoOauthService kakaoOauthService;

    @GetMapping("/auth/kakaologin")
    public ResponseDto<?> kakaoLogin(@RequestParam("code") String code, HttpServletResponse response,
        HttpServletRequest request) throws JsonProcessingException {
        return kakaoOauthService.kakaoLogin(code, response, request);
    }

}
