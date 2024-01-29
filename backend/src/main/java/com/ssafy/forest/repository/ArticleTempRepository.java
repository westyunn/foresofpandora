package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.ArticleTemp;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleTempRepository extends JpaRepository<ArticleTemp, Long> {

}
