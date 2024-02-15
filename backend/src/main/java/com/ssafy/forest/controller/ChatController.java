package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.chat.ChatMessageDto;
import com.ssafy.forest.domain.dto.chat.ChatRoomReqDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Chat API", description = "채팅방 관련 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    @Operation(summary = "채팅방 생성", description = "채팅방 생성")
    @PostMapping("/rooms")
    public ResponseDto<?> createRoom(@RequestBody ChatRoomReqDto chatRoomReqDto) {
        Long roomId = chatService.create(chatRoomReqDto);
        log.info("CREATE Chat Room {}", roomId);
        return ResponseDto.success(roomId);
    }

    @Operation(summary = "나의 채팅 목록 조회", description = "전체 채팅룸 리스트를 반환")
    @GetMapping("/rooms")
    public ResponseDto<?> getRoomList(HttpServletRequest httpServletRequest){
        log.info("SHOW my ChatList {}");
        return ResponseDto.success(chatService.getRoomList(httpServletRequest));
    }

    @Operation(summary = "채팅 메세지 저장", description = "채팅 메세지 저장")
    @PostMapping("/rooms/{roomId}")
    public ResponseDto<?> createMessage(
        HttpServletRequest httpServletRequest, @PathVariable Long roomId, @RequestBody ChatMessageDto chatMessageDto){
        chatService.createMessage(httpServletRequest, chatMessageDto);
        return ResponseDto.success("SUCCESS");
    }

}