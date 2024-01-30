package com.ssafy.forest.domain.dto.response;

import com.ssafy.forest.domain.entity.ArticleComment;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ArticleCommentResDto {

    private Long commentId;
    private Long articleId;
    private Long memberId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ArticleCommentResDto from(ArticleComment articleComment) {
        return new ArticleCommentResDto(
            articleComment.getId(),
            articleComment.getArticle().getId(),
            articleComment.getMember().getId(),
            articleComment.getContent(),
            articleComment.getCreatedAt(),
            articleComment.getModifiedAt()
        );
    }

}
