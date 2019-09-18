package com.data.controller;

import com.alibaba.fastjson.JSON;
import com.data.common.moreUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

@Controller
public class ControllerGetProperties {

    /**
     * @return 指定的外部属性文件中所有属性值封装的map对象后转成的json字符串
     */
    @RequestMapping("/getproperties")
    @ResponseBody
    public String getOutSideProperties() {
        Map<String, Object> propsmap = new HashMap<>();//装载配属性K-V
        String mapstring;//map最终转成JSON字符串
        //开始读取属性文件
        Properties props = new Properties();
        FileInputStream fi;
        try {
            fi = new FileInputStream("..\\config\\tree.properties");//加载的是外部属性文件
            props.load(fi);
            //迭代
            Iterator<Map.Entry<Object, Object>> it = props.entrySet().iterator();
            while (it.hasNext()) {
                Map.Entry<Object, Object> entry = it.next();//每个entry包含一组K-V
                Object key = entry.getKey();
                Object value = entry.getValue();
                //将本组K-V存进容器
                if (key != null) {
                    propsmap.put(key.toString(), value == null ? "" : value.toString());
                    moreUtils.soutPro("已读取属性值key=" + key + "\tvalue=" + value);
                }
            }
        } catch (FileNotFoundException e) {
            moreUtils.soutPro("找不到属性文件。" + e.getMessage());
            //e.printStackTrace();
        } catch (IOException e) {
            //e.printStackTrace();
            moreUtils.soutPro("加载属性文件时发生错误。" + e.getMessage());
        }
        //最终利用fastjson将map对象转JSON字符串
        mapstring = JSON.toJSONString(propsmap);
        return mapstring;
    }
}