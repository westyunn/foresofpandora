package com.ssafy.forest.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class HomeController {

    @GetMapping("auth/index")
    public String index() {
        return "loginForm";
    }

    @GetMapping("auth/success")
    public String success() {
        return "loginSuccess";
    }

}
