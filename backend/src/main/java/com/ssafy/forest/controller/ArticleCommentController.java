package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.request.ArticleCommentReqDto;
import com.ssafy.forest.domain.dto.response.ArticleCommentResDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.ArticleCommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "ArticleComment API", description = "댓글 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/articles")
public class ArticleCommentController {

    private final ArticleCommentService articleCommentService;

    @Operation(summary = "댓글 작성", description = "특정 게시글에 댓글 작성")
    @PostMapping("/{articleId}/comments")
    public ResponseDto<ArticleCommentResDto> create(
        HttpServletRequest request,
        @PathVariable Long articleId, @RequestBody ArticleCommentReqDto articleCommentReqDto) {
        return ResponseDto.success(
            articleCommentService.create(request, articleId, articleCommentReqDto));
    }

    @Operation(summary = "댓글 수정", description = "게시글에 있는 특정 댓글 수정")
    @PutMapping("/{articleId}/comments/{commentId}")
    public ResponseDto<ArticleCommentResDto> update(
        HttpServletRequest request,
        @PathVariable Long articleId, @PathVariable Long commentId,
        @RequestBody ArticleCommentReqDto articleCommentReqDto) {
        return ResponseDto.success(
            articleCommentService.update(request, articleId, commentId, articleCommentReqDto));
    }

    @Operation(summary = "댓글 목록 조회", description = "특정 게시글에 댓글 목록 조회")
    @GetMapping("/{articleId}/comments")
    public ResponseDto<Page<ArticleCommentResDto>> getList(
        @PathVariable Long articleId, @PageableDefault(size = 20) Pageable pageable) {
        return ResponseDto.success(articleCommentService.getListArticle(pageable, articleId));
    }

    @Operation(summary = "댓글 삭제", description = "게시글에 있는 특정 댓글 삭제")
    @DeleteMapping("/{articleId}/comments/{commentId}")
    public ResponseDto<String> delete(
        HttpServletRequest request, @PathVariable Long articleId, @PathVariable Long commentId) {
        articleCommentService.delete(request, commentId);
        return ResponseDto.success("SUCCESS");
    }

}
