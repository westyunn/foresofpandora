package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleCommentReplyReqDto;
import com.ssafy.forest.domain.dto.response.ArticleCommentReplyResDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleCommentReplyService {

    ArticleCommentReplyResDto create(HttpServletRequest request, Long articleId, Long commentId,
        ArticleCommentReplyReqDto articleCommentReplyReqDto);

    Page<ArticleCommentReplyResDto> getListByComment(Pageable pageable, Long articleId, Long commentId);

    ArticleCommentReplyResDto update(HttpServletRequest request, Long articleId, Long replyId,
        ArticleCommentReplyReqDto articleCommentReplyReqDto);

    void delete(HttpServletRequest request, Long replyId);

}
