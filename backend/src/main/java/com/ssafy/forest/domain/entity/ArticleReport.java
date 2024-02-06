package com.ssafy.forest.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "articleReport")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArticleReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "articleReport_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @Builder
    public ArticleReport(Member member, Article article) {
        this.member = member;
        this.article = article;
    }

    public static ArticleReport from(Member member, Article article) {
        return ArticleReport.builder()
            .member(member)
            .article(article)
            .build();
    }

}