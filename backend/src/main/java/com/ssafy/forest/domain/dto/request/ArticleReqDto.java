package com.ssafy.forest.domain.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArticleReqDto {

    @Size(max = 500, message = "게시글 내용은 최대 500자까지 입력 가능합니다.")
    private String content;

}
