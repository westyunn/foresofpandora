package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmailAndDeletedAtIsNull(String email);

    List<Member> findAllByDeletedAtIsNull();
}
