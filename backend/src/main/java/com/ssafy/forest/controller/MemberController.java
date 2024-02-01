package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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

@Tag(name = "Member API", description = "마이페이지 관련 API")
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "내가 작성한 게시글 목록 조회", description = "내가 작성한 게시글 목록 페이징 처리해서 조회")
    @GetMapping("/articles")
    public ResponseDto<Page<ArticleResDto>> getList(@PageableDefault(size = 10) Pageable pageable,
        HttpServletRequest request) {
        Page<ArticleResDto> createdList = memberService.getList(pageable, request);
        return ResponseDto.success(createdList);
    }

//    @Operation(summary = "내가 보관한 게시글 목록 조회", description = "내가 보관한 게시글 목록 페이징 처리해서 조회")
//    @GetMapping("/save")
//    public ResponseDto<Page<ArticleResDto>> getSavedList( @PageableDefault(size = 10, sort = "id", direction = Direction.ASC)Pageable pageable, HttpServletRequest request) {
//        return null;
//    }

    @Operation(summary = "내가 임시저장한 게시글 목록 조회", description = "내가 임시저장한 게시글 목록 페이징 처리해서 조회")
    @GetMapping("/temp")
    public ResponseDto<Page<ArticleResDto>> getTempList(
        @PageableDefault(size = 10) Pageable pageable, HttpServletRequest request) {
        Page<ArticleResDto> tempList = memberService.getTempList(pageable, request);
        return ResponseDto.success(tempList);
    }

}