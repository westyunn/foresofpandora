package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleCommentReplyReqDto;
import com.ssafy.forest.domain.dto.response.ArticleCommentReplyResDto;
import com.ssafy.forest.domain.dto.response.ArticleCommentResDto;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;


public interface ArticleCommentReplyService {

    ArticleCommentReplyResDto create(HttpServletRequest request, Long commentId, ArticleCommentReplyReqDto articleCommentReplyReqDto);
    List<ArticleCommentReplyResDto> getCommentRepliesByComment(Long commentId);
}
