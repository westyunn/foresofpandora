package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.ArticleComment;
import com.ssafy.forest.domain.entity.ArticleCommentReply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleCommentReplyRepository extends JpaRepository<ArticleCommentReply, Long> {

    Page<ArticleCommentReply> findAllByArticleCommentOrderByCreatedAt(Pageable pageable,
        ArticleComment articleComment);

    int countByArticleCommentId(long commentId);

}
