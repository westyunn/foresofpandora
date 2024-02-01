package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.Article;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    Page<Article> findAllByOrderByCreatedAtAsc(Pageable pageable);

    void deleteById(Long articleId);

    Page<Article> findByIdInOrderByCreatedAtAsc(List<Long> articleIds, Pageable pageable);

    Page<Article> findByMemberIdOrderByCreatedAtAsc(Long memberId, Pageable pageable);

}
