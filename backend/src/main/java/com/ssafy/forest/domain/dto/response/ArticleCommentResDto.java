package com.ssafy.forest.domain.dto.response;

import com.ssafy.forest.domain.entity.ArticleComment;
import com.ssafy.forest.util.NicknameUtil;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ArticleCommentResDto {

    private Long commentId;
    private Long memberId;
    private String content;
    private long replyCount;
    private String nickname;
    private int profileIdx;
    private int backgroundIdx;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ArticleCommentResDto of(ArticleComment articleComment, long articleId,
        long replyCount) {
        return ArticleCommentResDto.builder().
            commentId(articleComment.getId()).
            memberId(articleComment.getMember().getId()).
            content(articleComment.getContent()).
            replyCount(replyCount).
            nickname(articleComment.getMember().getDeletedAt() == null ? (String) NicknameUtil.hash(
                articleId + articleComment.getMember().getId()).get("nickname")
                : NicknameUtil.WITHDRAWAL_MEMBER).
            profileIdx(articleComment.getMember().getDeletedAt() == null ? (int) NicknameUtil.hash(
                articleId + articleComment.getMember().getId()).get("profileIdx")
                : -1).
            backgroundIdx(
                articleComment.getMember().getDeletedAt() == null ? (int) NicknameUtil.hash(
                    articleId + articleComment.getMember().getId()).get("backgroundIdx")
                    : -1).
            createdAt(articleComment.getCreatedAt()).
            modifiedAt(articleComment.getModifiedAt()).
            build();
    }

}
