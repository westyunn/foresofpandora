package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.request.ArticleCommentReplyReqDto;
import com.ssafy.forest.domain.dto.response.ArticleCommentReplyResDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.ArticleCommentReplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
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

@Tag(name = "ArticleCommentReply API", description = "답글 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/articles/{articleId}/comments")
public class ArticleCommentReplyController {

    private final ArticleCommentReplyService articleCommentReplyService;

    @Operation(summary = "답글 작성", description = "특정 댓글에 답글 작성")
    @PostMapping("/{commentId}/replies")
    public ResponseDto<ArticleCommentReplyResDto> create(
        HttpServletRequest request,
        @PathVariable Long articleId,
        @PathVariable Long commentId,
        @Valid @RequestBody ArticleCommentReplyReqDto articleCommentReplyReqDto) {
        return ResponseDto.success(
            articleCommentReplyService.create(request, articleId, commentId,
                articleCommentReplyReqDto));
    }

    @Operation(summary = "답글 목록 조회", description = "특정 댓글의 답글 목록 조회")
    @GetMapping("/{commentId}/replies")
    public ResponseDto<Page<ArticleCommentReplyResDto>> getListByComment(
        @PathVariable Long articleId,
        @PathVariable Long commentId,
        @PageableDefault(size = 10) Pageable pageable) {
        return ResponseDto.success(
            articleCommentReplyService.getListByComment(pageable, articleId, commentId));
    }

    @Operation(summary = "답글 단건 조회", description = "특정 댓글의 답글 단건 조회")
    @GetMapping("/{commentId}/replies/{replyId}")
    public ResponseDto<ArticleCommentReplyResDto> getByComment(
        @PathVariable Long articleId,
        @PathVariable Long commentId,
        @PathVariable Long replyId
    ) {
        return ResponseDto.success(
            articleCommentReplyService.getByComment(articleId, commentId, replyId));
    }

    @Operation(summary = "답글 수정", description = "특정 댓글의 답글 수정")
    @PutMapping("/{commentId}/replies/{replyId}")
    public ResponseDto<ArticleCommentReplyResDto> update(
        HttpServletRequest request,
        @PathVariable Long articleId,
        @PathVariable Long commentId,
        @PathVariable Long replyId,
        @Valid @RequestBody ArticleCommentReplyReqDto articleCommentReplyReqDto) {
        return ResponseDto.success(
            articleCommentReplyService.update(request, articleId, commentId, replyId,
                articleCommentReplyReqDto));
    }

    @Operation(summary = "답글 삭제", description = "특정 댓글의 답글 삭제")
    @DeleteMapping("/{commentId}/replies/{replyId}")
    public ResponseDto<String> delete(
        HttpServletRequest request,
        @PathVariable Long articleId,
        @PathVariable Long commentId,
        @PathVariable Long replyId) {
        articleCommentReplyService.delete(request, articleId, commentId, replyId);
        return ResponseDto.success("SUCCESS");
    }

}
