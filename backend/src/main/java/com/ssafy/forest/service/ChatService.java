package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.chat.ChatMessageDto;
import com.ssafy.forest.domain.dto.chat.ChatRoomDto;
import com.ssafy.forest.domain.dto.chat.ChatRoomReqDto;
import com.ssafy.forest.domain.entity.ChatMember;
import com.ssafy.forest.domain.entity.ChatMessage;
import com.ssafy.forest.domain.entity.ChatRoom;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.ChatMemberRepository;
import com.ssafy.forest.repository.ChatMessageRepository;
import com.ssafy.forest.repository.ChatRoomRepository;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.security.TokenProvider;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class ChatService {

    private Map<String, ChatRoomDto> chatRoomMap;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMemberRepository chatMemberRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;

    @PostConstruct
    private void init() {
        chatRoomMap = new LinkedHashMap<>();
    }

    public Long create(ChatRoomReqDto dto){
        ChatRoom chatRoom = createChatRoom();

        Member member1 = memberRepository.findById(dto.getMember1Id())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
        Member member2 = memberRepository.findById(dto.getMember2Id())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));

        ChatMember chatMember1 = new ChatMember();
        chatMember1.setChatRoom(chatRoom);
        chatMember1.setMember(member1);
        chatMemberRepository.save(chatMember1);
        chatMemberRepository.flush();

        ChatMember chatMember2 = new ChatMember();
        chatMember2.setChatRoom(chatRoom);
        chatMember2.setMember(member2);
        chatMemberRepository.save(chatMember2);

        return chatRoom.getId();
    }

    private ChatRoom createChatRoom() {
        ChatRoom chatRoom = new ChatRoom();
        return chatRoomRepository.save(chatRoom);
    }

    public List<Long> getRoomList(HttpServletRequest request){
        Member member = getMemberFromAccessToken(request);

        List<ChatMember> chatMembers = chatMemberRepository.findByMember(member);

        return chatMembers.stream()
            .map(chatMember -> chatMember.getChatRoom().getId())
            .collect(Collectors.toList());
    }

    public void createMessage(HttpServletRequest request, ChatMessageDto chatMessageDto){
        Member member = getMemberFromAccessToken(request);

        ChatRoom chatRoom = chatRoomRepository.findById(chatMessageDto.getRoomId())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CHATROOM));

        ChatMessage chatMessage = ChatMessage.of(chatRoom, member, chatMessageDto.getContent());
        chatMessageRepository.save(chatMessage);
    }

    public Member getMemberFromAccessToken(HttpServletRequest request) {
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);
        return memberRepository.findById(memberFromAccessToken.getId())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

}