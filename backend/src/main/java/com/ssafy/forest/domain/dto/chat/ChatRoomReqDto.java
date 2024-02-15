package com.ssafy.forest.domain.dto.chat;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoomReqDto {

    private Long member1Id;
    private Long member2Id;

}