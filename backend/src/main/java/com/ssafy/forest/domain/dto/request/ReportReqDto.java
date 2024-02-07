package com.ssafy.forest.domain.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportReqDto {

    @Size(max = 300, message = "신고 내용은 최대 300자까지 입력 가능합니다.")
    private String content;

}
