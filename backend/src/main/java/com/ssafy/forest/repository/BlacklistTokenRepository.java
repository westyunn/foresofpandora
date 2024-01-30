package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.BlacklistToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlacklistTokenRepository extends JpaRepository<BlacklistToken, String> {

}