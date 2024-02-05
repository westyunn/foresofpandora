package com.ssafy.forest.domain.dto.response;

import com.ssafy.forest.domain.entity.ArticleTemp;
import com.ssafy.forest.domain.entity.ArticleTempImage;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ArticleTempResDto {

    private Long id;
    private Long memberId;
    private String content;
    private List<String> imageList;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ArticleTempResDto from(ArticleTemp articleTemp) {
        return ArticleTempResDto.builder()
            .id(articleTemp.getId())
            .memberId(articleTemp.getMember().getId())
            .content(articleTemp.getContent())
            .imageList(articleTemp.getImages().stream().map(
                ArticleTempImage::getImageURL).collect(Collectors.toList()))
            .createdAt(articleTemp.getCreatedAt())
            .modifiedAt(articleTemp.getModifiedAt()).build();
    }

}
