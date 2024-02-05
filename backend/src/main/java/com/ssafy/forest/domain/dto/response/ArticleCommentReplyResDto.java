package com.ssafy.forest.domain.dto.response;

import com.ssafy.forest.domain.entity.ArticleCommentReply;
import com.ssafy.forest.util.NicknameUtil;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ArticleCommentReplyResDto {

    private Long commentReplyId;
    private Long memberId;
    private String content;
    private String nickname;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ArticleCommentReplyResDto of(ArticleCommentReply articleCommentReply, Long articleId) {
        return ArticleCommentReplyResDto.builder().
            commentReplyId(articleCommentReply.getId()).
            memberId(articleCommentReply.getMember().getId()).
            content(articleCommentReply.getContent()).
            nickname(NicknameUtil.hash(articleId + articleCommentReply.getMember().getId())).
            createdAt(articleCommentReply.getCreatedAt()).
            modifiedAt(articleCommentReply.getModifiedAt()).
            build();
    }

}
