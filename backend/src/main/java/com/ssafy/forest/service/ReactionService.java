package com.ssafy.forest.service;

import com.ssafy.forest.domain.AlarmArgs;
import com.ssafy.forest.domain.entity.Alarm;
import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.domain.entity.Reaction;
import com.ssafy.forest.domain.type.AlarmType;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.AlarmRepository;
import com.ssafy.forest.repository.ArticleRepository;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.repository.ReactionRepository;
import com.ssafy.forest.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;
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
    private final AlarmRepository alarmRepository;
    private final TokenProvider tokenProvider;

    //반응 누르기
    public boolean react(Long articleId, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);

        Article article = articleRepository.findByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));

        Optional<Reaction> reaction = reactionRepository.findByArticleIdAndMemberId(articleId,
            member.getId());

        // 좋아요가 이미 존재하고, deletedAt이 null 일 때 - 삭제되지 않은 상태
        if (reaction.isPresent() && reaction.get().getDeletedAt() == null) {
            reactionRepository.deleteById(reaction.get().getId());
            if ((reaction.get().getMember() != article.getMember())
                && article.getMember().getDeletedAt() == null) {
                Optional<Alarm> alarm = alarmRepository.findAlarmByMemberAndArticleId(
                    article.getMember(),
                    article.getId());
                if (alarm.isPresent() && alarm.get().getDeletedAt() == null) {
                    alarmRepository.delete(alarm.get());
                }
            }
            return false;
        }

        // 좋아요가 이미 존재하고, deletedAt이 null이 아닐 때 - 삭제된 상태
        if (reaction.isPresent() && reaction.get().getDeletedAt() != null) {
            reaction.get().resetDeletedAt(reaction.get());
            if ((reaction.get().getMember() != article.getMember())
                && article.getMember().getDeletedAt() == null) {
                Optional<Alarm> alarm = alarmRepository.findAlarmByMemberAndArticleId(
                    article.getMember(),
                    article.getId());
                if (alarm.isPresent() && alarm.get().getDeletedAt() != null) {
                    alarm.get().resetDeletedAt(alarm.get());
                }
                if (alarm.isEmpty()) {
                    alarmRepository.save(
                        Alarm.of(article.getMember(), AlarmType.NEW_REACTION_ON_ARTICLE,
                            new AlarmArgs(member.getId(), article.getId(), 0, 0, 0)));
                }
            }
            return true;
        }

        // 좋아요가 존재하지 않을 때
        Reaction createdreaction = reactionRepository.save(Reaction.from(member, article));
        if (createdreaction.getMember() != article.getMember()
            && article.getMember().getDeletedAt() == null) {
            Optional<Alarm> alarm = alarmRepository.findAlarmByMemberAndArticleId(
                article.getMember(),
                article.getId());
            if (alarm.isPresent() && alarm.get().getDeletedAt() != null) {
                alarm.get().resetDeletedAt(alarm.get());
            }
            if (alarm.isEmpty()) {
                alarmRepository.save(
                    Alarm.of(article.getMember(), AlarmType.NEW_REACTION_ON_ARTICLE,
                        new AlarmArgs(member.getId(), article.getId(), 0, 0, 0)));
            }
        }
        return true;
    }

    //나의 반응 조회
    public boolean getMyReaction(Long articleId, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);

        if (!articleRepository.existsByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)) {
            throw new CustomException(ErrorCode.INVALID_RESOURCE);
        }

        return reactionRepository.existsByArticleIdAndMemberIdAndDeletedAtIsNull(articleId,
            member.getId());
    }

    // 게시글 반응 개수 조회
    public long countReaction(Long articleId) {

        if (!articleRepository.existsByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)) {
            throw new CustomException(ErrorCode.INVALID_RESOURCE);
        }

        return reactionRepository.countByArticleIdAndDeletedAtIsNull(articleId);
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
