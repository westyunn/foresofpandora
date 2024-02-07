package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.ArticleComment;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleCommentRepository extends JpaRepository<ArticleComment, Long> {

    Page<ArticleComment> findAllByArticleAndDeletedAtIsNullOrderByCreatedAt(Pageable pageable,
        Article article);

    Optional<ArticleComment> findByIdAndDeletedAtIsNullAndArticleId(long commentId, long articleId);

    Boolean existsByIdAndDeletedAtIsNullAndArticleId(
        long commentId, long articleId);

    long countByArticleAndDeletedAtIsNull(Article article);

}
