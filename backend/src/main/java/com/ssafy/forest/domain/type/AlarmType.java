package com.ssafy.forest.domain.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum AlarmType  {

    NEW_COMMENT_ON_ARTICLE("숲속의 누군가가 당신의 글에 댓글을 남겼어요!"),
    NEW_REACTION_ON_ARTICLE("숲속의 누군가가 당신의 글을 좋아해요!"),
    NEW_REPLY_ON_COMMENT("숲속의 누군가가 당신의 댓글에 답글을 남겼어요!"),
    NEW_REPLY_ON_REPLY("숲속의 누군가가 당신의 답글에 답글을 남겼어요!")
    ;

    private final String alarmText;
}
