package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.entity.Member;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

public interface ArticleService {

    public ArticleResDto create(ArticleReqDto articleReqDto, Member member);

    public ArticleResDto createTemp(ArticleReqDto articleReqDto, Member member);

    public List<ArticleResDto> readList();

    public ArticleResDto read(Long articleId);

    public ArticleResDto update(Long articleId, ArticleReqDto articleReqDto);

    public void delete(Long articleId);
}
