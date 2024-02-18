package com.ssafy.forest.service;

import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.repository.RefreshTokenRepository;
import com.ssafy.forest.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final KakaoOauthService kakaoOauthService;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final TokenProvider tokenProvider;

    // 로그아웃
    @Transactional
    public void logout(HttpServletRequest request) {
        tokenProvider.getMemberFromAccessToken(request);
        refreshTokenRepository.delete(request.getHeader("RefreshToken"));
    }

    // 회원 탈퇴
    @Transactional
    public void withdrawal(HttpServletRequest request) {
        Member member = tokenProvider.getMemberFromAccessToken(request);

        kakaoOauthService.unlink(member.getKakaoRefreshToken());

        refreshTokenRepository.delete(request.getHeader("RefreshToken"));
        memberRepository.delete(member);
    }

    public Member getMember(HttpServletRequest request) {
        return tokenProvider.getMemberFromAccessToken(request);
    }

}