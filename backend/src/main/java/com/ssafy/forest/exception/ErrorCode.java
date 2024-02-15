package com.ssafy.forest.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    //회원가입
    ALREADY_REGISTERED_EMAIL(HttpStatus.BAD_REQUEST, "이미 등록된 이메일입니다."),
    NOT_FOUND_MEMBER(HttpStatus.BAD_REQUEST, "사용자를 찾을 수 없습니다"),

    //로그인 & 로그아웃
    WRONG_PASSWORD(HttpStatus.BAD_REQUEST, "틀린 비밀번호입니다."),
    BLANK_TOKEN_HEADER(HttpStatus.BAD_REQUEST, "헤더에 토큰이 없습니다."),
    EXPIRED_TOKEN(HttpStatus.BAD_REQUEST, "토큰이 유효하지 않습니다. 다시 로그인해주세요."),
    NOT_EXIST_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "DB에 해당 멤버의 리프레시 토큰이 없습니다."),
    BLACKLIST_ACCESS_TOKEN(HttpStatus.BAD_REQUEST, "블랙리스트에 있는 액세스 토큰입니다."),
    INVALIDATE_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "유효하지 않은 리프레시 토큰입니다."),
    INVALIDATE_ACCESS_TOKEN(HttpStatus.BAD_REQUEST, "유효하지 않은 액세스 토큰입니다."),
    MISMATCH_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "요청받은 리프레시 토큰이 DB의 리프레시 토큰과 일치하지 않습니다."),
    NOT_EXPIRED_ACCESS_TOKEN(HttpStatus.BAD_REQUEST, "아직 만료되지 않은 액세스 토큰입니다."),
    NOT_FOUND_AUTHENTICATION(HttpStatus.BAD_REQUEST, "인증 정보가 없습니다."),
    JSON_PROCESSING_ERROR(HttpStatus.BAD_REQUEST, "JSON 파싱 중 에러가 발생하였습니다."),

    //게시글
    NO_AUTHORITY(HttpStatus.BAD_REQUEST, "해당 요청에 대한 권한이 없습니다."),
    IMAGE_UPLOAD_FAIL(HttpStatus.BAD_REQUEST, "이미지 업로드를 실패했습니다."),
    INVALID_IMAGE_TYPE(HttpStatus.BAD_REQUEST, "유효하지 않은 이미지 타입입니다."),
    IMAGE_UPLOAD_LIMIT_EXCEEDED(HttpStatus.BAD_REQUEST, "최대 첨부 이미지를 초과했습니다."),
    IMAGE_DELETE_FAIL(HttpStatus.BAD_REQUEST, "이미지 삭제를 실패했습니다."),
    INVALID_RESOURCE(HttpStatus.BAD_REQUEST, "유효하지 않은 리소스입니다."),
    ARTICLE_CREATE_LIMIT_EXCEEDED(HttpStatus.BAD_REQUEST, "1일 게시글 작성 횟수를 초과했습니다."),

    //신고
    DUPLICATED_ARTICLE_REPORT(HttpStatus.BAD_REQUEST, "이미 신고한 게시글입니다."),
    DUPLICATED_COMMENT_REPORT(HttpStatus.BAD_REQUEST, "이미 신고한 댓글입니다."),
    DUPLICATED_REPLY_REPORT(HttpStatus.BAD_REQUEST, "이미 신고한 대댓글입니다."),
    VALIDATION_CHECK_FAIL(HttpStatus.BAD_REQUEST, "유효성 검사 실패입니다."),

    // 채팅
    NOT_FOUND_CHATROOM(HttpStatus.BAD_REQUEST, "해당 채팅방을 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String detail;

}