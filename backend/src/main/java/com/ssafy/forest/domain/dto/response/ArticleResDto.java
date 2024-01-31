package com.ssafy.forest.domain.dto.response;

import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.ArticleTemp;
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
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ArticleResDto from(Article article) {
        return new ArticleResDto(
            article.getId(),
            article.getMember().getId(),
            article.getContent(),
            article.getCreatedAt(),
            article.getModifiedAt()
        );
    }

    public static ArticleResDto fromTemp(ArticleTemp articleTemp) {
        return new ArticleResDto(
            articleTemp.getId(),
            articleTemp.getMember().getId(),
            articleTemp.getContent(),
            articleTemp.getCreatedAt(),
            articleTemp.getModifiedAt()
        );
    }

}