package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.response.AlarmResDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.dto.response.ArticleTempResDto;
import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.domain.entity.Storage;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.AlarmRepository;
import com.ssafy.forest.repository.ArticleRepository;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.repository.StorageRepository;
import com.ssafy.forest.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final ArticleRepository articleRepository;
    private final StorageRepository storageRepository;
    private final MemberRepository memberRepository;
    private final AlarmRepository alarmRepository;
    private final TokenProvider tokenProvider;
    private final ArticleCommentService articleCommentService;
    private final ReactionService reactionService;

    //내가 작성한 게시글 목록 조회
    public Page<ArticleResDto> getList(Pageable pageable, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        Page<Article> articleList = articleRepository.findAllByMemberAndIsArticleTrueAndDeletedAtIsNullOrderByCreatedAtDesc(
            member, pageable);
        return articleList.map(article -> {
            long commentCount = articleCommentService.getCommentCount(article);
            long reactionCount = reactionService.countReaction(article.getId());
            return ArticleResDto.of(article, commentCount, reactionCount);
        });
    }

    //내가 보관한 게시글 목록 조회
    public Page<ArticleResDto> getStoredList(Pageable pageable, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);

        List<Long> articleIds = storageRepository.findByMemberIdAndArticle_DeletedAtIsNull(
                member.getId()).stream()
            .map(Storage::getArticle)
            .map(Article::getId)
            .collect(Collectors.toList());

        Page<Article> storedList = articleRepository.findByIdInOrderByCreatedAtDesc(
            articleIds, pageable);

        return storedList.map(article -> {
            long commentCount = articleCommentService.getCommentCount(article);
            long reactionCount = reactionService.countReaction(article.getId());
            return ArticleResDto.of(article, commentCount, reactionCount);
        });
    }

    //내가 임시저장한 게시글 목록 조회
    public Page<ArticleTempResDto> getTempList(Pageable pageable, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        Page<Article> articleTemps = articleRepository.findAllByMemberAndIsArticleFalseAndDeletedAtIsNullOrderByCreatedAtDesc(
            member, pageable);
        return articleTemps.map(ArticleTempResDto::from);
    }

    //유저의 게시글 쓰기 가능 횟수 조회
    public boolean getArticleCreationLimit(HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);

        if (member.getArticleCreationLimit() > 0) {
            return true;
        } else {
            return false;
        }
    }

    // 매일 정각에 유저의 게시글 쓰기 가능 횟수 8로 초기화
    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void resetArticleCreationLimit() {
        List<Member> members = memberRepository.findAllByDeletedAtIsNull();
        for (Member member : members) {
            member.resetArticleCreationLimit();
        }
        memberRepository.saveAll(members);
    }

    // 알람 리스트 들고오기
    public Page<AlarmResDto> alarmList(Pageable pageable, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        return alarmRepository.findAllByMemberAndDeletedAtIsNullOrderByModifiedAtDesc(member, pageable).map(AlarmResDto::from);
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
