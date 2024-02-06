package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.response.MemberResDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.AuthService;
import com.ssafy.forest.service.KakaoOauthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Auth API", description = "회원 인증 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final KakaoOauthService kakaoOauthService;
    private final AuthService authService;

    @Operation(summary = "카카오 로그인", description = "인가코드로 카카오 서버에 사용자 정보 요청")
    @GetMapping("/login/kakao")
    public ResponseDto<MemberResDto> kakaoLogin(
        @RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) {
        return ResponseDto.success(kakaoOauthService.kakaoLogin(code, request, response));
    }

    @Operation(summary = "로그아웃", description = "리프레시 토큰을 블랙리스트에 등록함으로써 인증 차단")
    @PostMapping("/logout")
    public ResponseDto<String> logout(HttpServletRequest request) {
        authService.logout(request);
        return ResponseDto.success("SUCCESS");
    }

    @Operation(summary = "회원탈퇴", description = "회원 상태 비활성화 및 소셜로그인 연동 해제")
    @DeleteMapping("/withdrawal")
    public ResponseDto<String> withdrawal(HttpServletRequest request) {
        authService.withdrawal(request);
        return ResponseDto.success("SUCCESS");
    }

}