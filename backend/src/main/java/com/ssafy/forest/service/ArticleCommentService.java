package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleCommentReqDto;
import com.ssafy.forest.domain.dto.response.ArticleCommentResDto;
import com.ssafy.forest.domain.entity.Article;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ArticleCommentService {

    Page<ArticleCommentResDto> getCommentsByArticle(Pageable pageable, Long articleId);
    ArticleCommentResDto create(HttpServletRequest request, Long articleId, ArticleCommentReqDto dto);
    ArticleCommentResDto update(HttpServletRequest request, Long commentId, ArticleCommentReqDto articleCommentReqDto);
    void delete(HttpServletRequest request, Long commentId);
    int getCommentCount(Article article);

}
