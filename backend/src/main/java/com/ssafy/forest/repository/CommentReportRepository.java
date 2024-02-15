package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.CommentReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentReportRepository extends JpaRepository<CommentReport, Long> {
    boolean existsByArticleCommentIdAndMemberId(Long articleCommentId, Long memberId);
}
