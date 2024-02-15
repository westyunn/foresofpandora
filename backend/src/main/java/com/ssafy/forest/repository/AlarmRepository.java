package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.Alarm;
import com.ssafy.forest.domain.entity.Member;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    Page<Alarm> findAllByMemberAndDeletedAtIsNullOrderByModifiedAtDesc(Member member, Pageable pageable);

    @Query("SELECT a FROM Alarm a WHERE a.alarmType = 'NEW_REACTION_ON_ARTICLE' AND JSON_VALUE(a.alarmArgs, '$.articleId') = :articleId AND a.member = :member")
    Optional<Alarm> findAlarmByMemberAndArticleId(@Param("member") Member member, @Param("articleId") Long articleId);

}
