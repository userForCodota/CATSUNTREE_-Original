$(function () {
    // 加载form模块
    var form;
    layui.use('form', function () {
        form = layui.form;
    });
    $("#btn01").click(function () {
        var jdbcplaceholder = "\n" +
            "格式说明：\n" +
            "{\n" +
            "\t\"url\": \"jdbc:mysql://localhost:3306/\",\n" +
            "\t\"dbname\": \"gzszf?serverTimezone=UTC\",\n" +
            "\t\"username\": \"root\",\n" +
            "\t\"password\": \"root\",\n" +
            "\t\"sql\": \"select * from channel\"\n" +
            "}\n" +
            "※ 可以点击左侧按钮\n" +
            "※ 或者直接访问http://www.bejson.com/进行JSON格式化校验\n" +
            "※ 可以给完整url添加参数，例如：\n" +
            "※ \"dbname\": \"gzszf?serverTimezone=UTC\"\n";
        var jdbcexample = "{\n" +
            "\"url\": \"jdbc:mysql://localhost:3306/\",\n" +
            "\"dbname\": \"dororo?serverTimezone=UTC\",\n" +
            "\"username\": \"root\",\n" +
            "\"password\": \"root\",\n" +
            "\"sql\": \"select * from channel\"\n" +
            "}";
        // $('#bgPic').fadeOut(500);//背景图是否隐藏
        $('#btn01').fadeOut(500);
        $('.panel01').fadeIn();
        $('#showPanel02').show();
        $('#showPanel02').css("opacity", "0.15");
        $("#JDBC_Info textarea").attr("placeholder", jdbcplaceholder);
        $("#JDBC_Info textarea").html(jdbcexample);
        $('#JDBC_Info').fadeIn(800);

    });
});