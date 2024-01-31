package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.ArticleTemp;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.ArticleRepository;
import com.ssafy.forest.repository.ArticleTempRepository;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<ArticleResDto> readCreatedList(Pageable pageable, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        Page<Article> articleList = articleRepository.findByMemberIdOrderByIdAsc(member.getId(), pageable);
        return articleList.map(ArticleResDto::from);
    }

    //내가 보관한 게시글 목록 조회
    @Override
    public Page<ArticleResDto> readSavedList(Pageable pageable, HttpServletRequest request) {
        return null;
    }

    //내가 임시저장한 게시글 목록 조회
    @Override
    public Page<ArticleResDto> readTempList(Pageable pageable, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        Page<ArticleTemp> articleTemps = articleTempRepository.findByMemberIdOrderByIdAsc(member.getId(), pageable);
        return articleTemps.map(ArticleResDto::fromTemp);
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
