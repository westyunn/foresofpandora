package com.ssafy.forest.domain.dto.request;

import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.ArticleComment;
import com.ssafy.forest.domain.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArticleCommentReqDto {

    private String content;

    public ArticleComment toEntity(Article article, Member member) {
        return ArticleComment.builder()
            .content(content)
            .article(article)
            .member(member)
            .build();
    }
}
