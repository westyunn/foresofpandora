package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.dto.response.MemberResDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.service.ArticleService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
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
    public ResponseDto<ArticleResDto> create(HttpServletRequest request,
        @RequestBody ArticleReqDto articleReqDto) {
        ArticleResDto createdArticle = articleService.create(articleReqDto, request);
        return ResponseDto.success(createdArticle);
    }

    //게시글 임시저장
    @PostMapping("/temp")
    public ResponseDto<ArticleResDto> createTemp(HttpServletRequest request,
        @RequestBody ArticleReqDto articleReqDto) {
        ArticleResDto articleTemp = articleService.createTemp(articleReqDto, request);
        return ResponseDto.success(articleTemp);
    }

    //게시글 목록 조회
    @GetMapping
    public ResponseDto<List<ArticleResDto>> readList() {
        List<ArticleResDto> articleList = articleService.readList();
        return ResponseDto.success(articleList);
    }

    //게시글 단건 조회
    @GetMapping("/{articleId}")
    public ResponseDto<ArticleResDto> read(@PathVariable Long articleId) {
        ArticleResDto article = articleService.read(articleId);
        return ResponseDto.success(article);
    }

    //게시글 수정
    @PutMapping("/{articleId}")
    public ResponseDto<ArticleResDto> update(@PathVariable Long articleId,
        @RequestBody ArticleReqDto request) {
        ArticleResDto updatedArticle = articleService.update(articleId, request);
        return ResponseDto.success(updatedArticle);
    }

    //게시글 삭제
    @DeleteMapping("/{articleId}")
    public ResponseDto<String> delete(@PathVariable Long articleId) {
        articleService.delete(articleId);
        return ResponseDto.success("SUCCESS");
    }

}