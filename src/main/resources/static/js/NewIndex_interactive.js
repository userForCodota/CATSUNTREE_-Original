// NewIndex_interactive:首页交互，仅限于html&css，涉及到ajax的写在其他地方
$(function () {
    //加载后看500ms背景图再继续
    setTimeout(function () {
        $("#welcomebtn").show();
        $("#welcomebtn").addClass("layui-anim layui-anim-fadein");
    }, 500);
    //（效果）点击欢迎按钮后显示JDBC区
    $("#welcomebtn").click(function () {
        //加载配置文件（方法写在其他JS）
        loadProperties();
        //欢迎按钮消失、JDBC输入区展示
        $("#welcomebtn").addClass("layui-anim layui-anim-fadeout");//通过追加layui的class使得隐藏
        $("#welcomebtn").css("display", "none");
        $(".jdbczoon,#c1,#c2").show();//先从隐藏取消
        $(".jdbczoon,#c1,#c2").addClass("layui-anim layui-anim-scale");//平滑放大
        //此时才添加“鼠标移入移出/显示隐藏”的互动效果
        // （效果）jdbc输入区淡入淡出 start
        $(".jdbczoon").mouseover(function () {
            $("#c1,#c2").show();
            $("#c3").css("opacity", 1.0);//透明度
        });
        $(".jdbczoon").mouseleave(function () {
            $("#c1,#c2").css("display", "none");
            $("#c3").css("opacity", 0.25);//透明度
        });
    });

    //（效果）JSON校验网站弹出层
    $("button[title='JSON格式校验']").click(function () {
        layui.use('layer', function () {
            layer.confirm('是否打开？', {
                time: 2000, //20s后自动关闭
                btn: ['是的', '下次']
            }, function () {
                window.open("http://www.bejson.com/")
            }, function () {
            });
        });
    });
    //textarea清除
    $("#cleanJDBCtextarea").click(function () {
        $("#c2 textarea").val("");
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.msg("已清空");
        });

    });

    //textarea重置
    $("#resetJDBCtextarea").click(function () {
        layui.use('layer', function () {
            var layer = layui.layer;
            // var propertiesString = $("#hideproperties").val();//读取隐藏域值
            var propertiesString = global_properties;//重全局变量读取
            if (propertiesString != null && propertiesString.trim() != "") {
                var proObj = JSON.parse(propertiesString);
                var basicjdbcString = proObj.basicjdbc;//拿到的是JSON格式的字符串
                if (basicjdbcString != null && basicjdbcString.trim() != "") {
                    fillJDBCtextarea(basicjdbcString);//调用其他JS的函数
                    layer.msg("已重置");
                } else {
                    layer.msg("已尝试重置，然而属性文件无相关内容");
                }
            } else {
                var exampleJDBC = "{\"url\":\"jdbc:mysql://139.129.67.219:3306/\",\"dbname\":\"zhstjj\",\"parameter\":\"?serverTimezone=UTC\",\"username\":\"zhsdevelop\",\"password\":\"southnet\",\"sql\":\"select * from channel\"}";
                fillJDBCtextarea(exampleJDBC);
                layer.tips('找不到属性文件或属性文件为空，已使用示例配置', '#resetJDBCtextarea', {
                    tips: [4, '#564bba']
                });
            }
        });

    });

    //点击打开“展示所有数据库和表信息”的页面
    $("#showAllTables").click(function () {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.open({
                type: 2,
                title: '查看所有的数据库和表格',
                shadeClose: true,
                shade: 0.8,
                area: ['45%', '45%'],
                content: '/dbinfo' //iframe的url。Controller跳转
            });
        });
    });
});