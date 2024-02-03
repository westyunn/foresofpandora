package com.ssafy.forest.domain.dto.response;

import com.ssafy.forest.domain.entity.ArticleTemp;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ArticleTempResDto {

    private Long id;
    private Long memberId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ArticleTempResDto from(ArticleTemp articleTemp) {
        return new ArticleTempResDto(
            articleTemp.getId(),
            articleTemp.getMember().getId(),
            articleTemp.getContent(),
            articleTemp.getCreatedAt(),
            articleTemp.getModifiedAt()
        );
    }

}