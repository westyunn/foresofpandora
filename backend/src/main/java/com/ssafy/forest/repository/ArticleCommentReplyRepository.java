package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.ArticleComment;
import com.ssafy.forest.domain.entity.ArticleCommentReply;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleCommentReplyRepository extends JpaRepository<ArticleCommentReply, Long> {

    Optional<ArticleCommentReply> findByIdAndDeletedAtIsNull(long replyId);

    Page<ArticleCommentReply> findAllByArticleCommentAndDeletedAtIsNullOrderByCreatedAt(Pageable pageable,
        ArticleComment articleComment);

}
