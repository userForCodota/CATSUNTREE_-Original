package com.data;

import com.alibaba.fastjson.JSONObject;
import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class JsonTests {

    @Test
    public void doa() {
        String a = "{\n" +
                "\t\"url\": \"jdbc:mysql://localhost:3306\",\n" +
                "\t\"dbname\": \"gzszf\",\n" +
                "\t\"username\": \"root\",\n" +
                "\t\"password\": \"root\",\n" +
                "\t\"sql\": \"select * from channel\"";
        JSONObject jsonObject = null;
        try {
            jsonObject = JSONObject.parseObject(a);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(jsonObject.get("url"));
    }
}
