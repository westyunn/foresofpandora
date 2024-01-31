package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.request.ArticleCommentReqDto;
import com.ssafy.forest.domain.dto.response.ArticleCommentResDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.ArticleCommentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
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

    // comment 작성
    @PostMapping("/{articleId}/comments")
    public ResponseDto<ArticleCommentResDto> create(
        HttpServletRequest request,
        @PathVariable Long articleId, @RequestBody ArticleCommentReqDto articleCommentReqDto) {
        return ResponseDto.success(
            articleCommentService.create(request, articleId, articleCommentReqDto));
    }

    // comment 수정
    @PutMapping("/{articleId}/comments/{commentId}")
    public ResponseDto<ArticleCommentResDto> update(
        HttpServletRequest request,
        @PathVariable Long articleId, @PathVariable Long commentId,
        @RequestBody ArticleCommentReqDto articleCommentReqDto) {
        return ResponseDto.success(
            articleCommentService.update(request, commentId, articleCommentReqDto));
    }

    // comment 목록 조회
    @GetMapping("/{articleId}/comments")
    public ResponseDto<Page<ArticleCommentResDto>> getAllComments(
        @PathVariable Long articleId, @PageableDefault(size = 20) Pageable pageable) {
        return ResponseDto.success(articleCommentService.getCommentsByArticle(pageable, articleId));
    }

    // comment 삭제
    @DeleteMapping("/{articleId}/comments/{commentId}")
    public ResponseDto<String> delete(
        HttpServletRequest request, @PathVariable Long articleId, @PathVariable Long commentId) {
        articleCommentService.delete(request, commentId);
        return ResponseDto.success("SUCCESS");
    }

}
