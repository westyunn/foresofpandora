package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.domain.entity.Reaction;
import com.ssafy.forest.domain.entity.Storage;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StorageRepository extends JpaRepository<Storage, Long> {

    Optional<Storage> findByArticleIdAndMemberId (Long articleId, Long memberId);

    List<Storage> findByMemberId(Long memberId);
}
