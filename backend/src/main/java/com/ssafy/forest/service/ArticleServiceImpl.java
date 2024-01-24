package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.repository.ArticleRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService{

    private final ArticleRepository articleRepository;

    @Override
    public void registArticle(ArticleReqDto articleReqDto) {

    }

    @Override
    public void saveArticle(ArticleReqDto articleReqDto) {

    }

    @Override
    public List<ArticleResDto> getArticleList() {
        return null;
    }

    @Override
    public ArticleResDto getArticle(Long articleId) {
        return null;
    }

    @Override
    public void updateArticle(Long articleId, ArticleReqDto articleReqDto) {

    }

    @Override
    public void deleteArticle(Long articleId) {

    }
}
