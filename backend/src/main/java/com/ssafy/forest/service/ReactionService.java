package com.ssafy.forest.service;

import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.domain.entity.Reaction;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.ArticleRepository;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.repository.ReactionRepository;
import com.ssafy.forest.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReactionService {

    private final ReactionRepository reactionRepository;
    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;

    //반응 누르기
    public boolean react(Long articleId, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);

        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));

        Reaction reaction = reactionRepository.findByArticleIdAndMemberId(articleId,
            member.getId()).orElse(null);

        if (reaction == null) {
            reactionRepository.save(Reaction.from(member, article));
            return true;
        } else {
            reactionRepository.deleteById(reaction.getId());
            return false;
        }
    }

    //나의 반응 조회
    public boolean getMyReaction(Long articleId, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);

        if (!articleRepository.existsById(articleId)) {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
        }

        return reactionRepository.existsByArticleIdAndMemberId(articleId,
            member.getId());
    }

    // 게시글 반응 개수 조회
    public long countReaction(Long articleId) {

        if (!articleRepository.existsById(articleId)) {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
        }

        return reactionRepository.countByArticleId(articleId);
    }

    //유저 정보 추출
    public Member getMemberFromAccessToken(HttpServletRequest request) {
        // accessToken으로부터 Member 객체 추출
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);
        // memberFromAccessToken의 id로 최신 상태의 Member 객체 조회
        return memberRepository.findById(memberFromAccessToken.getId())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

}
