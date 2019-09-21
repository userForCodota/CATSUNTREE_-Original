package com.data.common;

import com.alibaba.fastjson.JSONObject;
import com.data.entity.JDBCInfo;
import com.mysql.cj.jdbc.exceptions.CommunicationsException;

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
     *                 todo：将查询的结果集，列数，列头数组，其他信息等一同返回
     */
    public static Map<String, Object> queryPro(JDBCInfo jdbcInfo, Connection conn) throws SQLException {
        Map<String, Object> finalMsg = new HashMap<>();//记录所有的最终信息
        List<Map<String, Object>> mapList = new ArrayList<>();//记录查询结果（不含表头）
        List<String> columnNames = new ArrayList<>();//记录表头
        int fieldNum;//记录查询结果的列数
        //业务处理
        ResultSetMetaData resultsetmetadata;//包含表头信息的“结果集数据源”
        PreparedStatement psmt = null;
        ResultSet resultset = null;
        try {
            psmt = conn.prepareStatement(jdbcInfo.getSql());
            psmt.setQueryTimeout(600);
            resultset = psmt.executeQuery();//只允许执行查询，可以避免用户输入“drop database.....”等
            resultsetmetadata = resultset.getMetaData();//拿到源数据（(/表头信息)
            fieldNum = resultsetmetadata.getColumnCount();//存列数
            String tableName = resultsetmetadata.getTableName(1);//获取表名称
            //（1）处理表头信息，记录列名
            for (int j = 1; j <= fieldNum; j++) {
                columnNames.add(resultsetmetadata.getColumnLabel(j));
            }
            //（2）处理数据。当结果集存在下一行的时候next()，将每一列的值读出来存进map，map存进list
            while (resultset.next()) {
                Map<String, Object> tempMap = new HashMap<>(fieldNum);//按照列数来给HashMap设置初始长度
                //这里注意i从i=1开始
                for (int i = 1; i <= fieldNum; i++) {
                    tempMap.put(resultsetmetadata.getColumnLabel(i), resultset.getObject(i));
                }
                //把得到的一列（即map）存进list
                mapList.add(tempMap);
            }

            //整理一下需要传递的数据
            finalMsg.put("list", mapList);//查询结果
            finalMsg.put("columnnames", columnNames);
            finalMsg.put("columncount", fieldNum);//列数
            finalMsg.put("tablename", tableName);//表名
            return finalMsg;
        } finally {
            closeConnection(conn, psmt, resultset);
        }
    }

    /**
     * todo:通过JDBCInfo获取相关的链接
     */
    public static Connection getConnection(JDBCInfo jio) {
        Connection conn = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(jio.getUrl() + jio.getDbname() + jio.getParameter(), jio.getUsername(), jio.getPassword());
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }

    /**
     * 带stringbuffer记录数据的getconnection方法
     *
     * @param jio 记录JDBC数据的实体类
     * @param sb  记录异常信息
     * @return 连接
     */
    public static Connection getConnection(JDBCInfo jio, StringBuffer sb) {
        Connection conn = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(jio.getUrl() + jio.getDbname() + jio.getParameter(), jio.getUsername(), jio.getPassword());
        } catch (CommunicationsException e) {
//            e.printStackTrace();
            sb.append(e.getMessage().replaceAll("\n", "|"));
            moreUtils.soutPro("getConnection()获取连接时发生错误，错误信息：" + sb.toString());
            sb.append(e.getMessage());
        } catch (Exception e) {
//            e.printStackTrace();
            sb.append(e.getMessage().replaceAll("\n", "|"));
            moreUtils.soutPro("尝试获取数据库连接时发生错误，信息：" + sb.toString());
            sb.append(e.getMessage());
        }
        return conn;
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
