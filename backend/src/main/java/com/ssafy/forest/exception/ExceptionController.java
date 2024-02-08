package com.ssafy.forest.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class ExceptionController {

    @ExceptionHandler({
        CustomException.class
    })
    public ResponseEntity<ExceptionResponse> customRequestException
        (final CustomException c) {
        log.warn("api Exception : {}", c.getErrorCode());
        return ResponseEntity.badRequest().body(new ExceptionResponse(c.getMessage(),
            c.getErrorCode()));
    }

    @ExceptionHandler(ValidateException.class)
    public ResponseEntity<ExceptionResponse> validateRequestException
        (final ValidateException v) {
        log.warn("api Exception : {}", v.getErrorMessage());
        return ResponseEntity.badRequest().body(new ExceptionResponse(v.getErrorMessage(), ErrorCode.VALIDATION_CHECK_FAIL));
    }

    @Getter
    @ToString
    @AllArgsConstructor
    public static class ExceptionResponse {

        private String message;
        private ErrorCode errorCode;

    }

}
