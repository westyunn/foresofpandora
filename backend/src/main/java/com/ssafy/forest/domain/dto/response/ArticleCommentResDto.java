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
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ArticleCommentResDto of(ArticleComment articleComment, long articleId, long replyCount) {
        return ArticleCommentResDto.builder().
            commentId(articleComment.getId()).
            memberId(articleComment.getMember().getId()).
            content(articleComment.getContent()).
            replyCount(replyCount).
            nickname(NicknameUtil.hash(articleId + articleComment.getMember().getId())).
            createdAt(articleComment.getCreatedAt()).
            modifiedAt(articleComment.getModifiedAt()).
            build();
    }

}
