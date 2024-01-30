package com.ssafy.forest.controller;

import com.ssafy.forest.domain.dto.response.ArticleResDto;
import com.ssafy.forest.domain.dto.response.ResponseDto;
import com.ssafy.forest.service.MemberService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
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

    //내가 작성한 게시글 목록 조회
    @GetMapping("/create")
    public ResponseDto<List<ArticleResDto>> readCreatedList(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size, HttpServletRequest request) {
        List<ArticleResDto> createdList = memberService.readCreatedList(page, size, request);
        return ResponseDto.success(createdList);
    }

    //내가 보관한 게시글 목록 조회
//    @GetMapping("/save")
//    public ResponseDto<List<ArticleResDto>> readSavedList(@RequestParam(defaultValue = "0") int page,
//        @RequestParam(defaultValue = "10") int size, HttpServletRequest request) {
//        return null;
//    }

    //내가 임시저장한 게시글 목록 조회
    @GetMapping("/temp")
    public ResponseDto<List<ArticleResDto>> readTempList(@RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size, HttpServletRequest request) {
        List<ArticleResDto> tempList = memberService.readTempList(page, size, request);
        return ResponseDto.success(tempList);
    }

}