package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.RefreshToken;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

@Repository
public class RefreshTokenRepository {

    private RedisTemplate redisTemplate;

    public RefreshTokenRepository(final RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void save(final RefreshToken refreshToken) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(refreshToken.getValue(), String.valueOf(refreshToken.getMemberId()));
        redisTemplate.expire(refreshToken.getValue(), 10L, TimeUnit.MINUTES);  // 토큰의 TLL
    }

    public Optional<RefreshToken> findByRefreshToken(final String refreshToken) {
        try {
            ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
            Long memberId = Long.parseLong(valueOperations.get(refreshToken));

            if (Objects.isNull(memberId)) {
                return Optional.empty();
            }

            return Optional.of(new RefreshToken(refreshToken, memberId));
        } catch (IllegalArgumentException e) {
            throw new CustomException(ErrorCode.NOT_EXIST_REFRESH_TOKEN);
        }
    }

    public void delete(String refreshToken) {
        redisTemplate.delete(refreshToken);
    }

}