package com.ssafy.forest.domain.dto.response;

import com.ssafy.forest.domain.AlarmArgs;
import com.ssafy.forest.domain.entity.Alarm;
import com.ssafy.forest.domain.type.AlarmType;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AlarmResDto {

    private long id;
    private AlarmType alarmType;
    private AlarmArgs alarmArgs;
    private String text;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private LocalDateTime deletedAt;

    public static AlarmResDto from(Alarm alarm){
        return AlarmResDto.builder()
            .id(alarm.getId())
            .alarmType(alarm.getAlarmType())
            .text(alarm.getAlarmType().getAlarmText())
            .alarmArgs(alarm.getAlarmArgs())
            .createdAt(alarm.getCreatedAt())
            .modifiedAt(alarm.getModifiedAt())
            .deletedAt(alarm.getDeletedAt())
            .build();
    }
}
