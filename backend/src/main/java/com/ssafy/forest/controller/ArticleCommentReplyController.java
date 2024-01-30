package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.request.ArticleCommentReplyReqDto;
import com.ssafy.forest.domain.dto.response.ArticleCommentReplyResDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.ArticleCommentReplyService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/articles/")
public class ArticleCommentReplyController {

    private final ArticleCommentReplyService articleCommentReplyService;

    // commentReply 작성
    @PostMapping("/{commentId}/replies")
    public ResponseDto<ArticleCommentReplyResDto> create(
        HttpServletRequest request,
        @PathVariable Long commentId, @RequestBody ArticleCommentReplyReqDto articleCommentReplyReqDto) {
        return ResponseDto.success(
            articleCommentReplyService.create(request, commentId, articleCommentReplyReqDto));
    }

    // commentReply 목록 조회
    @GetMapping("/{commentId}/replies")
    public ResponseDto<List<ArticleCommentReplyResDto>> getAllCommentReplies(
        HttpServletRequest request, @PathVariable Long commentId) {
        return ResponseDto.success(articleCommentReplyService.getCommentRepliesByComment(commentId));
    }

}
