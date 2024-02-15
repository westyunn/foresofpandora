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
    private List<String> imageList;
    private long reactionCount;
    private long commentCount;
    private String nickname;
    private int profileIdx;
    private int backgroundIdx;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ArticleResDto of(Article article, long commentCount, long reactionCount) {
        return ArticleResDto.builder()
            .id(article.getId())
            .memberId(article.getMember().getId())
            .imageList(article.getImages().stream().map(ArticleImage::getImageURL)
                .collect(Collectors.toList()))
            .reactionCount(reactionCount)
            .commentCount(commentCount)
            .nickname(article.getMember().getDeletedAt() == null ? (String) NicknameUtil.hash(
                article.getId() + article.getMember().getId()).get("nickname")
                : NicknameUtil.WITHDRAWAL_MEMBER)
            .profileIdx(article.getMember().getDeletedAt() == null ? (int) NicknameUtil.hash(
                article.getId() + article.getMember().getId()).get("profileIdx")
                : -1)
            .backgroundIdx(article.getMember().getDeletedAt() == null ? (int) NicknameUtil.hash(
                article.getId() + article.getMember().getId()).get("backgroundIdx")
                : -1)
            .content(article.getContent())
            .createdAt(article.getCreatedAt())
            .modifiedAt(article.getModifiedAt())
            .build();
    }

}