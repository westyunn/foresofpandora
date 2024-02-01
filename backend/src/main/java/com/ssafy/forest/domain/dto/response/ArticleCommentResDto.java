package com.ssafy.forest.domain.dto.response;

import com.ssafy.forest.domain.entity.ArticleComment;
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
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private int replyCount;

    public static ArticleCommentResDto from(ArticleComment articleComment, int replyCount) {
        return ArticleCommentResDto.builder().
            commentId(articleComment.getId()).
            memberId(articleComment.getMember().getId()).
            content(articleComment.getContent()).
            createdAt(articleComment.getCreatedAt()).
            modifiedAt(articleComment.getModifiedAt()).
            replyCount(replyCount).
            build();
    }

}
