package com.data.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ControllerGoPages {

    @RequestMapping("/go")
    public String goIndex() {
        return "NewIndex";
    }

    @RequestMapping("/iframeForShowAllTables")
    public String goDbinfo() {
        return "iframeForShowAllTables";
    }

    @RequestMapping("/iframeForChangeNodeName")
    public String goiframeForChangeNodeName() {
        return "iframeForChangeNodeName";
    }

    @RequestMapping("/iframeForChooseSetting")
    public String goiframeForChooseSetting() {
        return "iframeForChooseSetting";
    }

}
