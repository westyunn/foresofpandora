package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    Page<Article> findAllByIsArticleTrueAndDeletedAtIsNullOrderByCreatedAtDesc(Pageable pageable);

    Optional<Article> findByIdAndIsArticleIsTrueAndDeletedAtIsNull(Long articleId);

    Optional<Article> findByIdAndMemberAndIsArticleIsFalseAndDeletedAtIsNull(Long articleId, Member member);

    boolean existsByIdAndIsArticleIsTrueAndDeletedAtIsNull(Long articleId);

    Page<Article> findByIdInOrderByCreatedAtDesc(List<Long> articleIds, Pageable pageable);

    Page<Article> findAllByMemberAndIsArticleTrueAndDeletedAtIsNullOrderByCreatedAtAsc(
        Member member, Pageable pageable);

    Page<Article> findAllByMemberAndIsArticleFalseAndDeletedAtIsNullOrderByCreatedAtAsc(
        Member member, Pageable pageable);

}
