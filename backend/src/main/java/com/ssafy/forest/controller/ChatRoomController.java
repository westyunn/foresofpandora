package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.chat.ChatRoomDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Tag(name = "ChatRoom API", description = "채팅방 관련 API")
@Slf4j
@RestController
@RequestMapping("/api")
public class ChatRoomController {

    // ChatService Bean 가져오기
    @Autowired
    private ChatService chatService;

    // 채팅 리스트 화면
    // "/" 로 요청이 들어오면 전체 채팅룸 리스트를 담아서 return
    @Operation(summary = "채팅 목록 조회", description = "전체 채팅룸 리스트를 반환")
    @GetMapping("/chatroom")
    public ResponseDto<?> goChatRoom(){
        log.info("SHOW ALL ChatList {}", chatService.findAllRoom());
        return ResponseDto.success(chatService.findAllRoom());
    }

    // 채팅방 생성
    // 채팅방 생성 후 다시 / 로 return
    @Operation(summary = "채팅방 생성", description = "채팅방 생성")
    @PostMapping("/chatroom")
    public ResponseDto<?> createRoom(@RequestParam String name) {
        ChatRoomDto room = chatService.createChatRoom(name);
        log.info("CREATE Chat Room {}", room);
        return ResponseDto.success(room);
    }

    // 채팅방 입장 화면
    // 파라미터로 넘어오는 roomId 를 확인후 해당 roomId 를 기준으로
    // 채팅방을 찾아서 클라이언트를 chatroom 으로 보낸다.
    @Operation(summary = "채팅방 정보 조회", description = "채팅방을 찾아 클라이언트를 채팅방으로 보냄")
    @GetMapping("/chatroom/detail")
    public ResponseDto<?> roomDetail(@RequestParam String roomId){
        log.info("roomId {}", roomId);
        return ResponseDto.success(chatService.findRoomById(roomId));
    }

}