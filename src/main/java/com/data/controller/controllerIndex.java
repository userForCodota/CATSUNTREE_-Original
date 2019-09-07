package com.data.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class controllerIndex {

    @RequestMapping("/go")
    public String goIndex() {
        return "index";
    }
}
