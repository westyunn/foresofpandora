package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.response.ArticleResDto;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MemberService {

    //내가 작성한 게시글 목록 조회
    Page<ArticleResDto> getList(Pageable pageable, HttpServletRequest request);

    //내가 보관한 게시글 목록 조회
    Page<ArticleResDto> getSavedList(Pageable pageable, HttpServletRequest request);

    //내가 임시저장한 게시글 목록 조회
    Page<ArticleResDto> getTempList(Pageable pageable, HttpServletRequest request);

}
