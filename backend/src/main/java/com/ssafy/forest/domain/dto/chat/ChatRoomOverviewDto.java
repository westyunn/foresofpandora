package com.ssafy.forest.domain.dto.chat;

import com.ssafy.forest.domain.entity.ChatMessage;
import com.ssafy.forest.domain.entity.ChatRoom;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomOverviewDto {

    private Long roomId;
    private String message;

    public static ChatRoomOverviewDto from(ChatRoom chatRoom) {
        List<ChatMessage> chatMessages = chatRoom.getChatMessages();
        return ChatRoomOverviewDto.builder()
            .roomId(chatRoom.getId())
            .message(chatMessages.isEmpty() || chatMessages.size() == 0 ? null : chatMessages.get(chatMessages.size()-1).getContent())
            .build();
    }

}
