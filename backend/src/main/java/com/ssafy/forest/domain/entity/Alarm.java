package com.ssafy.forest.domain.entity;

import com.ssafy.forest.domain.AlarmArgs;
import com.ssafy.forest.domain.type.AlarmType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.type.SqlTypes;

@Entity
@SQLDelete(sql = "UPDATE alarm SET deleted_at = now() WHERE alarm_id = ?")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Alarm extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id")
    private Long id;

    // 알람 받는 사람
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    private AlarmType alarmType;

    @JdbcTypeCode(SqlTypes.JSON)
    private AlarmArgs alarmArgs;

    private LocalDateTime deletedAt;

    @Builder
    public Alarm(Member member, AlarmType alarmType, AlarmArgs alarmArgs) {
        this.member = member;
        this.alarmType = alarmType;
        this.alarmArgs = alarmArgs;
    }

    public static Alarm of(Member member, AlarmType alarmType, AlarmArgs alarmArgs) {
        return Alarm.builder()
            .member(member)
            .alarmType(alarmType)
            .alarmArgs(alarmArgs)
            .build();
    }

    public void resetDeletedAt(Alarm alarm) {
        this.deletedAt = null;
    }

}
