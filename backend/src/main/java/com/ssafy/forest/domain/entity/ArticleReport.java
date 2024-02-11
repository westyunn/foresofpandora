package com.ssafy.forest.domain.entity;

import com.ssafy.forest.domain.dto.request.ReportReqDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArticleReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_report_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @Column(name = "article_report_content", length = 300)
    private String content;

    @Builder
    public ArticleReport(Member member, Article article, String content) {
        this.member = member;
        this.article = article;
        this.content = content;
    }

    public static ArticleReport from(Member member, Article article, ReportReqDto reportReqDto) {
        return ArticleReport.builder()
            .member(member)
            .article(article)
            .content(reportReqDto.getContent())
            .build();
    }

}