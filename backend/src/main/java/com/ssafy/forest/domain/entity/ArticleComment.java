package com.ssafy.forest.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Getter
@Table(name = "comment")
@Entity
public class ArticleComment extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id; // 댓글ID

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article; // 게시글ID

    @ManyToOne
    @Column(name = "member_id")
    private Member member; // 유저정보

    @Column(name = "comment_content")
    private String content; // 댓글내용

    @Builder
    public ArticleComment(Article article, Member member, String content){
        this.article = article;
        this.content = content;
        this.member = member;
    }
}
