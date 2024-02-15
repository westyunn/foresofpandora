package com.ssafy.forest.domain.entity;

import com.ssafy.forest.domain.dto.request.ArticleCommentReplyReqDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;

@Entity
@Getter
@SQLDelete(sql = "UPDATE article_comment_reply SET deleted_at = now() WHERE article_comment_reply_id = ?")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ArticleCommentReply extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_comment_reply_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private ArticleComment articleComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "reply_content", nullable = false, length = 200)
    private String content;

    private Long tagId;

    private LocalDateTime deletedAt;

    public static ArticleCommentReply of(ArticleCommentReplyReqDto articleCommentReplyReqDto,
        ArticleComment articleComment, Member member) {
        return ArticleCommentReply.builder().
            articleComment(articleComment).
            member(member).
            content(articleCommentReplyReqDto.getContent()).
            tagId(articleCommentReplyReqDto.getTagId()).
            build();
    }

    public void upadteContent(String content) {
        this.content = content;
    }

}
