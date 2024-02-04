package com.ssafy.forest.domain.dto.response;

import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.ArticleImage;
import com.ssafy.forest.util.NicknameUtil;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ArticleResDto {

    private Long id;
    private Long memberId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<String> imageList;
    private int reactionCount;
    private int commentCount;
    private String nickname;

    public static ArticleResDto of(Article article,int commentCount, int reactionCount) {
        return ArticleResDto.builder()
            .id(article.getId())
            .memberId(article.getMember().getId())
            .content(article.getContent())
            .createdAt(article.getCreatedAt())
            .modifiedAt(article.getModifiedAt())
            .imageList(article.getImages().stream().map(ArticleImage::getImageURL).collect(Collectors.toList()))
            .reactionCount(reactionCount)
            .commentCount(commentCount)
            .nickname(NicknameUtil.hash(article.getId() + article.getMember().getId()))
            .build();
    }

}