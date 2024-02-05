package com.ssafy.forest.domain.dto.response;

import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.ArticleImage;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ArticleResDto {

    private Long id;
    private Long memberId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<String> imageList;
    private long reactionCount;
    private long commentCount;

    public static ArticleResDto of(Article article,long commentCount, long reactionCount) {
        return new ArticleResDto(
            article.getId(),
            article.getMember().getId(),
            article.getContent(),
            article.getCreatedAt(),
            article.getModifiedAt(),
            article.getImages().stream().map(ArticleImage::getImageURL).collect(Collectors.toList()),
            reactionCount,
            commentCount
        );
    }

}