package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.Article;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    Optional<Article> findById(Long articleId);

    void deleteById(Long articleId);

    List<Article> findByMemberId(Long memberId);
}
