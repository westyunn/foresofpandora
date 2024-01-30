package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleCommentReplyReqDto;
import com.ssafy.forest.domain.dto.response.ArticleCommentReplyResDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleCommentReplyService {

    ArticleCommentReplyResDto create(HttpServletRequest request, Long commentId,
        ArticleCommentReplyReqDto articleCommentReplyReqDto);

    Page<ArticleCommentReplyResDto> getCommentRepliesByComment(Pageable pageable, Long commentId);

}
