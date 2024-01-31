package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.Article;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    Page<Article> findAllByOrderByIdAsc(Pageable pageable);

    Optional<Article> findById(Long articleId);

    void deleteById(Long articleId);

    Page<Article> findByMemberIdOrderByIdAsc(Long memberId, Pageable pageable);
}
