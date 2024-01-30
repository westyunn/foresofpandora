package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.domain.entity.RefreshToken;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByMember(Member member);

}