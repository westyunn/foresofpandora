package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.request.ReportReqDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.exception.ValidateException;
import com.ssafy.forest.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
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
            @Valid @RequestBody ReportReqDto reportReqDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldErrors().get(0).getDefaultMessage();
            throw new ValidateException(errorMessage);
        }
        reportService.reportArticle(request, articleId, reportReqDto);
        return ResponseDto.success("SUCCESS");
    }

    @Operation(summary = "댓글 신고", description = "댓글 아이디로 댓글 신고 요청")
    @PostMapping("/{articleId}/comments/{commentId}")
    public ResponseDto<String> reportComment(
            HttpServletRequest request, @PathVariable Long articleId, @PathVariable Long commentId,
            @Valid @RequestBody ReportReqDto reportReqDto, BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldErrors().get(0).getDefaultMessage();
            throw new ValidateException(errorMessage);
        }
        reportService.reportComment(request, articleId, commentId, reportReqDto);
        return ResponseDto.success("SUCCESS");
    }

    @Operation(summary = "대댓글 신고", description = "대댓글 아이디로 대댓글 신고 요청")
    @PostMapping("/{articleId}/{commentId}/replies/{replyId}")
    public ResponseDto<String> reportReply(
            HttpServletRequest request, @PathVariable Long articleId, @PathVariable Long commentId,
            @PathVariable Long replyId, @Valid @RequestBody ReportReqDto reportReqDto, BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldErrors().get(0).getDefaultMessage();
            throw new ValidateException(errorMessage);
        }
        reportService.reportReply(request, articleId, commentId, replyId, reportReqDto);
        return ResponseDto.success("SUCCESS");
    }

}