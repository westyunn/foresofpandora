package com.ssafy.forest.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.KakaoOauthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

//@RestController
@Controller
@RequiredArgsConstructor
public class AuthController {

    private final KakaoOauthService kakaoOauthService;

    @GetMapping("/index")
    public String index() {
        return "loginForm";
    }

    @GetMapping("/auth/kakao")
    @ResponseBody
    public ResponseDto<?> kakaoLogin(@RequestParam("code") String code,
        HttpServletRequest request, HttpServletResponse response) throws JsonProcessingException {
        return ResponseDto.success(kakaoOauthService.kakaoLogin(code, request, response));
    }

}