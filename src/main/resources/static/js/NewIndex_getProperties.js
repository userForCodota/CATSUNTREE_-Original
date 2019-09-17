// 执行配置文件相关参数对应的设置
$(function () {
    $.ajax({
        url: "/getproperties",
        Type: "post",
        data: {},
        dataType: "json",
        success: function (data) {
            // 返回的data就是整个配置文件的信息，当.properties文件中添加了新参数时需在后台手动添加
            //（1-1）是否展示背景图片1/0
            if (data.showBodyBGImg == "0") {
                $("body").css("background-image", "url()")
            }
            //(1-2)将用户配置文件中的JDBC连接参数填充到页面
            if (data.showtables.length > 0) {
                var showtables = JSON.parse(data.showtables);
                console.log(showtables.url);
                var jdbcexample = "{\n" +
                    "\"url\": \"" + showtables.url + "\",\n" +
                    "\"username\": \"" + showtables.username + "\",\n" +
                    "\"password\": \"" + showtables.password + "\",\n" +
                    "\"sql\": \"" + showtables.sql + "\"\n" +
                    "}";
                $("#c2 textarea").val(jdbcexample);
            }
        },
        error: function () {
            console.log("尝试读取配置文件时发生错误");
        }
    });
    //根据配置文件的信息获取
});