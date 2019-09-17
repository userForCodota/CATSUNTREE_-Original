package com.data.controller;

import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Controller
public class ControllerGoPages {

    @RequestMapping("/go")
    public String goIndex() {
        return "NewIndex";
    }

    @RequestMapping("/dbinfo")
    public String goDbinfo() {
        return "DBinfo";
    }

}
