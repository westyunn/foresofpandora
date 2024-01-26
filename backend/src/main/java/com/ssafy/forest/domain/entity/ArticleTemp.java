package com.ssafy.forest.domain.entity;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "article_temp")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArticleTemp extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long articleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "title", nullable = true)
    private String title;

    @Column(name = "content", nullable = true, length = 1000)
    private String content;

    @Builder
    public ArticleTemp(Member member, String title, String content) {
        this.member = member;
        this.title = title;
        this.content = content;
    }

    public static ArticleTemp from(ArticleReqDto articleReqDto, Member member) {
        return ArticleTemp.builder()
            .member(member)
            .title(articleReqDto.getTitle())
            .content(articleReqDto.getContent())
            .build();
    }
}