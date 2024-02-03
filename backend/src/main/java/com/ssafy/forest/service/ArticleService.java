package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.dto.response.ArticleTempResDto;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface ArticleService {

    //게시글 등록
    ArticleResDto create(ArticleReqDto articleReqDto, List<MultipartFile> images,
        HttpServletRequest request);

    //게시글 목록 조회
    Page<ArticleResDto> getList(Pageable pageable);

    //게시글 단건 조회
    ArticleResDto read(Long articleId);

    //게시글 수정
    ArticleResDto update(Long articleId, ArticleReqDto articleReqDto,
        HttpServletRequest request);

    //게시글 삭제
    void delete(Long articleId, HttpServletRequest request);

    //게시글 임시저장
    ArticleTempResDto createTemp(ArticleReqDto articleReqDto, HttpServletRequest request);

    //임시저장 게시글 단건 조회
    ArticleTempResDto readTemp(Long articleId);

    //임시저장 게시글 등록
    ArticleResDto createTempToNew(Long tempId, ArticleReqDto articleReqDto,
        HttpServletRequest request);

    //임시저장 게시글 수정
    ArticleTempResDto updateTemp(Long articleId, ArticleReqDto articleReqDto,
        HttpServletRequest request);

    //임시저장 게시글 삭제
    void deleteTemp(Long articleId, HttpServletRequest request);
}
