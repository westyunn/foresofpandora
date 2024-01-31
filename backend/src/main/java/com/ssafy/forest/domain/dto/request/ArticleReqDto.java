package com.ssafy.forest.domain.dto.request;

import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.RestController;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArticleReqDto {

    private String content;

}
