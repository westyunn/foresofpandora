package com.ssafy.forest.domain.dto.chat;

import com.ssafy.forest.domain.entity.ChatMember;
import com.ssafy.forest.domain.entity.ChatRoom;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;

@Builder
public class ChatRoomDto {

    private Long roomId;

    private List<Long> memberList;

    public static ChatRoomDto from(ChatRoom chatRoom){
        List<Long> memberIdList = new ArrayList<>();
        for (ChatMember chatMember : chatRoom.getChatMembers()) {
            memberIdList.add(chatMember.getMember().getId());
        }
        return ChatRoomDto.builder()
            .roomId(chatRoom.getId())
            .memberList(memberIdList)
            .build();
    }

}