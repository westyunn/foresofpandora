package com.ssafy.forest.domain.entity;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
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
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

@Entity
@Table(name = "article")
@Getter
@SQLDelete(sql = "UPDATE article SET deleted_at = now() WHERE article_id = ?")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Article extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "content", nullable = true, length = 1000)
    private String content;

    @Column(name = "is_article")
    private Boolean isArticle;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    private List<ArticleComment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    private List<ArticleImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    private List<Reaction> reactions = new ArrayList<>();

    @Builder
    public Article(Member member, String content, boolean isArticle) {
        this.member = member;
        this.content = content;
        this.isArticle = isArticle;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void updateIsArticle() {
        this.isArticle = true;
    }

    public void updateTimeStamp() {
        LocalDateTime now = LocalDateTime.now();
        super.createdAt = now;
        super.modifiedAt = now;
    }

    public static Article from(ArticleReqDto articleReqDto, Member member, boolean isArticle) {
        return Article.builder()
            .member(member)
            .content(articleReqDto.getContent())
            .isArticle(isArticle)
            .build();
    }

}
