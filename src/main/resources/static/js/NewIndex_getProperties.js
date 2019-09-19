// 执行配置文件相关参数对应的设置
$(function () {

});//end jquery
//######################################功能性函数写在$()之外、js之内,待文档加载完成后被$()#############################
//AJAX加载配置文件（特定情境触发，可能在其他JS调用）
function loadProperties() {
    //执行loadProperties加载属性文件
    $.ajax({
        url: "/getproperties",
        Type: "post",
        data: {},
        dataType: "text",
        success: function (data) {
            // 后台已经是返回json字符串格式的data，放首页#hideproperties的input进行储存,其他地方或js要用到的话JSON.parse()着用
            if (data != null) {
                if (data.trim() != "{}") {
                    // $("#hideproperties").val("");//清空后赋值
                    // $("#hideproperties").val(data);
                    global_properties = data;//使用全局变量储存
                    //是否展示背景图
                    showBodyBackgroundImage(data);
                    //取出其中关于JDBC的属性字符串，填充JDBC区//拿到配置文件字符串
                    var jsonObj = JSON.parse(data);
                    //取出关于jdbc的属性，按照属性文件的设计，此处还是json字符串
                    var basicjdbcString = jsonObj.basicjdbc;
                    fillJDBCtextarea(basicjdbcString);
                    //是否需要存进cookie
                } else {
                    console.log("尝试读取属性文件时，服务器返回配置文件={}。请检查配置文件是否存在或名称是否一致");
                }
            }
        },
        error: function () {
            console.log("尝试读取属性文件时发生错误,请检查服务器连接是否正常");
        }
    });
}

//是否展示背景图片
function showBodyBackgroundImage(JSONString) {
    var jsonObj = JSON.parse(JSONString);
    if (jsonObj.showBodyBackgroundImage == "0") {
        $("body").css("background-image", "url('')");
    }
}

//使用属性文件json字符串，取出其中关于basicjdbc的记录。传参填充JDBC文本区
function fillJDBCtextarea(basicjdbcString) {
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