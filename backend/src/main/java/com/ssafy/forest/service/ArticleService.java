package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

public interface ArticleService {

    //게시글 등록
    ArticleResDto create(ArticleReqDto articleReqDto, HttpServletRequest request);

    //게시글 목록 조회
    List<ArticleResDto> readList(int page, int size);

    //게시글 단건 조회
    ArticleResDto read(Long articleId);

    //게시글 수정
    ArticleResDto update(Long articleId, ArticleReqDto articleReqDto,
        HttpServletRequest request);

    //게시글 삭제
    void delete(Long articleId, HttpServletRequest request);

    //게시글 임시저장
    ArticleResDto createTemp(ArticleReqDto articleReqDto, HttpServletRequest request);

    //임시저장 게시글 단건 조회
    ArticleResDto readTemp(Long articleId);

    //임시저장 게시글 등록
    ArticleResDto createTempToNew(Long tempId, ArticleReqDto articleReqDto,
        HttpServletRequest request);

    //임시저장 게시글 수정
    ArticleResDto updateTemp(Long articleId, ArticleReqDto articleReqDto,
        HttpServletRequest request);

    //임시저장 게시글 삭제
    void deleteTemp(Long articleId, HttpServletRequest request);
}
