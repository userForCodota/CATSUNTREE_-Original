// 执行配置文件相关参数对应的设置
$(function () {
//执行loadProperties加载属性文件
    $.ajax({
        url: "/getproperties",
        Type: "post",
        data: {},
        dataType: "text",
        success: function (data) {
            // 后台已经是返回json字符串格式的data，放首页#hideproperties的input进行储存,其他地方或js要用到的话JSON.parse()着用
            if (data != null) {
                if (data.trim() != "") {
                    $("#hideproperties").val("");//清空后赋值
                    $("#hideproperties").val(data);
                    //是否展示背景图
                    showBodyBackgroundImage(data);
                    //填充JDBC区
                    fillJDBCtextarea(data);
                }
            }
        },
        error: function () {
            console.log("尝试读取配置文件时发生错误,请检查服务器连接是否正常");
        }
    });
});//end jquery
//######################################功能性函数写在$()之外、js之内,待文档加载完成后被$()内调用#############################
//是否展示背景图片
function showBodyBackgroundImage(JSONString) {
    var jsonObj = JSON.parse(JSONString);
    if (jsonObj.showBodyBackgroundImage == "0") {
        $("body").css("background-image", "url('')");
    }
}

//填充JDBC文本区
function fillJDBCtextarea(JSONString) {
    //拿到配置文件字符串
    var jsonObj = JSON.parse(JSONString);
    //取出关于jdbc的属性，按照属性文件的设计，此处还是json字符串
    var basicjdbcString = jsonObj.basicjdbc;
    //转成json对象
    var basicjdbcObj = JSON.parse(basicjdbcString);
    //取出对应的值
    var textFiller = "{\n" +
        "\"url\": \"" + basicjdbcObj.url + "\",\n" +
        "\"dbname\": \"" + basicjdbcObj.dbname + "\",\n" +
        "\"parameter\": \"" + basicjdbcObj.parameter + "\",\n" +
        "\"username\": \"" + basicjdbcObj.username + "\",\n" +
        "\"password\": \"" + basicjdbcObj.password + "\",\n" +
        "\"sql\": \"" + basicjdbcObj.sql + "\"\n" +
        "}";
    //填充
    $("#c2 div:nth-child(1)>textarea").val(textFiller);

}