package com.data.service;


import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.data.common.JDBCUtils;
import com.data.common.moreUtils;
import com.data.entity.JDBCInfo;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.SQLSyntaxErrorException;
import java.util.List;
import java.util.Map;

/**
 * 本类用于处理请求栏木树数据的业务处理。
 */
public class serviceAskTreeData {
    private static StringBuffer sb;

    /**
     * 本方法是处理请求栏木树数据的业务要求的主启动方法，通过前端的json字符串，处理所有的信息后，整合状态码、信息、数据data返回
     *
     * @param jdbcJsonStringAfterValidate 前端传递来的jdbc信息，理论上是满足json字符串格式的。
     * @return 合并后的信息
     * 状态码：-1：json字符串无法解析；0：解析成功但是用于获取connection时失败；1：成功获取数据
     */
    public String dealTreedataRequest(String jdbcJsonStringAfterValidate) {
        sb = new StringBuffer();//用于拼接异常信息
        try {
            //首先尝试解析是否能转成JSON对象,可能有异常在catch处捕获
            JSONObject jsonObject = JSONObject.parseObject(jdbcJsonStringAfterValidate);
            if (jsonObject != null) {
                moreUtils.soutPro("已获取数据库连接.\n");
                //将json对象优化处理为实体类,并记录信息
                JDBCInfo jdbcInfo = serviceAskTreeData.JSONObjToJDBCInfoEntity(jsonObject, sb);
                //使用jdbc信息获取数据库连接
                Connection connection = JDBCUtils.getConnection(jdbcInfo, sb);
                if (connection != null) {
                    try {
                        //正确获取数据库数据的情况下
                        Map<String, Object> tabledatas = JDBCUtils.queryPro(jdbcInfo, connection);
                        List<Map<String, Object>> list = (List<Map<String, Object>>) tabledatas.get("list");
                        List<String> columnnames = (List<String>) tabledatas.get("columnnames");
                        int columncount = Integer.parseInt(tabledatas.get("columncount").toString());
                        String tablename = tabledatas.get("tablename").toString();
                        //最终正确的数据
                        return moreUtils.unionDatasPro(1, sb.append("查询成功").toString(), list, columnnames, columncount, tablename);
                    } catch (SQLSyntaxErrorException e) {
                        sb.append(e.getMessage());
                        moreUtils.soutPro("执行sql查询时发生错误：" + e.getMessage());
                        return moreUtils.unionDatas(0, sb.toString(), null);
                    } catch (SQLException e) {
                        //conn正确但是异常，说明是sql的问题
                        sb.append(e.getMessage());
                        moreUtils.soutPro("执行sql查询时发生错误：" + e.getMessage());
                        return moreUtils.unionDatas(0, sb.toString(), null);
                    } catch (Exception e) {
                        sb.append(e.getMessage());
                        moreUtils.soutPro("执行sql查询时发生错误：" + e.getMessage());
                        return moreUtils.unionDatas(0, sb.toString(), null);
                    }
                } else {
                    return moreUtils.unionDatas(0, sb.toString(), null);
                }
            }
        } catch (JSONException e) {
            //JSONException是fastjson对应的异常，已导包
            sb.append("尝试转换JSON对象时异常。信息:" + e.getMessage());
            return moreUtils.unionDatas(-1, sb.toString(), null);
        }
        return moreUtils.unionDatas(-9999, sb.toString(), null);
    }


    /**
     * @return 将json对象优化处理成JDBCInfo实体类，并记录信息
     */
    public static JDBCInfo JSONObjToJDBCInfoEntity(JSONObject jsonObject, StringBuffer sb) {
        JDBCInfo jo = new JDBCInfo();
        String url = jsonObject.getString("url");
        String dbname = jsonObject.getString("dbname");
        String parameter = jsonObject.getString("parameter");
        String username = jsonObject.getString("username");
        String password = jsonObject.getString("password");
        String sql = jsonObject.getString("sql");
        if (url == null || url.equals("")) {
            sb.append("key=" + "url" + "不存在或对应value为空|");
        } else {
            jo.setUrl(url);
        }
        if (dbname == null || dbname.equals("")) {
            sb.append("key=" + "dbname" + "不存在或对应value为空|");
        } else {
            jo.setDbname(dbname);
        }
        //parameter可以为空串
        if (parameter == null || parameter.equals("")) {
            jo.setParameter("");
        } else {
            jo.setParameter(parameter);
        }
        if (username == null || username.equals("")) {
            sb.append("key=" + "username" + "不存在或对应value为空|");
        } else {
            jo.setUsername(username);
        }
        if (password == null || password.equals("")) {
            sb.append("key=" + "password" + "不存在或对应value为空|");
        } else {
            jo.setPassword(password);
        }
        if (sql == null || sql.equals("")) {
            sb.append("key=" + "sql" + "不存在或对应value为空|");
        } else {
            jo.setSql(sql);
        }
        return jo;
    }
}
