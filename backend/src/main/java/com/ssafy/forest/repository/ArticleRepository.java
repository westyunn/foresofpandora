package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    Page<Article> findAllByIsArticleTrueOrderByCreatedAtAsc(Pageable pageable);

    Optional<Article> findByIdAndIsArticleIsTrue(Long articleId);

    Optional<Article> findByIdAndMemberAndIsArticleIsFalse(Long articleId, Member member);

    boolean existsById(Long articleId);

    Page<Article> findByIdInOrderByCreatedAtAsc(List<Long> articleIds, Pageable pageable);

    Page<Article> findAllByMemberAndIsArticleTrueOrderByCreatedAtAsc(Member member,
        Pageable pageable);

    Page<Article> findAllByMemberAndIsArticleFalseOrderByCreatedAtAsc(Member member,
        Pageable pageable);

}
