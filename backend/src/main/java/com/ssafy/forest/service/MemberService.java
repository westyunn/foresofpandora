package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.response.ArticleResDto;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

public interface MemberService {

    //내가 작성한 게시글 목록 조회
    public List<ArticleResDto> readCreatedList(int page, int size, HttpServletRequest request);

    //내가 보관한 게시글 목록 조회
    public List<ArticleResDto> readSavedList(int page, int size, HttpServletRequest request);

    //내가 임시저장한 게시글 목록 조회
    public List<ArticleResDto> readTempList(int page, int size, HttpServletRequest request);

}
