package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.ArticleTemp;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleTempRepository extends JpaRepository<ArticleTemp, Long> {
    List<ArticleTemp> findByMemberId(Long memberId);
}