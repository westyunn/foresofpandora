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
public class ReplyReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reply_report_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_reply_id")
    private ArticleCommentReply articleCommentReply;

    @Column(name = "reply_report_content", length = 300)
    private String content;

    @Builder
    public ReplyReport(Member member, ArticleCommentReply articleCommentReply, String content) {
        this.member = member;
        this.articleCommentReply = articleCommentReply;
        this.content = content;
    }

    public static ReplyReport from(Member member, ArticleCommentReply articleCommentReply,
        ReportReqDto reportReqDto) {
        return ReplyReport.builder()
            .member(member)
            .articleCommentReply(articleCommentReply)
            .content(reportReqDto.getContent())
            .build();
    }

}