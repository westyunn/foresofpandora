package com.ssafy.forest.domain.dto.response;

import com.ssafy.forest.domain.entity.Article;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ArticleResDto {

    private Long id;
    private Long memberId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    @Builder
    public ArticleResDto(Article article) {
        this.id = article.getId();
        this.memberId = article.getMember().getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.createdAt = article.getCreatedAt();
        this.modifiedAt = article.getModifiedAt();
    }

    public static ArticleResDto from(Article article) {
        return new ArticleResDto(
            article.getId(),
            article.getMember().getId(),
            article.getTitle(),
            article.getContent(),
            article.getCreatedAt(),
            article.getModifiedAt()
        );
    }

}