package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.ArticleCommentReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleCommentReplyRepository extends JpaRepository<ArticleCommentReply, Long> {

}
