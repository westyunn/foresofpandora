package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import java.util.List;

public interface ArticleService {

    public void registArticle(Long memberId, ArticleReqDto articleReqDto);

    public void saveArticle(Long memberId, ArticleReqDto articleReqDto);

    public List<ArticleResDto> getArticleList();

    public ArticleResDto getArticle(Long articleId);

    public void updateArticle(Long articleId, ArticleReqDto articleReqDto);

    public void deleteArticle(Long articleId);
}
