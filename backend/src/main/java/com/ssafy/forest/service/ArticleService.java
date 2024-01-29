package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import java.util.List;

public interface ArticleService {

    public void create(Long memberId, ArticleReqDto articleReqDto);

    public void createTemp(Long memberId, ArticleReqDto articleReqDto);

    public List<ArticleResDto> readList();

    public ArticleResDto read(Long articleId);

    public void update(Long articleId, ArticleReqDto articleReqDto);

    public void delete(Long articleId);
}
