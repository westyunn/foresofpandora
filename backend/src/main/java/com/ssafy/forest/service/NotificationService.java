package com.ssafy.forest.service;

import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

    //유저와 연결
    public SseEmitter connect(HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);

        SseEmitter emitter = new SseEmitter();

        //연결 완료, 오류, 타임아웃 이벤트 핸들러 등록
        emitter.onCompletion(() -> {
            emitters.remove(member.getId());
            emitter.complete();
        });

        emitter.onError((e) -> {
            emitters.remove(member.getId());
            emitter.complete();
        });

        emitter.onTimeout(() -> {
            emitters.remove(member.getId());
            emitter.complete();
        });

        emitters.put(member.getId(), emitter);
        return emitter;
    }

    //알림 보내기
    public void notify(HttpServletRequest request, Long clientId, String message) {
        Member member = getMemberFromAccessToken(request);

        if (!memberRepository.existsById(clientId))
            throw new CustomException(ErrorCode.NOT_FOUND_MEMBER);

        if (!member.getId().equals(clientId)) {
            SseEmitter emitter = emitters.get(clientId);

            if (emitter != null) {
                try {
                    emitter.send(SseEmitter.event().data(message));
                } catch (Exception e) {
                    emitter.completeWithError(e);
                }
            }
        }
    }


    //유저 정보 추출
    public Member getMemberFromAccessToken(HttpServletRequest request) {
        // accessToken으로부터 Member 객체 추출
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);
        // memberFromAccessToken의 id로 최신 상태의 Member 객체 조회
        return memberRepository.findById(memberFromAccessToken.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

}
