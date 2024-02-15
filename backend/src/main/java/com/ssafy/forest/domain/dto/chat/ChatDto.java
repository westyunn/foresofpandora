package com.ssafy.forest.domain.dto.chat;

import com.ssafy.forest.domain.entity.ChatMessage;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatDto {

    private Long senderId;
    private String content;
    private LocalDateTime createdAt;

    public static ChatDto from(ChatMessage chatMessage) {
        return ChatDto.builder()
            .senderId(chatMessage.getMember().getId())
            .content(chatMessage.getContent())
            .createdAt(chatMessage.getCreatedAt())
            .build();
    }

}