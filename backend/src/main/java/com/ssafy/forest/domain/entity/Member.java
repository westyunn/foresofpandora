package com.ssafy.forest.domain.entity;

import com.ssafy.forest.domain.type.MemberType;
import com.ssafy.forest.domain.type.SocialType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE member SET deleted_at = now() WHERE member_id = ?")
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;

    @Enumerated(EnumType.STRING)
    private MemberType memberType;

    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    private String kakaoRefreshToken;

    private LocalDateTime deletedAt;

    private int articleCreationLimit;

    public void updateKakaoRefreshToken(String token) {
        this.kakaoRefreshToken = token;
    }

    public void resetArticleCreationLimit() {
        this.articleCreationLimit = 8;
    }

    public void minusArticleCreationLimit(int limit) {
        this.articleCreationLimit = limit - 1;
    }
}
