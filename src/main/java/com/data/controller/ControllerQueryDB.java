package com.data.controller;

import com.alibaba.fastjson.JSONObject;
import com.data.common.JDBCUtils;
import com.data.common.moreUtils;
import com.data.entity.JDBCInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

@Controller
public class ControllerQueryDB {

    @RequestMapping("/queryDB")
    @ResponseBody
    public String queryDB(String jdbcjson) {
//        JDBCInfo jdbcInfo = null;
//        String finalDatas = null;//需要moreUtils.unionDatas()方法处理，向前端传3个参数
//        JSONObject jsonObject = null;//按照JSON格式处理之后得到的JSON对象，以是否为空判断处理成功与否
//        Connection conn = null;
//        //步骤一：尝试解析前端传递回来的JSON数据的格式，转成java对象
//        try {
//            jsonObject = moreUtils.dealAjaxJsonToJasonObj(jdbcjson);
//        } catch (Exception e) {
//            //e.printStackTrace();
//            String msg = "尝试解析json时发生错误，请检查";
//            System.out.println(msg);
//            finalDatas = moreUtils.unionDatas(-1, msg, null);
//            return finalDatas;
//        }
//        //步骤二：如果JSON没问题，判断传递的JDBC信息是否齐全、是否能正确获取connection
//        if (jsonObject != null) {
//            jdbcInfo = JDBCUtils.dealJSONtoJDBCInfo(jsonObject);
//            try {
//                conn = JDBCUtils.getConnection(jdbcInfo);
//            } catch (Exception e) {
//                //e.printStackTrace();
//                String msg = "尝试获取connection时发生错误" + "\t" + (jdbcInfo.getIsElementNull() == true ? "存在元素为空\t" + jdbcInfo.getNullElements() : "");
//                System.out.println("JSON格式正确，但是" + msg);
//                finalDatas = moreUtils.unionDatas(0, msg, null);
//                return finalDatas;
//            }
//        } else {
//            //一般经过上面的步骤之后进不到这里
//            System.out.println("发生了不可预估的错误" + "\t20190908191109");
//        }
//        //步骤三：数据库连接正确的情况下，查询数据库
//        if (conn != null) {
//            Map<String, Object> listWithMsg = JDBCUtils.queryForListPro(jdbcInfo, conn);//map里面存了mapList和columncount
//            int columncount = (int) listWithMsg.get("columncount");
//            //根据列数判断是否可以构建栏目树
//            if (columncount >= 3) {
//                finalDatas = moreUtils.unionDatas(1, "queryDone", (List<Map<String, Object>>) listWithMsg.get("mapList"));
//            } else {
//                finalDatas = moreUtils.unionDatas(2, "queryDoneButUnsatisfy", null);
//            }
//
//            return finalDatas;
//        } else {
//            System.out.println("发生了不可预估的错误" + "\t20190908191120");
//        }
//
//        return finalDatas;//finnal
        return null;
    }


}
