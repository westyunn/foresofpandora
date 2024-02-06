package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.request.ReportReqDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Report API", description = "신고 관련 API")
@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @Operation(summary = "게시글 신고", description = "게시글 아이디로 게시글 신고 요청")
    @PostMapping("/articles/{articleId}")
    public ResponseDto<String> reportArticle(
        HttpServletRequest request, @PathVariable Long articleId,
        @RequestBody ReportReqDto reportReqDto) {
        reportService.reportArticle(request, articleId, reportReqDto);
        return ResponseDto.success("SUCCESS");
    }

    @Operation(summary = "댓글 신고", description = "댓글 아이디로 댓글 신고 요청")
    @PostMapping("/comments/{commentId}")
    public ResponseDto<String> reportComment(
        HttpServletRequest request, @PathVariable Long commentId,
        @RequestBody ReportReqDto reportReqDto) {
        reportService.reportComment(request, commentId, reportReqDto);
        return ResponseDto.success("SUCCESS");
    }

    @Operation(summary = "대댓글 신고", description = "대댓글 아이디로 대댓글 신고 요청")
    @PostMapping("/replies/{replyId}")
    public ResponseDto<String> reportReply(
        HttpServletRequest request, @PathVariable Long replyId,
        @RequestBody ReportReqDto reportReqDto) {
        reportService.reportReply(request, replyId, reportReqDto);
        return ResponseDto.success("SUCCESS");
    }

}
