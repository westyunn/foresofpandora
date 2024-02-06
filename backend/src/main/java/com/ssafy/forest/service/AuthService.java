package com.ssafy.forest.service;

import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.repository.MemberRepository;
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
    private final TokenProvider tokenProvider;

    // 로그아웃
    @Transactional
    public void logout(HttpServletRequest request) {
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);
        tokenProvider.deleteRefreshToken(memberFromAccessToken);
        tokenProvider.saveBlacklistToken(request);
    }

    // 회원 탈퇴
    @Transactional
    public void withdrawal(HttpServletRequest request) {
        Member member = tokenProvider.getMemberFromAccessToken(request);

        kakaoOauthService.unlink(member.getKakaoRefreshToken());

        tokenProvider.deleteRefreshToken(member);
        tokenProvider.saveBlacklistToken(request);
        memberRepository.delete(member);
    }

}