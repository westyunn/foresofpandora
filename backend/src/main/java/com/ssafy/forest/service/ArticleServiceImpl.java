package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.dto.response.MemberResDto;
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
import java.awt.print.Pageable;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleTempRepository articleTempRepository;
    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;

    //게시글 등록
    @Override
    public ArticleResDto create(ArticleReqDto articleReqDto, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        Article created = articleRepository.save(Article.from(articleReqDto, member));
        return ArticleResDto.from(created);
    }

    //게시글 목록 조회
    @Transactional(readOnly = true)
    @Override
    public List<ArticleResDto> readList(int page, int size) {
        return articleRepository.findAll().stream()
            .map(ArticleResDto::from)
            .collect(Collectors.toList());
    }

    //게시글 단건 조회
    @Transactional(readOnly = true)
    @Override
    public ArticleResDto read(Long articleId) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));
        return ArticleResDto.from(article);
    }

    //게시글 수정
    @Override
    public ArticleResDto update(Long articleId, ArticleReqDto articleReqDto,
        HttpServletRequest request) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));

        Member member = getMemberFromAccessToken(request);
        if (!member.getId().equals(article.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        article.update(articleReqDto.getTitle(), articleReqDto.getContent());
        return ArticleResDto.from(articleRepository.save(article));
    }

    //게시글 삭제
    @Override
    public void delete(Long articleId, HttpServletRequest request) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));

        Member member = getMemberFromAccessToken(request);
        if (!member.getId().equals(article.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        articleRepository.deleteById(articleId);
    }

    //게시글 임시저장
    @Override
    public ArticleResDto createTemp(ArticleReqDto articleReqDto, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        ArticleTemp createdTemp = articleTempRepository.save(
            ArticleTemp.from(articleReqDto, member));
        return ArticleResDto.fromTemp(createdTemp);
    }

    //임시저장 게시글 단건 조회
    @Transactional(readOnly = true)
    @Override
    public ArticleResDto readTemp(Long tempId) {
        ArticleTemp articleTemp = articleTempRepository.findById(tempId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));
        return ArticleResDto.fromTemp(articleTemp);
    }

    //임시저장 게시글 등록
    @Override
    public ArticleResDto createTempToNew(Long tempId, ArticleReqDto articleReqDto,
        HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        Article created = articleRepository.save(Article.from(articleReqDto, member));
        deleteTemp(tempId, request);
        return ArticleResDto.from(created);
    }

    //임시저장 게시글 수정
    @Override
    public ArticleResDto updateTemp(Long tempId, ArticleReqDto articleReqDto,
        HttpServletRequest request) {
        ArticleTemp articleTemp = articleTempRepository.findById(tempId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));

        Member member = getMemberFromAccessToken(request);
        if (!member.getId().equals(articleTemp.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        articleTemp.update(articleReqDto.getTitle(), articleReqDto.getContent());
        ArticleTemp updatedTemp = articleTempRepository.save(articleTemp);
        return ArticleResDto.fromTemp(updatedTemp);
    }

    //임시저장 게시글 삭제
    @Override
    public void deleteTemp(Long tempId, HttpServletRequest request) {
        ArticleTemp articleTemp = articleTempRepository.findById(tempId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));

        Member member = getMemberFromAccessToken(request);
        if (!member.getId().equals(articleTemp.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        articleTempRepository.deleteById(tempId);
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