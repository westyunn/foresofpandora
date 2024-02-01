package com.ssafy.forest.service;

import jakarta.servlet.http.HttpServletRequest;

public interface StorageService {

    //나의 게시글 보관여부 조회
    boolean myStore(Long articleId, HttpServletRequest request);

    //보관 누르기
    boolean store(Long articleId, HttpServletRequest request);

}
