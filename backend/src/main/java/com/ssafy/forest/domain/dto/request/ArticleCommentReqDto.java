package com.ssafy.forest.domain.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArticleCommentReqDto {

    @Size(max = 200, message = "댓글 내용은 최대 200자까지 입력 가능합니다.")
    private String content;

}
