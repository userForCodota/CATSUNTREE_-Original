var currentJDBCinfo;
var afterChoseDB;
var finalSend;//最终传值
$(function () {
    //展示
    $("#startall").click(function () {
        $("#startall").css("display", "none");
        $("#conaDA").show();
        $("#conaDA>div:nth-child(1)").show();
        $("#conaDA>div:nth-child(2)").show();
        $("#conaDA>div:nth-child(3)").show();
        /*        layui.use('layer', function () {
                    layer.tips('预设信息可直接选取', '#posia', {
                        tips: 3,
                        tipsMore: true
                    });
                });*/
        layui.use('layer', function () {
            layer.tips('或参考示例', '#resetservicename', {
                tips: 3,
                tipsMore: true
            });
        });
    });
    //测试阶段
    // $("#settings").val("[{\"servicename\":\"219\",\"url\":\"jdbc:mysql://139.129.67.219:3306/\",\"dbname\":\"mysql\",\"parameter\":\"?serverTimezone=UTC\",\"username\":\"zhsdevelop\",\"password\":\"southnet\",\"sql\":\"SHOW DATABASES\"},{\"servicename\":\"157\",\"url\":\"jdbc:mysql://192.168.43.157:3306/\",\"dbname\":\"mysql\",\"parameter\":\"?serverTimezone=UTC\",\"username\":\"root\",\"password\":\"Nfw123456a?\",\"sql\":\"SHOW DATABASES\"}]");
    fillService();//将配置的属性填充到服务器下拉框
    //监测下拉框select被改变事件
    layui.use('form', function () {
        var form = layui.form;
        form.on('select(selectservice)', function (data) {
            console.log(data.value); //得到被选中的值.从settings中提取
            var settings = $("#settings").val();
            var parse = JSON.parse(settings);
            var flag = false;
            for (var i = 0; i < parse.length; i++) {
                if (parse[i].servicename == data.value) {
                    $("#servicesetting").val(JSON.stringify(parse[i]));
                    flag = true;
                }
            }
            if (!flag) {
                $("#servicesetting").val("{\"servicename\":\"219\",\"url\":\"jdbc:mysql://139.129.67.219:3306/\",\"dbname\":\"mysql\",\"parameter\":\"?serverTimezone=UTC\",\"username\":\"zhsdevelop\",\"password\":\"southnet\",\"sql\":\"SHOW DATABASES\"}");
                layui.use('layer', function () {
                    layer.tips('可参考默认配置', '#servicesetting', {
                        tips: 3
                    });
                });
            }
        });
    });
    $("#resetservicename").click(function () {
        $("#servicesetting").val("{\"servicename\":\"219\",\"url\":\"jdbc:mysql://139.129.67.219:3306/\",\"dbname\":\"mysql\",\"parameter\":\"?serverTimezone=UTC\",\"username\":\"zhsdevelop\",\"password\":\"southnet\",\"sql\":\"SHOW DATABASES\"}");
        // $("#servicenames:nth-child(1)").attr("selected", true);
        layui.use('layer', function () {
            layer.tips('Done', '#servicesetting', {
                tips: 3
            });
        });
    });
    //点击查询服务器下所有数据库事件
    $("#gettables").click(function () {
        $("#alldatabases").empty();//清空避免混乱，layui的坑是需要重新渲染
        layui.use('form', function () {
            var form = layui.form;
            form.render('select', 'from2'); //刷新select选择框渲染
        });
        $("#gettables").addClass("layui-btn-disabled");
        var val = $("#servicesetting").val();
        if (val == null || val == "") {
            $("#gettables").removeClass("layui-btn-disabled");
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.tips('不能为空', '#servicesetting', {
                    tips: 3
                });
            });
            return;//不再继续ajax
        }
        // 启动ajax
        $.ajax({
            url: "/queryTreeData",
            timeout: 20000,
            Type: "post",
            data: {
                "jdbcJsonStringAfterValidate": val
            },
            dataType: "json",
            success: function (data) {
                currentJDBCinfo = val;
                $("#gettables").removeClass("layui-btn-disabled");
                if (data != null && data != "") {
                    var liststring = data.list;
                    var tablesJson = JSON.parse(liststring);
                    var columnname = JSON.parse(data.columnnames)[0];
                    $("#alldatabases").empty();
                    $("#alldatabases").append('<option value="-999"></option>');
                    for (var i = 0; i < tablesJson.length; i++) {
                        var database = tablesJson[i][columnname];
                        $("#alldatabases").append('<option value="' + database + '">' + database + '</option>');
                    }
                    layui.use('form', function () {
                        var form = layui.form;
                        form.render('select', 'from2'); //刷新select选择框渲染
                    });
                    layui.use('layer', function () {
                        var layer = layui.layer;
                        layer.tips('加载完成。可直接选择或者关键字搜索', '#msgbox2', {
                            tips: 3
                        });
                    });

                }
            },
            error: function () {
                $("#gettables").removeClass("layui-btn-disabled");
            }
        });
    });

//数据库变动后直接查询所有的表名.此处使用了全局变量currentJDBCinfo，在查数据库成功的回调函数里面赋值
    layui.use('form', function () {
        var form = layui.form;
        form.on('select(alldatabases)', function (data) {
            // console.log(data.value); //得到被选中的值.从settings中提取
            // 替换currentJDBCinfo中的dbname、sql即可查询
            var curjdbcinfoJSON = JSON.parse(currentJDBCinfo);
            curjdbcinfoJSON["dbname"] = data.value;
            curjdbcinfoJSON["sql"] = "SHOW TABLES";
            afterChoseDB = curjdbcinfoJSON;//顺便给变量赋值，其他地方要用
            // console.log(curjdbcinfoJSON);
            var newjsbcString = JSON.stringify(curjdbcinfoJSON);
            // 启动ajax
            $.ajax({
                url: "/queryTreeData",
                Type: "post",
                timeout: 20000,
                data: {
                    "jdbcJsonStringAfterValidate": newjsbcString
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data != null && data != "") {
                        var listString = data.list;
                        var listJson = JSON.parse(listString);
                        $("#alltables").empty();
                        var columnname = JSON.parse(data.columnnames)[0];
                        $("#alltables").append('<option value="">请选择</option>');
                        for (var i = 0; i < listJson.length; i++) {
                            var tablename = listJson[i][columnname];
                            $("#alltables").append('<option value="' + tablename + '">' + tablename + '</option>');
                        }
                        layui.use('form', function () {
                            var form = layui.form;
                            form.render('select', 'from2'); //刷新select选择框渲染
                        });
                        layui.use('layer', function () {
                            var layer = layui.layer;
                            layer.tips('加载完成。可直接选择或者关键字搜索', '#msgbox3', {
                                tips: 3
                            });
                        });
                    }
                },
                error: function () {
                }
            });
        });
    });
    //监测表名发生变化
    layui.use(['form', 'layer'], function () {
        var form333 = layui.form;
        var layer = layui.layer;
        form333.on('select(alltables)', function (data) {
            var tablename = data.value;
            $("#saveTbname").val(tablename);//填充
            var a = ($("#conditions").val() == null || $("#conditions").val() == "") ? "" : $("#conditions").val();
            finalSend = "select\t" + $("#content").val() + "\tFROM\t" + tablename + "\t" + a;
            afterChoseDB["sql"] = finalSend;//把sql语句换掉
            layer.tips('点击查询', '#funalbtn', {
                tips: 3
            });
        });
    });
    //查询事件，调用父层方法
    $("#funalbtn").click(function () {
        var val = $("#saveTbname").val();
        if (val != null) {
            if (val.trim() != "") {
                var jdbcstring = JSON.stringify(afterChoseDB);
                var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                window.parent.barshow();
                window.parent.queryTreeData(true, jdbcstring);//有待考究
                parent.layer.close(index); //再执行关闭
            } else {
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.tips('重要参数不能为空', '#saveTbname', {
                        tips: 3
                    });
                });
            }
        }
    });
});//end $();data


//将配置的属性填充到服务器下拉框
function fillService() {
    var settings = $("#settings").val();
    if (settings != null && settings != "") {
        try {
            var parse = JSON.parse(settings);
            for (var i = 0; i < parse.length; i++) {
                var b = parse[i].servicename;
                $("#servicenames").append('<option value="' + b + '">' + b + '</option>');
            }
            /*            layui.use('layer', function () {
                            layer.tips('已尝试加载预设的配置属性', '#msgtips', {
                                tips: 3
                            });
                        });*/
            // 绑定对应的选择时间

        } catch (e) {
            console.log(e);
        }
    } else {
        layui.use('layer', function () {
            layer.tips('已尝试加载预设的配置属性', '#msgtips', {
                tips: 3
            });
        });
    }
}