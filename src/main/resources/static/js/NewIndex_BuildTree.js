// 本JS主要用于处理：栏木树的数据请求、数据传输、栏木树的构建等，设计前端树框架
$(function () {
    $("#connDB").click(function () {
        var inputjdbcinfo = $("#c2>div:nth-child(1)>textarea").val();
        var jdbcJsonStringAfterValidate = jdbcJSONvalidation(inputjdbcinfo);
        if (jdbcJsonStringAfterValidate != null) {
            //经验证，此数据可尝试进行服务端数据请求
            queryTreeData(jdbcJsonStringAfterValidate);
        } else {
            //提示信息在jdbcJSONvalidation()里面比较详细了，这里不再累赘。
        }

    });
});//end jQuery
//##############################################################################################################################
//将JDBC-json字符串发送给服务器进行查询
function queryTreeData(jdbcJsonStringAfterValidate) {
    // 启动ajax
    $.ajax({
        url: "/queryTreeData",
        Type: "post",
        data: {
            "jdbcJsonStringAfterValidate": jdbcJsonStringAfterValidate
        },
        dataType: "json",
        success: function (data) {
            console.log(data.status);
        },
        error: function () {
            alert("出错");
        }
    });
}

//前端对于用户输入的jdbc字符串进行校验,验证成功则返回对应的字符串，否则返回null
function jdbcJSONvalidation(inputjdbcinfo) {
    var jdbcJsonStringAfterValidate = null;//初始必须null
    layui.use('layer', function () {
        var layer = layui.layer;
        if (inputjdbcinfo != null && inputjdbcinfo.trim().length > 0) {
            inputjdbcinfo = inputjdbcinfo.replace(/[\n\r]/gi, "");
            inputjdbcinfo = inputjdbcinfo.replace(/[\n]/gi, "");
            inputjdbcinfo = inputjdbcinfo.replace(/[\t]/gi, "");
            try {
                //通过看数据类型初步判断是否是json对象
                var maybeObj = JSON.parse(inputjdbcinfo);//异常出处
                var someNull = false;
                if (typeof (maybeObj) == "object") {
                    var errorMsg = "";
                    if (maybeObj.url == null || maybeObj.url.toString().length <= 0) {
                        someNull = true;
                        errorMsg = "url" + ",";
                    }
                    if (maybeObj.dbname == null || maybeObj.dbname.toString().length <= 0) {
                        someNull = true;
                        errorMsg = errorMsg + "dbname" + ",";
                    }
                    if (maybeObj.username == null || maybeObj.username.toString().length <= 0) {
                        someNull = true;
                        errorMsg = errorMsg + "username" + ",";
                    }
                    if (maybeObj.password == null || maybeObj.password.toString().length <= 0) {
                        someNull = true;
                        errorMsg = errorMsg + "password" + ",";
                    }
                    if (maybeObj.sql == null || maybeObj.sql.toString().length <= 0) {
                        someNull = true;
                        errorMsg = errorMsg + "sql";
                    }
                    //最后看是否符合
                    if (!someNull) {
                        jdbcJsonStringAfterValidate = inputjdbcinfo;
                    } else {
                        layer.msg("必要参数不能为空，请检查" + errorMsg);
                    }
                } else {
                    layer.msg("不能转换成对象类型，请检查");
                }
            } catch (e) {
                layer.msg("非对象类型,请检查“”、[]、{}等符号是否成对出现");
            }
        } else {
            layer.msg("内容为空,请求已停止");
        }
    });
    return jdbcJsonStringAfterValidate;
}