package com.ssafy.forest.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Slf4j
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        log.info("SOCKET 연결!");
        // stomp 접속 주소 url => /ws-stomp
        registry.addEndpoint("/ws-stomp") // 연결될 엔드포인트
            .withSockJS(); // SocketJS 를 연결한다는 설정
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 메시지를 구독하는 요청 url => 즉 메시지 받을 때
        // sub 로 보내면 이곳을 한번 거쳐서 프론트에 데이터를 전달해준다.
        registry.enableSimpleBroker("/sub");

        // 메시지를 발행하는 요청 url => 즉 메시지 보낼 때
        //pub 로 데이터를 받으면 이곳을 한번 거쳐서 URI 만 MessageMapping 에 매핑이 된다.
        //ex) pub/chat/message 라면 pub 를 제외하고 /chat/message 를 @MessageMapping 에 매핑한다.
        registry.setApplicationDestinationPrefixes("/pub");
    }

}