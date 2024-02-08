package com.ssafy.forest.service;

import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.domain.entity.Storage;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.ArticleRepository;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.repository.StorageRepository;
import com.ssafy.forest.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class StorageService {

    private final StorageRepository storageRepository;
    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;

    //나의 게시글 보관여부 조회
    public boolean getMyStorage(Long articleId, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);

        if (!articleRepository.existsByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)) {
            throw new CustomException(ErrorCode.INVALID_RESOURCE);
        }

        return storageRepository.existsByArticleIdAndMemberId(articleId, member.getId());
    }

    //보관 누르기
    public boolean store(Long articleId, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);

        Article article = articleRepository.findByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));

        Storage storage = storageRepository.findByArticleIdAndMemberId(
            articleId,
            member.getId()).orElse(null);

        if (storage == null) {
            storageRepository.save(Storage.from(member, article));
            return true;
        } else {
            storageRepository.deleteById(storage.getId());
            return false;
        }
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
