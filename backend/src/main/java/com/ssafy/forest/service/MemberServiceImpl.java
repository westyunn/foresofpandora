package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.ArticleRepository;
import com.ssafy.forest.repository.ArticleTempRepository;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import java.awt.print.Pageable;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final ArticleRepository articleRepository;
    private final ArticleTempRepository articleTempRepository;
    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;

    //내가 작성한 게시글 목록 조회
    @Override
    public List<ArticleResDto> readCreatedList(int page, int size, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        return articleRepository.findByMemberId(member.getId()).stream()
            .map(ArticleResDto::from)
            .collect(Collectors.toList());
    }

    //내가 보관한 게시글 목록 조회
    @Override
    public List<ArticleResDto> readSavedList(int page, int size, HttpServletRequest request) {
        return null;
    }

    //내가 임시저장한 게시글 목록 조회
    @Override
    public List<ArticleResDto> readTempList(int page, int size, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        return articleTempRepository.findByMemberId(member.getId()).stream()
            .map(ArticleResDto::fromTemp)
            .collect(Collectors.toList());
    }

    //유저 정보 추출
    public Member getMemberFromAccessToken(HttpServletRequest request) {
        // accessToken으로부터 Member 객체 추출
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);
        // memberFromAccessToken의 id로 최신 상태의 Member 객체 조회
        return memberRepository.findById(memberFromAccessToken.getId())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }
}
