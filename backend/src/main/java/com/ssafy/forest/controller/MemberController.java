package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    //내가 작성한 게시글 목록 조회
    @GetMapping("/articles")
    public ResponseDto<Page<ArticleResDto>> readCreatedList(
        @PageableDefault(size = 10) Pageable pageable,
        HttpServletRequest request) {
        Page<ArticleResDto> createdList = memberService.readCreatedList(pageable, request);
        return ResponseDto.success(createdList);
    }

    //내가 보관한 게시글 목록 조회
//    @GetMapping("/save")
//    public ResponseDto<Page<ArticleResDto>> readSavedList( @PageableDefault(size = 10, sort = "id", direction = Direction.ASC)Pageable pageable, HttpServletRequest request) {
//        return null;
//    }

    //내가 임시저장한 게시글 목록 조회
    @GetMapping("/temp")
    public ResponseDto<Page<ArticleResDto>> readTempList(
        @PageableDefault(size = 10) Pageable pageable,
        HttpServletRequest request) {
        Page<ArticleResDto> tempList = memberService.readTempList(pageable, request);
        return ResponseDto.success(tempList);
    }

}