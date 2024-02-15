package com.ssafy.forest.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.forest.domain.UserDetailsImpl;
import com.ssafy.forest.domain.dto.TokenDto;
import com.ssafy.forest.domain.dto.kakao.KakaoMemberInfoDto;
import com.ssafy.forest.domain.dto.response.MemberResDto;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.domain.type.MemberType;
import com.ssafy.forest.domain.type.SocialType;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class KakaoOauthService {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;

    @Value("${kakao.rest-api-key}")
    String API_KEY;

    @Transactional
    public MemberResDto kakaoLogin(String authCode, HttpServletRequest request, HttpServletResponse response) {

        log.info(request.getRequestURI());
        log.info(String.valueOf(request.getRequestURL()));

        // 1. 로그인 성공 후 획득한 인가 코드로 kakaoAccessToken을 요청
        TokenDto kakaoTokenDto = getAccessToken(authCode, "login");
        log.info("[KakaoAccessToken] " +  kakaoTokenDto.getAccessToken());
        log.info("[KakaoRefreshToken] " +  kakaoTokenDto.getRefreshToken());

        // 2. accessToken을 이용해 카카오 API 호출하여 response 받기(사용자 정보 json받아서 id, email 빼기)
        KakaoMemberInfoDto kakaoMemberInfo = getKakaoMemberInfo(kakaoTokenDto.getAccessToken());

        // 3. 기존에 가입된 이메일인지 확인 후, 가입되지 않은 이메일이면 회원 등록
        Member member = registerKakaoUserIfNeeded(kakaoMemberInfo, kakaoTokenDto.getRefreshToken());

        // 4. 강제 로그인 처리
        forceLogin(member, response);

        return MemberResDto.from(member);
    }

    // 연동 해제 요청 실행
    public void unlink(String kakaoRefreshToken) {
        String kakaoAccessToken = getKakaoAccessTokenFromKakaoRefreshToken(kakaoRefreshToken);

        HttpHeaders logoutHeaders = new HttpHeaders();
        logoutHeaders.add("Content-type", "application/x-www-form-urlencoded");
        logoutHeaders.add("Authorization", "Bearer " + kakaoAccessToken);

        MultiValueMap<String, String> logoutRequestParam = new LinkedMultiValueMap<>();

        HttpEntity<MultiValueMap<String, String>> logoutRequest = new HttpEntity<>(logoutRequestParam, logoutHeaders);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> logoutResponse = rt.exchange(
            "https://kapi.kakao.com/v1/user/unlink",
            HttpMethod.POST,
            logoutRequest,
            String.class
        );
//        String responseBody = logoutResponse.getBody();
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode jsonNode = objectMapper.readTree(responseBody);
//        return jsonNode.get("id").asText();
    }

    private TokenDto getAccessToken(String code, String mode) {
        String redirectUrl;
        if (mode.equals("login")) {
           redirectUrl = "http://localhost:8081/auth/success";  // 백 서버
//             redirectUrl = "http://localhost:3000/auth/kakao";  // 프론트 서버
        }
        else {
           redirectUrl = "http://localhost:8080/auth/kakaologout";  // 로컬 서버
            // redirectUrl = "http://localhost:5173/3000";  // 프론트 서버
        }

        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", API_KEY);
        body.add("redirect_uri", redirectUrl);
        body.add("code", code);

        // HTTP 요청 보내기(access token 획득)
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
            new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
            "https://kauth.kakao.com/oauth/token",
            HttpMethod.POST,
            kakaoTokenRequest,
            String.class
        );

        // HTTP 응답 (JSON) -> 액세스 토큰 파싱
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(responseBody);
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.JSON_PROCESSING_ERROR);
        }

        return TokenDto.builder()
            .accessToken(jsonNode.get("access_token").asText())
            .refreshToken(jsonNode.get("refresh_token").asText())
            .build();
    }

    private KakaoMemberInfoDto getKakaoMemberInfo(String accessToken) {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoMemberInfoRequest = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(
            "https://kapi.kakao.com/v2/user/me",
            HttpMethod.POST,
            kakaoMemberInfoRequest,
            String.class
        );

        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(responseBody);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        Long id = jsonNode.get("id").asLong();
        log.info("getkakaoMemberInfo: " + jsonNode);
        String email = jsonNode.get("kakao_account").get("email").asText();
        return KakaoMemberInfoDto.builder()
            .id(id)
            .email(email)
            .build();
    }

    private Member registerKakaoUserIfNeeded(KakaoMemberInfoDto kakaoMemberInfo, String kakaoRefreshToken) {
        Member member = memberRepository.findByEmailAndDeletedAtIsNull(kakaoMemberInfo.getEmail())
            .orElse(null);

        if (member != null) {
            member.updateKakaoRefreshToken(kakaoRefreshToken);
        } else {
            member = Member.builder()
                    .email(kakaoMemberInfo.getEmail())
                    .memberType(MemberType.ROLE_MEMBER)
                    .socialType(SocialType.KAKAO)
                    .kakaoRefreshToken(kakaoRefreshToken)
                    .articleCreationLimit(8)
                    .build();
        }

        return memberRepository.save(member);
    }

    private void forceLogin(Member kakaoUser, HttpServletResponse response) {
        // response header에 token 추가
        TokenDto token = tokenProvider.generateTokenDto(kakaoUser);
        response.addHeader("Authorization", "Bearer " + token.getAccessToken());
        response.addHeader("RefreshToken", token.getRefreshToken());

        UserDetails userDetails = new UserDetailsImpl(kakaoUser);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, token.getAccessToken(),
            userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    public String getKakaoAccessTokenFromKakaoRefreshToken(String kakaoRefreshToken) {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "refresh_token");
        body.add("client_id", API_KEY);
        body.add("refresh_token", kakaoRefreshToken);

        // HTTP 요청 보내기(access token 획득)
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
            new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
            "https://kauth.kakao.com/oauth/token",
            HttpMethod.POST,
            kakaoTokenRequest,
            String.class
        );

        // HTTP 응답 (JSON) -> 액세스 토큰 파싱
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(responseBody);
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.JSON_PROCESSING_ERROR);
        }

        return jsonNode.get("access_token").asText();
    }

}
