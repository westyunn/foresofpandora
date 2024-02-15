package com.ssafy.forest.repository;

//import com.ssafy.forest.domain.entity.Member;
//import com.ssafy.forest.domain.entity.RefreshToken;
//import java.util.Optional;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
//
//    Optional<RefreshToken> findByMember(Member member);
//
//}

import com.ssafy.forest.domain.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
    RefreshToken findByMemberId(Long memberId);
}