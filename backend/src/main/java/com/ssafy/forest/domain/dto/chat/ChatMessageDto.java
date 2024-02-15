package com.ssafy.forest.domain.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDto {

    private Long roomId; // 방 번호
    private String sender; // 채팅을 보낸 사람
    private String content; // 메시지

}
