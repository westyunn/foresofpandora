package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.dto.response.ArticleTempResDto;
import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.ArticleImage;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.ArticleImageRepository;
import com.ssafy.forest.repository.ArticleRepository;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.security.TokenProvider;
import com.ssafy.forest.util.BackgroundImageUtil;
import jakarta.persistence.Tuple;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleImageRepository articleImageRepository;
    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final S3Service s3Service;

    //게시글 등록
    public ArticleResDto create(ArticleReqDto articleReqDto, List<MultipartFile> images,
        HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        if (member.getArticleCreationLimit() <= 0) {
            throw new CustomException(ErrorCode.ARTICLE_CREATE_LIMIT_EXCEEDED);
        }

        Article article = Article.from(articleReqDto, member, true);

        if (images != null && images.size() > 5) {
            throw new CustomException(ErrorCode.IMAGE_UPLOAD_LIMIT_EXCEEDED);
        }

        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                if (!image.getContentType().startsWith("image/")) {
                    throw new CustomException(ErrorCode.INVALID_IMAGE_TYPE);
                }
            }

            for (int step = 1; step <= images.size(); step++) {
                ArticleImage image = articleImageRepository.save(ArticleImage.of(article,
                    s3Service.saveFile(images.get(step - 1)),
                    step));
                article.getImages().add(image);
            }
        } else {
            ArticleImage image = articleImageRepository.save(ArticleImage.of(article,
                s3Service.getFileUrl("background/" + BackgroundImageUtil.pickNumber()) + ".jpg",
                1));
            article.getImages().add(image);
        }

        member.minusArticleCreationLimit(member.getArticleCreationLimit());
        memberRepository.save(member);

        return ArticleResDto.of(articleRepository.save(article), 0, 0);
    }

    //게시글 목록 조회
    @Transactional(readOnly = true)
    public Page<ArticleResDto> getList(Pageable pageable) {
        Page<Object[]> articles = articleRepository.findAllWithReactionCountAndCommentCount(
            pageable);
        return articles.map(art -> {
            Article article = (Article) art[0];
            Long reactionCount = (Long) art[1];
            Long commentCount = (Long) art[2];
            return ArticleResDto.of(article, commentCount, reactionCount);
        });
    }

    //게시글 단건 조회
    @Transactional(readOnly = true)
    public ArticleResDto read(Long articleId) {
        Tuple article = articleRepository.findArticleWithReactionCountAndCommentCount(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));
        Article art = article.get(0, Article.class);
        Long reactionCount = article.get(1, Long.class);
        Long commentCount = article.get(2, Long.class);
        return ArticleResDto.of(art, commentCount, reactionCount);
    }

    //게시글 수정
    public ArticleResDto update(Long articleId, ArticleReqDto articleReqDto,
        HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        Tuple article = articleRepository.findArticleWithReactionCountAndCommentCount(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));
        Article art = article.get(0, Article.class);
        Long reactionCount = article.get(1, Long.class);
        Long commentCount = article.get(2, Long.class);
        if (!member.getId().equals(art.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }
        art.updateContent(articleReqDto.getContent());
        return ArticleResDto.of(art, commentCount, reactionCount);
    }

    //게시글 삭제
    public void delete(Long articleId, HttpServletRequest request) {
        Article article = articleRepository.findByIdAndIsArticleIsTrueAndDeletedAtIsNull(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));
        Member member = getMemberFromAccessToken(request);
        if (!member.getId().equals(article.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }
        articleRepository.deleteById(articleId);
    }

    //게시글 임시저장
    public ArticleTempResDto createTemp(HttpServletRequest request, ArticleReqDto articleReqDto,
        List<MultipartFile> images
    ) {
        Member member = getMemberFromAccessToken(request);
        if (member.getArticleCreationLimit() <= 0) {
            throw new CustomException(ErrorCode.ARTICLE_CREATE_LIMIT_EXCEEDED);
        }

        Article tempArticle = articleRepository.save(
            Article.from(articleReqDto, member, false));

        if (images != null && images.size() > 5) {
            throw new CustomException(ErrorCode.IMAGE_UPLOAD_LIMIT_EXCEEDED);
        }

        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                if (!image.getContentType().startsWith("image/")) {
                    throw new CustomException(ErrorCode.INVALID_IMAGE_TYPE);
                }
            }
            for (int step = 1; step <= images.size(); step++) {
                ArticleImage image = articleImageRepository.save(
                    ArticleImage.of(tempArticle, s3Service.saveFile(images.get(step - 1)),
                        step));
                tempArticle.getImages().add(image);
            }
        } else {
            ArticleImage image = articleImageRepository.save(ArticleImage.of(tempArticle,
                s3Service.getFileUrl("background/" + BackgroundImageUtil.pickNumber()) + ".jpg",
                1));
            tempArticle.getImages().add(image);
        }

        member.minusArticleCreationLimit(member.getArticleCreationLimit());
        memberRepository.save(member);

        return ArticleTempResDto.from(tempArticle);
    }

    //임시저장 게시글 단건 조회
    @Transactional(readOnly = true)
    public ArticleTempResDto readTemp(HttpServletRequest request, Long tempId) {
        Member member = getMemberFromAccessToken(request);
        Article articleTemp = articleRepository.findByIdAndMemberAndIsArticleIsFalseAndDeletedAtIsNull(
                tempId, member)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));
        return ArticleTempResDto.from(articleTemp);
    }

    //임시저장 게시글 등록
    public ArticleResDto createTempToNew(HttpServletRequest request, Long tempId,
        ArticleReqDto articleReqDto) {
        Member member = getMemberFromAccessToken(request);

        Article articleTemp = articleRepository.findByIdAndMemberAndIsArticleIsFalseAndDeletedAtIsNull(
                tempId, member)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));
        articleTemp.updateIsArticle();
        articleTemp.updateContent(articleReqDto.getContent());

        articleTemp.updateTimeStamp();

        return ArticleResDto.of(articleTemp, 0, 0);
    }

    //임시저장 게시글 수정
    public ArticleTempResDto updateTemp(Long tempId, ArticleReqDto articleReqDto,
        HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        Article articleTemp = articleRepository.findByIdAndMemberAndIsArticleIsFalseAndDeletedAtIsNull(
                tempId, member)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));
        articleTemp.updateContent(articleReqDto.getContent());
        return ArticleTempResDto.from(articleRepository.save(articleTemp));
    }

    //임시저장 게시글 삭제
    public void deleteTemp(Long tempId, HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        articleRepository.findByIdAndMemberAndIsArticleIsFalseAndDeletedAtIsNull(tempId, member)
            .orElseThrow(() -> new CustomException(ErrorCode.INVALID_RESOURCE));
        articleRepository.deleteById(tempId);
    }

    //유저 정보 추출
    public Member getMemberFromAccessToken(HttpServletRequest request) {
        // accessToken으로부터 Member 객체 추출
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);
        // memberFromAccessToken의 id로 최신 상태의 Member 객체 조회
        return memberRepository.findById(memberFromAccessToken.getId())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

}