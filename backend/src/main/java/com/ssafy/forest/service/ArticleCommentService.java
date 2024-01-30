package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleCommentReqDto;
import com.ssafy.forest.domain.dto.response.ArticleCommentResDto;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;


public interface ArticleCommentService {

    List<ArticleCommentResDto> getCommentsByArticle(Long articleId);
    ArticleCommentResDto create(HttpServletRequest request, Long articleId, ArticleCommentReqDto dto);
    ArticleCommentResDto update(HttpServletRequest request, Long commentId, ArticleCommentReqDto articleCommentReqDto);
    void delete(HttpServletRequest request, Long commentId);

}
