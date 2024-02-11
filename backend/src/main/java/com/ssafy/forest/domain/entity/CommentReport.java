package com.ssafy.forest.domain.entity;

import com.ssafy.forest.domain.dto.request.ReportReqDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_report_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private ArticleComment articleComment;

    @Column(name = "comment_report_content", length = 300)
    private String content;

    @Builder
    public CommentReport(Member member, ArticleComment articleComment, String content) {
        this.member = member;
        this.articleComment = articleComment;
        this.content = content;
    }

    public static CommentReport from(Member member, ArticleComment articleComment,
        ReportReqDto reportReqDto) {
        return CommentReport.builder()
            .member(member)
            .articleComment(articleComment)
            .content(reportReqDto.getContent())
            .build();
    }

}