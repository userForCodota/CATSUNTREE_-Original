package com.data.common;

import com.alibaba.fastjson.JSONObject;
import com.data.entity.JDBCInfo;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 与JDBC（直接）相关的方法
 */
public class JDBCUtils {

    /**
     * @param jdbcInfo JDBC信息实体类
     * @param conn     数据库连接
     *                 todo：将查询的结果集，列数，其他信息等一同返回
     */
    public static Map<String, Object> queryForListPro(JDBCInfo jdbcInfo, Connection conn) {
        Map<String, Object> finalMsg = new HashMap<>();
        List<Map<String, Object>> mapList = new ArrayList<>();//查询结果
        int fieldNum = 0;//查询结果的列数
        ResultSetMetaData resultsetmetadata = null;//包含表头信息的“结果集数据源”
        PreparedStatement psmt = null;
        ResultSet resultSet = null;
        try {
            psmt = conn.prepareStatement(jdbcInfo.getSql());
            psmt.setQueryTimeout(600);
            resultSet = psmt.executeQuery();//只允许执行查询
            resultsetmetadata = resultSet.getMetaData();
            fieldNum = resultsetmetadata.getColumnCount();//存列数
            //当结果集存在下一行的时候next()，将每一列的值读出来存进map，map存进list
            while (resultSet.next()) {
                Map<String, Object> tempMap = new HashMap<>(fieldNum);//按照列数来给HashMap设置初始长度
                //这里注意i从i=1开始
                for (int i = 1; i <= fieldNum; i++) {
                    //列名存key，列值存value
/*
                    if (resultSet == null) {
                        tempMap.put(resultsetmetadata.getColumnLabel(i), "null");
                    } else {
                        tempMap.put(resultsetmetadata.getColumnLabel(i), resultSet.getObject(i));
                    }
*/
                    tempMap.put(resultsetmetadata.getColumnLabel(i), resultSet.getObject(i));
                }
                //把得到的一列（即map）存进list
                mapList.add(tempMap);
            }
            //整理一下需要传递的数据
            finalMsg.put("mapList", mapList);//查询结果
            finalMsg.put("columncount", fieldNum);
            return finalMsg;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn, psmt, resultSet);
        }
        return finalMsg;
    }

    /**
     * todo:通过JDBC信息获取相关的链接
     */
    public static Connection getConnection(JDBCInfo jio) {
        Connection conn = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(jio.getUrl(), jio.getUsername(), jio.getPassword());
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }

    /**
     * todo:将前端传递的JSON数据封装成java的JDBC实体类
     *
     * @param jsonObject 处理后的jsonobject
     */
    public static JDBCInfo dealJSONtoJDBCInfo(JSONObject jsonObject) {
        JDBCInfo jdbcinfo = new JDBCInfo();
        String url = jsonObject.getString("url").trim();
        String dbname = jsonObject.getString("dbname").trim();
        String username = jsonObject.getString("username").trim();
        String password = jsonObject.getString("password").trim();
        String sql = jsonObject.getString("sql").trim();
        if (dbname.equals("")) {
            jdbcinfo.setElementNull(true);
            jdbcinfo.setNullElements(jdbcinfo.getNullElements() + "|" + "dbname为空");
        } else {
            jdbcinfo.setDbname(jsonObject.getString("dbname"));
        }
        //url要把dbname带上
        if (url.equals("")) {
            jdbcinfo.setElementNull(true);
            jdbcinfo.setNullElements(jdbcinfo.getNullElements() + "|" + "url为空");
        } else {
            jdbcinfo.setUrl(jsonObject.getString("url") + jsonObject.getString("dbname"));
        }
        if (username.equals("")) {
            jdbcinfo.setElementNull(true);
            jdbcinfo.setNullElements(jdbcinfo.getNullElements() + "|" + "username为空");
        } else {
            jdbcinfo.setUsername(jsonObject.getString("username"));
        }
        if (password.equals("")) {
            jdbcinfo.setElementNull(true);
            jdbcinfo.setNullElements(jdbcinfo.getNullElements() + "|" + "password为空");
        } else {
            jdbcinfo.setPassword(jsonObject.getString("password"));
        }
        if (sql.equals("")) {
            jdbcinfo.setElementNull(true);
            jdbcinfo.setNullElements(jdbcinfo.getNullElements() + "|" + "sql为空");
        } else {
            jdbcinfo.setSql(jsonObject.getString("sql"));
        }
        return jdbcinfo;
    }


    public static void closeConnection(Connection conn, PreparedStatement psmt, ResultSet rs) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        conn = null;
        if (psmt != null) {
            try {
                psmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        psmt = null;
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        rs = null;
    }

}
