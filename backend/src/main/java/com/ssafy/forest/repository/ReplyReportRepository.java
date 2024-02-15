package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.ReplyReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyReportRepository extends JpaRepository<ReplyReport, Long> {
    boolean existsByArticleCommentReplyIdAndMemberId(Long articleCommentReplyId, Long memberId);
}
