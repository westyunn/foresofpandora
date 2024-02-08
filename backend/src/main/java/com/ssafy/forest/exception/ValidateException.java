package com.ssafy.forest.exception;

public class ValidateException extends RuntimeException {

    private final String errorMessage;

    public ValidateException(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
