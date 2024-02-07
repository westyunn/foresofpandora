package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.ArticleComment;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleCommentRepository extends JpaRepository<ArticleComment, Long> {

    @Query("SELECT c, COUNT(distinct r) " +
        "FROM ArticleComment c " +
        "LEFT JOIN c.replies r " +
        "WHERE c.article = :article " +
        "AND c.deletedAt IS NULL " +
        "AND c.article.isArticle = true " +
        "AND c.article.deletedAt IS NULL " +
        "GROUP BY c")
    Page<Object[]> findAllWithReplyCountByArticle(Pageable pageable,
        @Param("article") Article article);

    Optional<ArticleComment> findByIdAndDeletedAtIsNullAndArticleId(long commentId, long articleId);

    Boolean existsByIdAndDeletedAtIsNullAndArticleId(
        long commentId, long articleId);

    long countByArticleAndDeletedAtIsNull(Article article);

}
