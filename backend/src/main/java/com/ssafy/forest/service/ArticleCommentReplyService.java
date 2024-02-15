package com.ssafy.forest.service;

import com.ssafy.forest.domain.AlarmArgs;
import com.ssafy.forest.domain.dto.request.ArticleCommentReplyReqDto;
import com.ssafy.forest.domain.dto.response.ArticleCommentReplyResDto;
import com.ssafy.forest.domain.entity.Alarm;
import com.ssafy.forest.domain.entity.ArticleComment;
import com.ssafy.forest.domain.entity.ArticleCommentReply;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.domain.type.AlarmType;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.AlarmRepository;
import com.ssafy.forest.repository.ArticleCommentReplyRepository;
import com.ssafy.forest.repository.ArticleCommentRepository;
import com.ssafy.forest.repository.ArticleRepository;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ArticleCommentReplyService {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final ArticleCommentReplyRepository articleCommentReplyRepository;
    private final ArticleCommentRepository articleCommentRepository;
    private final ArticleRepository articleRepository;
    private final AlarmRepository alarmRepository;

    public ArticleCommentReplyResDto create(
        HttpServletRequest request, Long articleId, Long commentId,
        ArticleCommentReplyReqDto articleCommentReplyReqDto) {
        if (!articleRepository.existsByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)) {
            throw new CustomException(ErrorCode.INVALID_RESOURCE);
        }
        ArticleComment articleComment = articleCommentRepository.findByIdAndDeletedAtIsNullAndArticleId(
                commentId, articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));

        Member member = getMemberFromAccessToken(request);

        ArticleCommentReply articleCommentReply = articleCommentReplyRepository.save(
            ArticleCommentReply.of(articleCommentReplyReqDto, articleComment, member));

        // 댓글에 답글을 달았을 경우
        if (articleCommentReply.getTagId() == 0
            && articleComment.getMember() != articleCommentReply.getMember()
            && articleComment.getMember().getDeletedAt() == null) {
            alarmRepository.save(
                Alarm.of(articleComment.getMember(), AlarmType.NEW_REPLY_ON_COMMENT,
                    new AlarmArgs(member.getId(), articleId, commentId,
                        articleCommentReply.getId(), 0)));
        }

        // 답글에 답글을 달았을 경우
        if (articleCommentReply.getTagId() != 0 && !articleCommentReply.getMember().getId()
            .equals(articleCommentReply.getTagId())) {
            Optional<Member> targetMember = memberRepository.findById(
                articleCommentReply.getTagId());
            if (targetMember.isPresent() && targetMember.get().getDeletedAt() == null) {
                alarmRepository.save(
                    Alarm.of(targetMember.get(), AlarmType.NEW_REPLY_ON_REPLY,
                        new AlarmArgs(member.getId(), articleId, commentId,
                            articleCommentReply.getId(),
                            articleCommentReplyReqDto.getTargetReplyId())));
            }
        }

        return ArticleCommentReplyResDto.of(articleCommentReply, articleId);
    }

    @Transactional(readOnly = true)
    public Page<ArticleCommentReplyResDto> getListByComment(
        Pageable pageable, Long articleId, Long commentId) {
        if (!articleRepository.existsByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)) {
            throw new CustomException(ErrorCode.INVALID_RESOURCE);
        }
        ArticleComment articleComment = articleCommentRepository.findByIdAndDeletedAtIsNullAndArticleId(
                commentId, articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));

        return articleCommentReplyRepository.findAllByArticleCommentAndDeletedAtIsNullOrderByCreatedAt(
            pageable, articleComment).map(reply -> ArticleCommentReplyResDto.of(reply, articleId));
    }

    @Transactional(readOnly = true)
    public ArticleCommentReplyResDto getByComment(Long articleId, Long commentId, Long replyId) {
        if (!articleRepository.existsByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)
            || !articleCommentRepository.existsByIdAndDeletedAtIsNullAndArticleId(
            commentId, articleId)) {
            throw new CustomException(ErrorCode.INVALID_RESOURCE);
        }

        ArticleCommentReply reply = articleCommentReplyRepository.findByIdAndDeletedAtIsNull(
                replyId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));
        return ArticleCommentReplyResDto.of(reply, articleId);
    }

    public ArticleCommentReplyResDto update(HttpServletRequest request, Long articleId,
        Long commentId, Long replyId,
        ArticleCommentReplyReqDto articleCommentReplyReqDto) {
        if (!articleRepository.existsByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)
            || !articleCommentRepository.existsByIdAndDeletedAtIsNullAndArticleId(
            commentId, articleId)) {
            throw new CustomException(ErrorCode.INVALID_RESOURCE);
        }

        ArticleCommentReply reply = articleCommentReplyRepository.findByIdAndDeletedAtIsNull(
                replyId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));

        Member member = getMemberFromAccessToken(request);

        if (!member.getId().equals(reply.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        reply.upadteContent(articleCommentReplyReqDto.getContent());
        return ArticleCommentReplyResDto.of(articleCommentReplyRepository.save(reply), articleId);
    }

    public void delete(HttpServletRequest request, Long articleId, Long commentId, Long replyId) {
        if (!articleRepository.existsByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)
            || !articleCommentRepository.existsByIdAndDeletedAtIsNullAndArticleId(commentId,
            articleId)) {
            throw new CustomException(ErrorCode.INVALID_RESOURCE);
        }

        ArticleCommentReply reply = articleCommentReplyRepository.findByIdAndDeletedAtIsNull(
                replyId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));

        Member member = getMemberFromAccessToken(request);

        if (!member.getId().equals(reply.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        articleCommentReplyRepository.deleteById(replyId);
    }

    public Member getMemberFromAccessToken(HttpServletRequest request) {
        // accessToken으로부터 Member 객체 추출
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);

        // memberFromAccessToken의 id로 최신 상태의 Member 객체 조회
        return memberRepository.findById(memberFromAccessToken.getId())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

}
