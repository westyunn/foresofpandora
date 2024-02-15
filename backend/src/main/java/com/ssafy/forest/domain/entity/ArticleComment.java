package com.ssafy.forest.domain.entity;

import com.ssafy.forest.domain.dto.request.ArticleCommentReqDto;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;

@Entity
@Getter
@SQLDelete(sql = "UPDATE article_comment SET deleted_at = now() WHERE comment_id = ?")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ArticleComment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false, length = 200)
    private String content;

    private LocalDateTime deletedAt;

    @OneToMany(mappedBy = "articleComment", cascade = CascadeType.REMOVE)
    private List<ArticleCommentReply> replies = new ArrayList<>();

    public static ArticleComment of(ArticleCommentReqDto articleCommentReqDto, Article article,
        Member member) {
        return ArticleComment.builder().
            article(article).
            member(member).
            content(articleCommentReqDto.getContent()).
            build();
    }

    public void updateContent(String content) {
        this.content = content;
    }

}
