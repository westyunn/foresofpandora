package com.ssafy.forest.service;

import jakarta.servlet.http.HttpServletRequest;

public interface ReactionService {

    //반응 누르기
    void react(Long articleId, HttpServletRequest request);

    //나의 반응 조회
    boolean getMyReaction(Long articleId, HttpServletRequest request);

    // 게시글 반응 개수 조회
    int countReaction(Long articleId);
}
