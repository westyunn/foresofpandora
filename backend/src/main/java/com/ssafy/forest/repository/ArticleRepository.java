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

    // 게시글 목록 조회
    Page<Article> findAllByIsArticleTrueAndDeletedAtIsNullOrderByCreatedAtDesc(Pageable pageable);

    // 게시글 단건조회
    Optional<Article> findByIdAndIsArticleIsTrueAndDeletedAtIsNull(Long articleId);

    // 내가 쓴 임시저장 단건조회
    Optional<Article> findByIdAndMemberAndIsArticleIsFalseAndDeletedAtIsNull(Long articleId, Member member);

    // 게시글 있는지 판단
    boolean existsByIdAndIsArticleIsTrueAndDeletedAtIsNull(Long articleId);

    // 내가 보관한 목록 조회
    Page<Article> findByIdInOrderByCreatedAtDesc(List<Long> articleIds, Pageable pageable);

    // 내가 쓴 글 조회
    Page<Article> findAllByMemberAndIsArticleTrueAndDeletedAtIsNullOrderByCreatedAtAsc(
        Member member, Pageable pageable);

    Page<Article> findAllByMemberAndIsArticleFalseAndDeletedAtIsNullOrderByCreatedAtAsc(
        Member member, Pageable pageable);

}
