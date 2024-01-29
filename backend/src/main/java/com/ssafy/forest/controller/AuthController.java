package com.ssafy.forest.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.forest.domain.dto.response.MemberResDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.KakaoOauthService;
import com.ssafy.forest.service.TestService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

//@RestController
@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final KakaoOauthService kakaoOauthService;
    private final TestService testService;

    @GetMapping("/index")
    public String index() {
        return "loginForm";
    }

    @GetMapping("/success")
    public String success() {
        return "loginSuccess";
    }

    @GetMapping("/kakao")
    @ResponseBody
    public ResponseDto<MemberResDto> kakaoLogin(@RequestParam("code") String code,
        HttpServletRequest request, HttpServletResponse response) throws JsonProcessingException {
        return ResponseDto.success(kakaoOauthService.kakaoLogin(code, request, response));
    }

    @GetMapping("/test")
    @ResponseBody
    public ResponseDto<MemberResDto> getMemberFromAccessToken(HttpServletRequest request) {
        return ResponseDto.success(testService.getMemberFromAccessToken(request));
    }

}