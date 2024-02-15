package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.Reaction;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    Optional<Reaction> findByArticleIdAndMemberId(Long articleId, Long memberId);

    boolean existsByArticleIdAndMemberIdAndDeletedAtIsNull(Long articleId, Long memberId);

    long countByArticleIdAndDeletedAtIsNull(Long articleId);

}
