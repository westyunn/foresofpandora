package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.ChatMember;
import com.ssafy.forest.domain.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMemberRepository extends JpaRepository<ChatMember, Long> {

    List<ChatMember> findByMember(Member member);

}
