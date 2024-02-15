package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.ChatMessage;
import com.ssafy.forest.domain.entity.ChatRoom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findAllByChatRoom(ChatRoom chatRoom);

}
