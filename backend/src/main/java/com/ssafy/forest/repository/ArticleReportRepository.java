package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.ArticleReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleReportRepository extends JpaRepository<ArticleReport, Long> {
    boolean existsByArticleIdAndMemberId(Long articleId, Long memberId);
}
