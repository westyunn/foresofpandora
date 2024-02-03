package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.dto.response.ArticleTempResDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MemberService {

    //내가 작성한 게시글 목록 조회
    Page<ArticleResDto> getList(Pageable pageable, HttpServletRequest request);

    //내가 보관한 게시글 목록 조회
    Page<ArticleResDto> getStoredList(Pageable pageable, HttpServletRequest request);

    //내가 임시저장한 게시글 목록 조회
    Page<ArticleTempResDto> getTempList(Pageable pageable, HttpServletRequest request);

}
