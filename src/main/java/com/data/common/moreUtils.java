package com.data.common;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;
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
     * 本方法用于处理前端传回的JSON是多行字符串的时候，将换行符替换掉。
     *
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
        tempstr = deleteNewLineSymbol(tempstr);
        JSONObject jbt = JSONObject.parseObject(tempstr);
        return jbt;
    }

    /**
     * 本方法用于将ztree需要用到的状态码、反馈信息、栏目列表数据等对象都合并成一个map对象，最终转成json字符串
     *
     * @param status 状态码
     * @param msg    反馈信息
     * @param list   栏目列表数据
     * @return json字符串
     */
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

    /**
     * @param status      状态码
     * @param msg         信息
     * @param list        表数据（不带表头）
     * @param columnnames 表头
     * @return json字符串
     */
    public static String unionDatasPro(int status, String msg, List<Map<String, Object>> list, List<String> columnnames, int columncount, String tablename) {
        Map<String, Object> tempMap = new HashMap<>();
        String listStr = JSON.toJSONString(list);
        String columnnamesString = JSON.toJSONString(columnnames);
        tempMap.put("status", status + "");
        tempMap.put("msg", msg);
        tempMap.put("columncount", columncount + "");//列数
        tempMap.put("columnnames", columnnamesString);//表头信息
        tempMap.put("list", listStr);//为了方便，表数据的key还是用list
        tempMap.put("tablename", tablename);//表名
        //最后将整个map转成字符串
        String targetStr = JSON.toJSONString(tempMap);
        return targetStr;
    }

    /**
     * 此方法只是在普通的System.out.println()方法基础上加上了系统时间
     *
     * @param soutMsg 需要打印的信息
     */
    public static void soutPro(String soutMsg) {
        System.out.println("[" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()) + "]" + "\t" + soutMsg);//合起来写
    }
}
