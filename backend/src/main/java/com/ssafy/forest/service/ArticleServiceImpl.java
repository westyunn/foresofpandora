package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.ArticleTemp;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.ArticleRepository;
import com.ssafy.forest.repository.ArticleTempRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleTempRepository articleTempRepository;

    //게시글 등록
    @Transactional
    @Override
    public ArticleResDto create(ArticleReqDto articleReqDto, Member member) {
        Article created = articleRepository.save(Article.from(articleReqDto, member));
        return ArticleResDto.from(created);
    }

    //게시글 임시저장
    @Transactional
    @Override
    public ArticleResDto createTemp(ArticleReqDto articleReqDto, Member member) {
        ArticleTemp createdTemp = articleTempRepository.save(ArticleTemp.from(articleReqDto, member));
        return ArticleResDto.fromTemp(createdTemp);
    }

    //게시글 목록 조회
    @Transactional(readOnly = true)
    @Override
    public List<ArticleResDto> readList() {
        return articleRepository.findAll().stream()
            .map(ArticleResDto::new)
            .collect(Collectors.toList());
    }

    //게시글 단건 조회
    @Transactional(readOnly = true)
    @Override
    public ArticleResDto read(Long articleId) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));
        return ArticleResDto.from(article);
    }


    //게시글 수정
    @Transactional
    @Override
    public ArticleResDto update(Long articleId, ArticleReqDto articleReqDto) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));
        article.updateArticle(articleReqDto.getTitle(), articleReqDto.getContent());
        return read(articleId);
    }

    //게시글 삭제
    @Transactional
    @Override
    public void delete(Long articleId) {
        try {
            articleRepository.deleteById(articleId);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
        }
    }

}