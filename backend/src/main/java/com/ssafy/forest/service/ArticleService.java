package com.ssafy.forest.service;

import com.ssafy.forest.domain.dto.request.ArticleReqDto;
import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.dto.response.ArticleTempResDto;
import com.ssafy.forest.domain.entity.Article;
import com.ssafy.forest.domain.entity.ArticleImage;
import com.ssafy.forest.domain.entity.ArticleTemp;
import com.ssafy.forest.domain.entity.ArticleTempImage;
import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import com.ssafy.forest.repository.ArticleImageRepository;
import com.ssafy.forest.repository.ArticleRepository;
import com.ssafy.forest.repository.ArticleTempImageRepository;
import com.ssafy.forest.repository.ArticleTempRepository;
import com.ssafy.forest.repository.MemberRepository;
import com.ssafy.forest.security.TokenProvider;
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
    private final ArticleTempRepository articleTempRepository;
    private final ArticleImageRepository articleImageRepository;
    private final ReactionService reactionService;
    private final ArticleCommentService articleCommentService;
    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final S3Service s3Service;
    private final ArticleTempImageRepository articleTempImageRepository;

    //게시글 등록
    public ArticleResDto create(ArticleReqDto articleReqDto, List<MultipartFile> images,
        HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        Article article = Article.from(articleReqDto, member);

        if (images != null && images.size() > 5) {
            throw new CustomException(ErrorCode.IMAGE_UPLOAD_LIMIT_EXCEEDED);
        }

        if (images != null && !images.isEmpty()) {
            for (int step = 1; step <= images.size(); step++) {
                ArticleImage image = articleImageRepository.save(ArticleImage.of(article,
                    s3Service.saveFile(images.get(step - 1)),
                    step));
                article.getImages().add(image);
            }
        }

        return ArticleResDto.of(articleRepository.save(article), 0, 0);
    }

    //게시글 목록 조회
    @Transactional(readOnly = true)
    public Page<ArticleResDto> getList(Pageable pageable) {
        Page<Article> articleList = articleRepository.findAllByOrderByCreatedAtAsc(pageable);
        return articleList.map(article -> {
            long commentCount = articleCommentService.getCommentCount(article);
            long reactionCount = reactionService.countReaction(article.getId());
            return ArticleResDto.of(article, commentCount, reactionCount);
        });
    }

    //게시글 단건 조회
    @Transactional(readOnly = true)
    public ArticleResDto read(Long articleId) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));
        long commentCount = articleCommentService.getCommentCount(article);
        long reactionCount = reactionService.countReaction(article.getId());
        return ArticleResDto.of(article, commentCount, reactionCount);
    }

    //게시글 수정
    public ArticleResDto update(Long articleId, ArticleReqDto articleReqDto,
        HttpServletRequest request) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));

        Member member = getMemberFromAccessToken(request);
        if (!member.getId().equals(article.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        article.update(articleReqDto.getContent());

        long commentCount = articleCommentService.getCommentCount(article);
        long reactionCount = reactionService.countReaction(article.getId());

        return ArticleResDto.of(articleRepository.save(article), commentCount, reactionCount);
    }

    //게시글 삭제
    public void delete(Long articleId, HttpServletRequest request) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));

        Member member = getMemberFromAccessToken(request);
        if (!member.getId().equals(article.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        List<ArticleImage> imageList = articleImageRepository.findAllByArticle(article);

        for (ArticleImage image : imageList) {
            s3Service.deleteImage(image.getImageURL());
        }

        articleRepository.deleteById(articleId);
    }

    //게시글 임시저장
    public ArticleTempResDto createTemp(HttpServletRequest request, ArticleReqDto articleReqDto,
        List<MultipartFile> images
    ) {
        Member member = getMemberFromAccessToken(request);

        ArticleTemp createdTemp = articleTempRepository.save(
            ArticleTemp.from(articleReqDto, member));

        if (images != null && images.size() > 5) {
            throw new CustomException(ErrorCode.IMAGE_UPLOAD_LIMIT_EXCEEDED);
        }

        if (images != null && !images.isEmpty()) {
            for (int step = 1; step <= images.size(); step++) {
                ArticleTempImage image = articleTempImageRepository.save(
                    ArticleTempImage.of(createdTemp, s3Service.saveFile(images.get(step - 1)),
                        step));
                createdTemp.getImages().add(image);
            }
        }
        return ArticleTempResDto.from(createdTemp);
    }

    //임시저장 게시글 단건 조회
    @Transactional(readOnly = true)
    public ArticleTempResDto readTemp(Long tempId) {
        ArticleTemp articleTemp = articleTempRepository.findById(tempId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));
        return ArticleTempResDto.from(articleTemp);
    }

    //임시저장 게시글 등록
    public ArticleResDto createTempToNew(Long tempId, ArticleReqDto articleReqDto,
        HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);
        Article created = articleRepository.save(Article.from(articleReqDto, member));
        deleteTemp(tempId, request);

        return ArticleResDto.of(created, 0, 0);
    }

    //임시저장 게시글 수정
    public ArticleTempResDto updateTemp(Long tempId, ArticleReqDto articleReqDto,
        HttpServletRequest request) {
        ArticleTemp articleTemp = articleTempRepository.findById(tempId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));

        Member member = getMemberFromAccessToken(request);
        if (!member.getId().equals(articleTemp.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        articleTemp.update(articleReqDto.getContent());
        ArticleTemp updatedTemp = articleTempRepository.save(articleTemp);
        return ArticleTempResDto.from(updatedTemp);
    }

    //임시저장 게시글 삭제
    public void deleteTemp(Long tempId, HttpServletRequest request) {
        ArticleTemp articleTemp = articleTempRepository.findById(tempId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ARTICLE));

        Member member = getMemberFromAccessToken(request);
        if (!member.getId().equals(articleTemp.getMember().getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        articleTempRepository.deleteById(tempId);
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