package com.data.controller;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

@Controller
public class ControllerGetProperties {
    @RequestMapping("/getproperties")
    @ResponseBody
    public String getOutSideProperties() {
        Map<String, Object> propsmap = new HashMap<>();
        String mapstring;
        try {
            Properties props = new Properties();
            FileInputStream fi = new FileInputStream("..\\config\\htmlBasic.properties");
            props.load(fi);
            //将需要的参数放进map集合
            propsmap.put("showBodyBGImg", props.get("showBodyBGImg") == null ? "1" : props.get("showBodyBGImg").toString());//封面图默认给1
            propsmap.put("showtables", props.get("showtables") == null ? "" : props.get("showtables").toString());
        } catch (FileNotFoundException e) {
            //文件找不到异常
            e.printStackTrace();
        } catch (IOException e) {
            //props.load(fileInputStream)异常
            e.printStackTrace();
        }
        //最终转JSON字符串
        mapstring = JSON.toJSONString(propsmap);
        return mapstring;
    }
}
