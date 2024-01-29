package com.ssafy.forest.domain.dto.kakao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class KakaoMemberInfoDto {

    private Long id;  // 카카오 ID
    private String email;  // 카카오 이메일

}