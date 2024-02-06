package com.ssafy.forest.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "replyReport")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReplyReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "replyReport_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_reply_id")
    private ArticleCommentReply articleCommentReply;

    @Builder
    public ReplyReport(Member member, ArticleCommentReply articleCommentReply) {
        this.member = member;
        this.articleCommentReply = articleCommentReply;
    }

    public static ReplyReport from(Member member, ArticleCommentReply articleCommentReply) {
        return ReplyReport.builder()
            .member(member)
            .articleCommentReply(articleCommentReply)
            .build();
    }

}