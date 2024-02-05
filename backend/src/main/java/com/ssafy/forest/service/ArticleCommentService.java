package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleCommentReqDto;
import com.ssafy.forest.domain.dto.response.ArticleCommentResDto;
import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.ArticleComment;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.ArticleCommentReplyRepository;
import com.ssafy.forest.repository.ArticleCommentRepository;
import com.ssafy.forest.repository.ArticleRepository;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ArticleCommentService {

    private final ArticleCommentRepository articleCommentRepository;
    private final ArticleRepository articleRepository;
    private final ArticleCommentReplyRepository articleCommentReplyRepository;
    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;

    public ArticleCommentResDto create(
        HttpServletRequest request, Long articleId, ArticleCommentReqDto articleCommentReqDto) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));

        Member member = getMemberFromAccessToken(request);

        ArticleComment articleComment = ArticleComment.of(articleCommentReqDto, article, member);

        return ArticleCommentResDto.of(articleCommentRepository.save(articleComment), articleId,0);
    }

    @Transactional(readOnly = true)
    public Page<ArticleCommentResDto> getListArticle(Pageable pageable, Long articleId) {
        // ArticleId를 통해 Article 엔티티 찾기
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));

        return articleCommentRepository.findAllByArticleOrderByCreatedAt(pageable, article)
            .map(comment -> ArticleCommentResDto.of(comment, articleId, getReplyCount(comment)));
    }

    public ArticleCommentResDto update(
        HttpServletRequest request, Long articleId, Long commentId,
        ArticleCommentReqDto articleCommentReqDto) {

        // commentId를 통해 comment가 있는지 확인
        ArticleComment comment = articleCommentRepository.findById(commentId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COMMENT));

        Member member = getMemberFromAccessToken(request);

        if (!member.getId().equals(comment.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        comment.updateContent(articleCommentReqDto.getContent());
        return ArticleCommentResDto.of(articleCommentRepository.save(comment), articleId, getReplyCount(comment));
    }

    public void delete(HttpServletRequest request, Long commentId) {
        // ArticleId를 통해 Article 엔티티 찾기
        ArticleComment comment = articleCommentRepository.findById(commentId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COMMENT));

        Member member = getMemberFromAccessToken(request);

        if (!member.getId().equals(comment.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        articleCommentRepository.deleteById(commentId);
    }

    public long getCommentCount(Article article) {
        return articleCommentRepository.countArticleCommentByArticle(article);
    }

    private long getReplyCount(ArticleComment comment) {
        return articleCommentReplyRepository.countByArticleCommentId(comment.getId());
    }

    public Member getMemberFromAccessToken(HttpServletRequest request) {
        // accessToken으로부터 Member 객체 추출
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);

        // memberFromAccessToken의 id로 최신 상태의 Member 객체 조회
        return memberRepository.findById(memberFromAccessToken.getId())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

}