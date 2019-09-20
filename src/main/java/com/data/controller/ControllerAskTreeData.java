package com.data.controller;

import com.data.service.serviceAskTreeData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * 本方法用于处理前端对于栏目表的数据库查询请求。
 * 返回值包含：状态码、提示信息、treeData字符串。
 */
@Controller
public class ControllerAskTreeData {

    @RequestMapping("/queryTreeData")
    @ResponseBody
    public String queryTreeData(String jdbcJsonStringAfterValidate) {
        serviceAskTreeData sa = new serviceAskTreeData();
        String DataWithMessage = sa.dealTreedataRequest(jdbcJsonStringAfterValidate);
        return DataWithMessage;
    }
}
