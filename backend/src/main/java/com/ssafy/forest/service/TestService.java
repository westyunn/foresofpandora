package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.response.MemberResDto;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class TestService {

    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;

    public MemberResDto getMemberFromAccessToken(HttpServletRequest request) {
//        // 토큰으로부터 memberId만 조회(토큰의 유효성 검사 생략)
//        Long memberIdByToken = tokenProvider.getMemberIdByToken(request.getHeader("Authorization"));
//        Member member = memberRepository.findById(memberIdByToken)
//            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));

        // accessToken으로부터 Member 객체 추출
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);

        // memberFromAccessToken의 id로 최신 상태의 Member 객체 조회
        Member member = memberRepository.findById(memberFromAccessToken.getId())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
        return MemberResDto.from(member);
    }
}
