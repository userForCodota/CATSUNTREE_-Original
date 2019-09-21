// 本JS主要用于处理：栏木树的数据请求、数据传输.
$(function () {
    $("#connDB").click(function () {
        Submitdisable();//按钮效果
        var inputjdbcinfo = $("#c2>div:nth-child(1)>textarea").val();
        var jdbcJsonStringAfterValidate = jdbcJSONvalidation(inputjdbcinfo);
        if (jdbcJsonStringAfterValidate != null) {
            barshow();
            //经验证，此数据可尝试进行服务端数据请求
            queryTreeData(jdbcJsonStringAfterValidate);//此步骤已将数据存放在全局变量datas
            // 因ajax存在异步性（取消的话影响页面体验/卡死），所以后续操作写在ajax的回调函数，此处不再往下展开。
        } else {
            //null表示校验不通过。提示信息在jdbcJSONvalidation()里面比较详细了，这里不再累赘。
            Submitrestore();//按钮恢复原样
        }

    });
});//end jQuery
//##############################################################################################################################

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
            barFull_I();//进度条拉满
            submitdone();//查询成功专用按钮恢复原样
            //后台使用JSON.toJSONString(map)传回数据，这里ajax直接dataType: "json"接收为json类型
            console.log("[" + CurentTime() + "]\t" + "操作结束。请检查信息：");
            console.log(data);
            //获取成功后将原始数据放进(NewIndex_Global.js中的)全局变量datas里面储存
            datas = data;
            treeBuildAllStart(true, data, null);//尝试种树，在方法内判断是否符合数据要求，此处不再往下延伸。
        },
        error: function () {
            Submitrestore();//按钮恢复原样
            barZero();//进度条归零
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg("[Ajax request error.]可能原因:服务器未启动或业务繁忙");
            });
        }
    });
}


//##############################################################################################################################

//前端对于用户输入的jdbc字符串进行校验,验证成功则返回对应的字符串，否则返回null
function jdbcJSONvalidation(inputjdbcinfo) {
    var jdbcJsonStringAfterValidate = null;//初始必须null
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
                    layui.use('layer', function () {
                        var layer = layui.layer;
                        layer.msg("必要参数不能为空，请检查" + errorMsg);
                    });
                }
            } else {
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.msg("不能转换成对象类型，请检查");
                });
            }
        } catch (e) {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg("非对象类型,请检查“”、[]、{}等符号是否成对出现");
            });
        }
    } else {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.tips('可点击重置按钮使用预设配置', '#resetJDBCtextarea', {
                tips: [4, '#78BA32']
            });
            layer.msg("内容为空,请求已停止");
        });
    }

    return jdbcJsonStringAfterValidate;
}

//##############################################################################################################################