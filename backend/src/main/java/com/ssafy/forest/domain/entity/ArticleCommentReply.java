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
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;

@Entity
@Getter
@Table(name = "articleCommentReply")
@SQLDelete(sql = "UPDATE article_comment_reply SET deleted_at = now() WHERE comment_reply_id = ?")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ArticleCommentReply extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_reply_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private ArticleComment articleComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "reply_content", nullable = false, length = 500)
    private String content;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    public static ArticleCommentReply of(ArticleCommentReplyReqDto articleCommentReplyReqDto,
        ArticleComment articleComment, Member member) {
        return ArticleCommentReply.builder().
            articleComment(articleComment).
            member(member).
            content(articleCommentReplyReqDto.getContent()).
            build();
    }

    public void upadteContent(String content) {
        this.content = content;
    }

}
