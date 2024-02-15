package com.ssafy.forest.domain.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArticleCommentReplyReqDto {

    private long targetReplyId;
    private long tagId;
    private String content;

}
