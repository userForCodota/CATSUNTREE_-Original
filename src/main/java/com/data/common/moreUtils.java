package com.data.common;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 工具合集
 */
public class moreUtils {
    /**
     * @param jsonStr 长得像JSON的字符串，通常由前端JSON对象传回
     * @return
     */
    public static String deleteNewLineSymbol(String jsonStr) {
        if (jsonStr != null) {
            Pattern p = Pattern.compile("\r|\n|\r\n");
            Matcher m = p.matcher(jsonStr);
            jsonStr = m.replaceAll("");
        }
        return jsonStr;
    }

    /**
     * @param tempstr 将字符串去除换行符之后尝试转成json对象
     * @return json对象
     * @throws Exception fastjson尝试转json对象异常
     */
    public static JSONObject dealAjaxJsonToJasonObj(String tempstr) throws Exception {
        JSONObject jbt = null;
        tempstr = deleteNewLineSymbol(tempstr);
        jbt = JSONObject.parseObject(tempstr);
        return jbt;
    }

    public static String unionDatas(int status, String msg, List<Map<String, Object>> list) {
        String listStr = JSON.toJSONString(list);
        Map<String, Object> tempMap = new HashMap<>();
        tempMap.put("status", status + "");
        tempMap.put("msg", msg);
        tempMap.put("list", listStr);//为了方便，key还是用list
        //最后将整个map转成字符串
        String targetStr = JSON.toJSONString(tempMap);
        return targetStr;
    }


    public static String checkIDBCInfo(JSONObject jsonObject) {
        String jdbcInfoException = null;



        return jdbcInfoException;
    }
}
