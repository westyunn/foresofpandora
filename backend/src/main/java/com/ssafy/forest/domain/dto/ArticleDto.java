package com.ssafy.forest.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
@Getter
public class ArticleDto {

    private Long id; //게시글id
    private Long memberId; // member_id
    private String title; //제목
    private String content; //내용

    @Builder
    public ArticleDto(Long id, Long memberId, String title, String content) {
        this.id = id;
        this.memberId = memberId;
        this.title = title;
        this.content = content;
    }

}
