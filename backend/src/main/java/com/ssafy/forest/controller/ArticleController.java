package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.ArticleService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
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

    //게시글 목록 조회
    @GetMapping
    public ResponseDto<Page<ArticleResDto>> readList(
        @PageableDefault(size = 15, sort = "id", direction = Direction.ASC) Pageable pageable
    ) {
        Page<ArticleResDto> articleList = articleService.readList(pageable);
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
        @RequestBody ArticleReqDto articleReqDto, HttpServletRequest request) {
        ArticleResDto updatedArticle = articleService.update(articleId, articleReqDto, request);
        return ResponseDto.success(updatedArticle);
    }

    //게시글 삭제
    @DeleteMapping("/{articleId}")
    public ResponseDto<String> delete(@PathVariable Long articleId, HttpServletRequest request) {
        articleService.delete(articleId, request);
        return ResponseDto.success("SUCCESS");
    }

    //게시글 임시저장
    @PostMapping("/temp")
    public ResponseDto<ArticleResDto> createTemp(HttpServletRequest request,
        @RequestBody ArticleReqDto articleReqDto) {
        ArticleResDto articleTemp = articleService.createTemp(articleReqDto, request);
        return ResponseDto.success(articleTemp);
    }

    //임시저장 게시글 단건 조회
    @GetMapping("/temp/{tempId}")
    public ResponseDto<ArticleResDto> readTemp(@PathVariable Long tempId) {
        ArticleResDto articleTemp = articleService.readTemp(tempId);
        return ResponseDto.success(articleTemp);
    }

    //임시저장 게시글 등록
    @PostMapping("/temp/{tempId}")
    public ResponseDto<ArticleResDto> createTempToNew(@PathVariable Long tempId,
        @RequestBody ArticleReqDto articleReqDto, HttpServletRequest request) {
        ArticleResDto articleTemp = articleService.createTempToNew(tempId, articleReqDto, request);
        return ResponseDto.success(articleTemp);
    }

    //임시저장 게시글 수정
    @PutMapping("/temp/{tempId}")
    public ResponseDto<ArticleResDto> updateTemp(@PathVariable Long tempId,
        @RequestBody ArticleReqDto articleReqDto, HttpServletRequest request) {
        ArticleResDto updatedArticle = articleService.updateTemp(tempId, articleReqDto, request);
        return ResponseDto.success(updatedArticle);
    }

    //임시저장 게시글 삭제
    @DeleteMapping("/temp/{tempId}")
    public ResponseDto<String> deleteTemp(@PathVariable Long tempId, HttpServletRequest request) {
        articleService.deleteTemp(tempId, request);
        return ResponseDto.success("SUCCESS");
    }
}