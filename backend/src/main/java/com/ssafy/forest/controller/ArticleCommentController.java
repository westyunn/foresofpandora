package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.request.ArticleCommentReqDto;
import com.ssafy.forest.domain.dto.response.ArticleCommentResDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.ArticleCommentService;
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
@RequiredArgsConstructor
@RequestMapping("/api/articles")
public class ArticleCommentController {

    private final ArticleCommentService articleCommentService;

    // comment 작성
    @PostMapping("/{articleId}/comments")
    public ResponseDto<ArticleCommentResDto> create(
        HttpServletRequest request,
        @PathVariable Long articleId, @RequestBody ArticleCommentReqDto articleCommentReqDto) {
        ArticleCommentResDto createdCommentResDto = articleCommentService.create(request, articleId,articleCommentReqDto);
        return ResponseDto.success(createdCommentResDto);
    }

    // comment 수정
    @PutMapping("/{articleId}/comments/{commentId}")
    public ResponseDto<ArticleCommentResDto> update(
        HttpServletRequest request,
        @PathVariable Long articleId, @PathVariable Long commentId, @RequestBody ArticleCommentReqDto articleCommentReqDto) {
        ArticleCommentResDto updatedCommentResDto = articleCommentService.update(request, commentId,articleCommentReqDto);

        return ResponseDto.success(updatedCommentResDto);
    }

    // comment 목록 조회
    @GetMapping("/{articleId}/comments")
    public ResponseDto<List<ArticleCommentResDto>> getAllComments(
        HttpServletRequest request, @PathVariable Long articleId) {
        List<ArticleCommentResDto> commentList = articleCommentService.getCommentsByArticle(articleId);
        return ResponseDto.success(commentList);
    }

    // comment 삭제
    @DeleteMapping("/{articleId}/comments/{commentId}")
    public ResponseDto<String> deleteComment(
        HttpServletRequest request, @PathVariable Long articleId, @PathVariable Long commentId) {
        articleCommentService.delete(request,commentId);
        return ResponseDto.success("SUCCESS");
    }

}
