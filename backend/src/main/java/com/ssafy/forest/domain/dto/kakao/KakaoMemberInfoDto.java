package com.ssafy.forest.domain.dto.kakao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class KakaoMemberInfoDto {

    private Long id;
    private String email;

}