package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.dto.response.ArticleTempResDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.ArticleService;
import com.ssafy.forest.service.ReactionService;
import com.ssafy.forest.service.StorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Article API", description = "게시글 관련 API")
@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final StorageService storageService;
    private final ReactionService reactionService;

    @Operation(summary = "게시글 등록", description = "유저가 게시글 등록")
    @PostMapping
    public ResponseDto<ArticleResDto> create(HttpServletRequest request,
        @Valid @RequestPart("data") ArticleReqDto articleReqDto,
        @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) {
        ArticleResDto createdArticle = articleService.create(articleReqDto, images, request);
        return ResponseDto.success(createdArticle);
    }

    @Operation(summary = "게시글 목록 조회", description = "게시글 목록 페이징해서 조회 요청")
    @GetMapping
    public ResponseDto<Page<ArticleResDto>> getList(
        @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC, size = 15) Pageable pageable
    ) {
        Page<ArticleResDto> articleList = articleService.getList(pageable);
        return ResponseDto.success(articleList);
    }

    @Operation(summary = "게시글 단건 조회", description = "게시글 아이디로 조회 요청")
    @GetMapping("/{articleId}")
    public ResponseDto<ArticleResDto> read(@PathVariable Long articleId) {
        ArticleResDto article = articleService.read(articleId);
        return ResponseDto.success(article);
    }

    @Operation(summary = "게시글 수정", description = "게시글 아이디로 게시글 수정 요청")
    @PutMapping("/{articleId}")
    public ResponseDto<ArticleResDto> update(@PathVariable Long articleId,
        @Valid @RequestBody ArticleReqDto articleReqDto, HttpServletRequest request) {
        ArticleResDto updatedArticle = articleService.update(articleId, articleReqDto, request);
        return ResponseDto.success(updatedArticle);
    }

    @Operation(summary = "게시글 삭제", description = "게시글 아이디로 게시글 삭제 요청")
    @DeleteMapping("/{articleId}")
    public ResponseDto<String> delete(@PathVariable Long articleId, HttpServletRequest request) {
        articleService.delete(articleId, request);
        return ResponseDto.success("SUCCESS");
    }

    @Operation(summary = "게시글 임시저장", description = "유저가 게시글 임시저장")
    @PostMapping("/temp")
    public ResponseDto<ArticleTempResDto> createTemp(HttpServletRequest request,
        @Valid @RequestPart("data") ArticleReqDto articleReqDto,
        @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        ArticleTempResDto articleTemp = articleService.createTemp(request, articleReqDto, images);
        return ResponseDto.success(articleTemp);
    }

    @Operation(summary = "임시저장 게시글 단건 조회", description = "임시저장 게시글 아이디로 단건 조회 요청")
    @GetMapping("/temp/{tempId}")
    public ResponseDto<ArticleTempResDto> readTemp(HttpServletRequest request,
        @PathVariable Long tempId) {
        ArticleTempResDto articleTemp = articleService.readTemp(request, tempId);
        return ResponseDto.success(articleTemp);
    }

    @Operation(summary = "임시저장 게시글을 게시글로 등록", description = "임시저장 게시글 아이디로 게시글 등록")
    @PostMapping("/temp/{tempId}")
    public ResponseDto<ArticleResDto> createTempToNew(@PathVariable Long tempId,
        @Valid @RequestBody ArticleReqDto articleReqDto, HttpServletRequest request) {
        ArticleResDto articleTemp = articleService.createTempToNew(request, tempId, articleReqDto);
        return ResponseDto.success(articleTemp);
    }

    @Operation(summary = "임시저장 게시글 수정", description = "임시저장 게시글 아이디로 게시글 수정 요청")
    @PutMapping("/temp/{tempId}")
    public ResponseDto<ArticleTempResDto> updateTemp(@PathVariable Long tempId,
        @Valid @RequestBody ArticleReqDto articleReqDto, HttpServletRequest request) {
        ArticleTempResDto updatedArticle = articleService.updateTemp(tempId, articleReqDto,
            request);
        return ResponseDto.success(updatedArticle);
    }

    @Operation(summary = "임시저장 게시글 삭제", description = "임시저장 게시글 아이디로 게시글 삭제 요청")
    @DeleteMapping("/temp/{tempId}")
    public ResponseDto<String> deleteTemp(@PathVariable Long tempId, HttpServletRequest request) {
        articleService.deleteTemp(tempId, request);
        return ResponseDto.success("SUCCESS");
    }

    @Operation(summary = "나의 보관 여부 조회", description = "게시글 아이디로 나의 보관 여부 조회 요청")
    @GetMapping("/storages/{articleId}")
    public ResponseDto<Boolean> getMyStorage(@PathVariable Long articleId,
        HttpServletRequest request) {
        return ResponseDto.success(storageService.getMyStorage(articleId, request));
    }

    @Operation(summary = "보관 누르기", description = "게시글 아이디로 보관 등록")
    @PostMapping("/storages/{articleId}")
    public ResponseDto<Boolean> store(@PathVariable Long articleId, HttpServletRequest request) {
        return ResponseDto.success(storageService.store(articleId, request));
    }

    @Operation(summary = "반응 누르기", description = "게시글 아이디로 반응 등록")
    @PostMapping("/reactions/{articleId}")
    public ResponseDto<Boolean> react(@PathVariable Long articleId, HttpServletRequest request) {
        return ResponseDto.success(reactionService.react(articleId, request));
    }

    @Operation(summary = "나의 반응 조회", description = "게시글 아이디로 나의 반응 조회 요청")
    @GetMapping("/reactions/{articleId}")
    public ResponseDto<Boolean> getMyReaction(@PathVariable Long articleId,
        HttpServletRequest request) {
        return ResponseDto.success(reactionService.getMyReaction(articleId, request));
    }

    @Operation(summary = "게시글 반응 개수 조회", description = "게시글 아이디로 게시글 반응 개수 조회")
    @GetMapping("/reactionCounts/{articleId}")
    public ResponseDto<Long> countReaction(@PathVariable Long articleId) {
        return ResponseDto.success(reactionService.countReaction(articleId));
    }

}