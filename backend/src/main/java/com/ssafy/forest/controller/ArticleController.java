package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.service.ArticleService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    //게시글 등록
    @PostMapping
    public ResponseEntity<Void> registArticle(@RequestBody ArticleReqDto request) {
        System.out.println("시작");
        articleService.registArticle(1L, request);
        System.out.println("끝");
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //게시글 목록 조회
    @GetMapping
    public ResponseEntity<List<ArticleResDto>> getArticleList() {
        List<ArticleResDto> list = articleService.getArticleList();
        return ResponseEntity.ok(list);
    }

    //게시글 단건 조회
    @GetMapping("/{articleId}")
    public ResponseEntity<ArticleResDto> getArticle(@PathVariable Long articleId) {
        System.out.println("시작");
        ArticleResDto response = articleService.getArticle(articleId);
        System.out.println("종료");
        return ResponseEntity.ok(response);
    }

    //게시글 수정
    @PutMapping("/{articleId}")
    public ResponseEntity<Void> updateArticle(@PathVariable Long articleId,
        @RequestBody ArticleReqDto request) {
        articleService.updateArticle(articleId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //게시글 삭제
    @DeleteMapping("/{articleId}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long articleId) {
        articleService.deleteArticle(articleId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}