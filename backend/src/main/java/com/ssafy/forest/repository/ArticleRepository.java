package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.Member;
import jakarta.persistence.Tuple;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    // 게시글 목록 조회
    @Query("SELECT a, COUNT(DISTINCT r), COUNT(DISTINCT c) " +
        "FROM Article a " +
        "LEFT JOIN a.reactions r " +
        "LEFT JOIN a.comments c " +
        "WHERE a.isArticle = true " +
        "AND a.deletedAt IS NULL " +
        "AND c.deletedAt IS NULL " +
        "GROUP BY a")
    Page<Object[]> findAllWithReactionCountAndCommentCount(Pageable pageable);

    @Query("SELECT a, COUNT(DISTINCT r), COUNT(DISTINCT c) " +
        "FROM Article a " +
        "LEFT JOIN a.reactions r " +
        "LEFT JOIN a.comments c " +
        "WHERE a.id = :articleId " +
        "AND a.isArticle = true " +
        "AND a.deletedAt IS NULL " +
        "AND c.deletedAt IS NULL " +
        "GROUP BY a")
    Optional<Tuple> findArticleWithReactionCountAndCommentCount(@Param("articleId") Long articleId);

    // 게시글 단건조회
    Optional<Article> findByIdAndIsArticleIsTrueAndDeletedAtIsNull(Long articleId);

    // 내가 쓴 임시저장 단건조회
    Optional<Article> findByIdAndMemberAndIsArticleIsFalseAndDeletedAtIsNull(Long articleId,
        Member member);

    // 게시글 있는지 판단
    boolean existsByIdAndIsArticleIsTrueAndDeletedAtIsNull(Long articleId);

    // 내가 보관한 목록 조회
    Page<Article> findByIdInOrderByCreatedAtDesc(List<Long> articleIds, Pageable pageable);

    // 내가 쓴 글 조회
    Page<Article> findAllByMemberAndIsArticleTrueAndDeletedAtIsNullOrderByCreatedAtDesc(
        Member member, Pageable pageable);

    Page<Article> findAllByMemberAndIsArticleFalseAndDeletedAtIsNullOrderByCreatedAtDesc(
        Member member, Pageable pageable);

}
