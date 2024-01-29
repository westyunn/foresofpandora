package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.dto.response.MemberResDto;
import com.ssafy.forest.domain.entity.Member;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

public interface ArticleService {

    //게시글 등록
    public ArticleResDto create(ArticleReqDto articleReqDto, HttpServletRequest request);

    //게시글 임시저장
    public ArticleResDto createTemp(ArticleReqDto articleReqDto, HttpServletRequest request);

    //게시글 목록 조회
    public List<ArticleResDto> readList();

    //게시글 단건 조회
    public ArticleResDto read(Long articleId);

    //게시글 수정
    public ArticleResDto update(Long articleId, ArticleReqDto articleReqDto, HttpServletRequest request);

    //게시글 삭제
    public void delete(Long articleId, HttpServletRequest request);
}
