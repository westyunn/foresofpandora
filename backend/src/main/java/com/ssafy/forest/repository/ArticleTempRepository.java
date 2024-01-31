package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.ArticleTemp;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleTempRepository extends JpaRepository<ArticleTemp, Long> {

    Page<ArticleTemp> findByMemberIdOrderByIdAsc(Long memberId, Pageable pageable);
}