package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.repository.ArticleRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;

    //게시글 등록
    @Transactional
    @Override
    public void registArticle(Long memberId, ArticleReqDto articleReqDto) {
        Member member = new Member(memberId, null, null);

        articleRepository.save(Article.from(articleReqDto, member));
    }

    //게시글 임시저장
    @Transactional
    @Override
    public void saveArticle(Long memberId, ArticleReqDto articleReqDto) {
    }

    //게시글 목록 조회
    @Transactional(readOnly = true)
    @Override
    public List<ArticleResDto> getArticleList() {
        return articleRepository.findAll().stream()
            .map(ArticleResDto::new)
            .collect(Collectors.toList());
    }

    //게시글 단건 조회
    @Transactional(readOnly = true)
    @Override
    public ArticleResDto getArticle(Long articleId) {
        Article article = articleRepository.findByArticleId(articleId)
            .orElseThrow(() -> new EntityNotFoundException("해당 ID의 게시글을 찾을 수 없습니다: " + articleId));
        return ArticleResDto.from(article);
    }


    //게시글 수정
    @Transactional
    @Override
    public void updateArticle(Long articleId, ArticleReqDto articleReqDto) {
        Article article = articleRepository.findByArticleId(articleId)
            .orElseThrow(() -> new EntityNotFoundException("해당 ID의 게시글을 찾을 수 없습니다: " + articleId));
        article.updateArticle(articleReqDto.getTitle(), articleReqDto.getContent());
    }

    //게시글 삭제
    @Transactional
    @Override
    public void deleteArticle(Long articleId) {
        articleRepository.deleteByArticleId(articleId);
    }

}