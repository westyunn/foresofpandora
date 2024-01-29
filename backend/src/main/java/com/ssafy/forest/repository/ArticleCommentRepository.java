package com.ssafy.forest.repository;

import com.ssafy.forest.domain.dto.response.ArticleCommentResDto;
import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.ArticleComment;
import com.ssafy.forest.domain.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleCommentRepository extends JpaRepository<ArticleComment, Long> {

    List<ArticleComment> findAllByArticle(Article article); // 해당 게시글에 대한 댓글을 모두 가져오기
    int countArticleCommentByArticle(Article article); // 해당 게시글의 댓글 갯수를 들고오기
}
