package com.ssafy.forest.service;

import com.ssafy.forest.domain.AlarmArgs;
import com.ssafy.forest.domain.dto.request.ArticleCommentReqDto;
import com.ssafy.forest.domain.dto.response.ArticleCommentResDto;
import com.ssafy.forest.domain.entity.Alarm;
import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.ArticleComment;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.domain.type.AlarmType;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.AlarmRepository;
import com.ssafy.forest.repository.ArticleCommentRepository;
import com.ssafy.forest.repository.ArticleRepository;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
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
public class ArticleCommentService {

    private final ArticleCommentRepository articleCommentRepository;
    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;
    private final AlarmRepository alarmRepository;
    private final TokenProvider tokenProvider;

    public ArticleCommentResDto create(
        HttpServletRequest request, Long articleId, ArticleCommentReqDto articleCommentReqDto) {
        Article article = articleRepository.findByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));

        Member member = getMemberFromAccessToken(request);

        ArticleComment articleComment = articleCommentRepository.save(
            ArticleComment.of(articleCommentReqDto, article, member));

        if ((article.getMember() != articleComment.getMember())
            && article.getMember().getDeletedAt() == null) {
            alarmRepository.save(Alarm.of(article.getMember(), AlarmType.NEW_COMMENT_ON_ARTICLE,
                new AlarmArgs(member.getId(), article.getId(), articleComment.getId(), 0,0)));
        }
        return ArticleCommentResDto.of(articleComment, articleId, 0);
    }

    @Transactional(readOnly = true)
    public Page<ArticleCommentResDto> getListComment(Pageable pageable, Long articleId) {
        Article article = articleRepository.findByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));

        Page<Object[]> comments = articleCommentRepository.findAllWithReplyCountByArticle(
            pageable, article);

        return comments.map(com -> {
            ArticleComment comment = (ArticleComment) com[0];
            Long replyCount = (Long) com[1];
            return ArticleCommentResDto.of(comment, articleId, replyCount);
        });
    }

    @Transactional(readOnly = true)
    public ArticleCommentResDto getComment(Long articleId, Long commentId) {
        if (!articleRepository.existsByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)) {
            throw new CustomException(ErrorCode.INVALID_RESOURCE);
        }
        ArticleComment comment = articleCommentRepository.findByIdAndDeletedAtIsNullAndArticleId(
                commentId, articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));
        return ArticleCommentResDto.of(comment, articleId, comment.getReplies().size());
    }

    public ArticleCommentResDto update(
        HttpServletRequest request, Long articleId, Long commentId,
        ArticleCommentReqDto articleCommentReqDto) {
        if (!articleRepository.existsByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)) {
            throw new CustomException(ErrorCode.INVALID_RESOURCE);
        }

        ArticleComment comment = articleCommentRepository.findByIdAndDeletedAtIsNullAndArticleId(
                commentId, articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));

        Member member = getMemberFromAccessToken(request);

        if (!member.getId().equals(comment.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        comment.updateContent(articleCommentReqDto.getContent());
        return ArticleCommentResDto.of(articleCommentRepository.save(comment), articleId,
            comment.getReplies().size());
    }

    public void delete(HttpServletRequest request, Long articleId, Long commentId) {
        if (!articleRepository.existsByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)) {
            throw new CustomException(ErrorCode.INVALID_RESOURCE);
        }

        ArticleComment articleComment = articleCommentRepository.findById(commentId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));

        Member member = getMemberFromAccessToken(request);

        if (!member.getId().equals(articleComment.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        articleCommentRepository.deleteById(commentId);
    }

    public long getCommentCount(Article article) {
        return articleCommentRepository.countByArticleAndDeletedAtIsNull(article);
    }

    public Member getMemberFromAccessToken(HttpServletRequest request) {
        // accessToken으로부터 Member 객체 추출
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);

        // memberFromAccessToken의 id로 최신 상태의 Member 객체 조회
        return memberRepository.findById(memberFromAccessToken.getId())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

}
