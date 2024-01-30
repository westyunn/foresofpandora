package com.ssafy.forest.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.forest.domain.dto.response.MemberResDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.AuthService;
import com.ssafy.forest.service.KakaoOauthService;
import com.ssafy.forest.service.TestService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final KakaoOauthService kakaoOauthService;
    private final AuthService authService;
    private final TestService testService;

    @GetMapping("/login/kakao")
    public ResponseDto<MemberResDto> kakaoLogin(@RequestParam("code") String code,
        HttpServletRequest request, HttpServletResponse response) throws JsonProcessingException {
        return ResponseDto.success(kakaoOauthService.kakaoLogin(code, request, response));
    }

    @PostMapping("/logout")
    public ResponseDto<String> logout(HttpServletRequest request) {
        authService.logout(request);
        return ResponseDto.success("SUCCESS");
    }

}