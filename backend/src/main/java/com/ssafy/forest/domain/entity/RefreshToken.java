package com.ssafy.forest.domain.entity;


//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.OneToOne;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//@Getter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//@Entity
//public class RefreshToken extends BaseEntity {
//
//    @Id
//    @Column(name = "refresh_token_id")
//    private String id;
//
//    @JoinColumn(name = "member_id", nullable = false)
//    @OneToOne(fetch = FetchType.LAZY)
//    private Member member;
//
//    @Column(nullable = false)
//    private String keyValue;
//
//    public void updateValue(String token) {
//        this.keyValue = token;
//    }
//
//}

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "refreshToken", timeToLive = 60)
@Builder
public class RefreshToken {

    @Id
    private String value;
    private Long memberId;

    public RefreshToken(final String value, final Long memberId) {
        this.value = value;
        this.memberId = memberId;
    }

    public String getValue() {
        return value;
    }

    public Long getMemberId() {
        return memberId;
    }

}