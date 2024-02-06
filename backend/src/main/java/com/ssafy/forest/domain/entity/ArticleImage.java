package com.ssafy.forest.domain.entity;

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
@Table(name = "ArticleImage")
@SQLDelete(sql = "UPDATE ArticleImage SET deleted_at = now() WHERE image_id = ?")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ArticleImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @Column(name = "image_url")
    private String imageURL;

    @Column(name = "step")
    private int step;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    public static ArticleImage of(Article article, String imageUrl, int step) {
        return ArticleImage.builder().
            article(article).
            imageURL(imageUrl).
            step(step).
            build();
    }

}
