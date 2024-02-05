package com.ssafy.forest.repository;

import com.ssafy.forest.domain.entity.ArticleTemp;
import com.ssafy.forest.domain.entity.ArticleTempImage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleTempImageRepository extends JpaRepository<ArticleTempImage, Long> {

    List<ArticleTempImage> findAllByArticleTemp(ArticleTemp articleTemp);

}
