package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.ArticleComment;
import com.ssafy.forest.domain.entity.ArticleCommentReply;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleCommentReplyRepository extends JpaRepository<ArticleCommentReply, Long> {

    List<ArticleCommentReply> findAllByArticleComment(ArticleComment articleComment);

}
